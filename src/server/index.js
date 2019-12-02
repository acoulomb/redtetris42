import fs  from 'fs'
import debug from 'debug'

const logerror = debug('tetris:error')
const loginfo = debug('tetris:info')
const http = require('http')
const socketIO = require('socket.io')
import GameRulesCreator from './app/Gamerule'
import ServerMaster from './app/ServerMaster'

const initApp = (app, params, cb) => {
	const { host, port } = params
	const handler = (req, res) => {
		const file = req.url === '/bundle.js' ? '/../../build/bundle.js' : '/../../index.html'
		fs.readFile(__dirname + file, (err, data) => {
			if (err) {
				logerror(err)
				res.writeHead(500)
				return res.end('Error loading index.html')
			}
			res.writeHead(200)
			res.end(data)
		})
	}

	app.on('request', handler)

	app.listen({host, port}, () =>{
		loginfo(`tetris listen on ${params.url}`)
		cb()
	})
}

const clearWebsocket = (socket, master) => {
	const player = master.getPlayerFromSocketID(socket.id)
	if (player) {
		let { roomId } = player
		const room = master.getRoom(roomId)
		if (room) {
			room.removePlayer(player)
			if (room.players.length === 0) {
				master.deleteRoom(roomId)
			}
		}
	}
}

/*
**  SocketIO logique
*/
const initEngine = (io, master, params) => {
	global.io = io
	loginfo("Socket init")
	io.on('connection', function(socket){
		// io.use((socket, next) => { next(); })
		socket.on('disconnect', () => {
			loginfo(`SOCKET ${socket.id} DISCONNECTED`)
			clearWebsocket(socket, master)
		})
		socket.on('error', () => {
			loginfo(`SOCKET ${socket.id} ERROR`)
			clearWebsocket(socket, master)
		})
		loginfo("Socket connected: " + socket.id)
		socket.on('action', (action) => {
			let payload = {}
			let callback
			let player
			let room
			// loginfo("Input payload:"  , action)
			// console.log("Input payload:"  , action)
			if (action.type === 'server/createPlayerFromName') {
				player = master.createPlayer(socket, action.data)
				payload = {type: 'createPlayerFromName', player: player.extract()}
				socket.emit('action', payload)
			}
			if (action.type === 'server/getPlayerFromName') {
				player = master.getPlayerFromName(action.data.name)
				if (player)
					payload = {type: 'getPlayerFromName', player: player.extract()}
				socket.emit('action', payload)
			}
			if (action.type === 'server/sendHash') {
				const { hash } = action.data
				const re = /^#(.*)\[(.*)\]$/
				const res = re.exec(hash)
				if (res !== null) {
					player = master.createPlayer(socket, { name: res[2] })
					payload = {type: 'createPlayerFromName', player: player.extract()}
					socket.emit('action', payload)
					let room = master.getRoom(res[1])
					if (room !== undefined && room !== null) {
						room.addPlayer(player)
						const spectres = room.players.map(player => ({
							id: player.id,
							name: player.name,
							spectre: []
						}))
						payload = { 
							type: 'joinRoom',
							data: {
								player: player.extract(),
								spectres
							}
						}
						player.socket.emit('action', {type: 'changePage', data: { page: '/roommenu'} })
						socket.emit('action', payload)
					} else {
						room = master.createRoom(res[1], player)
						payload = {type: 'createRoom', data: { room: room.extract(), player: player.extract() }}
						socket.emit('action', payload)
						player.socket.emit('action', {type: 'changePage', data: { page: '/roommenu'} })
					}
				}
			}
			if (action.type === 'server/getPlayers') {
				const players = master.getPlayers(action.data)
				payload = {type: 'getPlayers', players: players.map(p => p.extract())}
				socket.emit('action', payload)
			}
			if (action.type === 'server/getRooms') {
				let rooms = master.getRooms()
				socket.emit('action', { type: 'getRooms', rooms })
			}
			if (action.data.roomId && action.data.playerId) {
				player = master.getPlayer(action.data.playerId)
				room = master.getRoom(action.data.roomId)
				if (!player || !room) {
					return
				}
				if (action.type === 'server/joinRoom') {
					room.addPlayer(player)
					const spectres = room.players.map(player => ({
						id: player.id,
						name: player.name,
						spectre: []
					}))
					payload = { 
						type: 'joinRoom',
						data: {
							player: player.extract(),
							spectres
						}
					}
					socket.emit('action', payload)
				}
				if (action.type === 'server/startNewGame') {
					const rules = GameRulesCreator({})
					let success = room.startGame(player.id, rules, params)
					if (success == false) {
						socket.emit('action', {type: 'startNewGame', success})
					} else {
						callback = ({ room }) => {
							room.master.players.forEach(p => {
								p.socket.emit('action', {type: 'changePage', data: { page: '/game'} })
							})
						}
					}
				}
				if (action.type === 'server/exitRoom') {
					room.removePlayer(player)
					if (room.players.length === 0) {
						master.deleteRoom(roomId)
					}
				}
				if (action.type === 'server/startNewYamsGame') {
					const rules = GameRulesCreator({ Yams: true })
					room.startGame(player.id, rules, params)
					callback = ({ room }) => {
						room.master.players.forEach(p => {
							p.socket.emit('action', {type: 'changePage', data: { page: '/game'} })
						})
					}
				}
				if (action.type === 'server/removePlayer') {
					let success = room.removePlayer(player)
					if (room.players.length === 0) {
						master.deleteRoom(room.id)
					}
					payload = { type:"removePlayer", success }
					socket.emit('action', payload)
				}
				if (action.type === 'server/onKeyDown') {
					if (typeof player.ladderPosition === 'number' && player.ladderPosition === 0) {
						player.onKeyDown(action.data, room)
						room.updatePlayerState(player)
					}
				}
				if (action.type === 'server/stopGame') {
					room.stopGame(player)
				}
			}
			else if (action.data.playerId) {
				player = master.getPlayer(action.data.playerId)
				if (action.type === 'server/createRoom') {
					room = master.createRoom(action.data.name, player)
					payload = {type: 'createRoom', data: { room: room.extract(), player: player.extract() }}
					socket.emit('action', payload)
				}
				if (action.type === 'server/getPlayerFromId') {
					payload = {type: 'getPlayerFromId', player: player.extract()}
					socket.emit('action', payload)
				}
				if (action.type === 'server/deletePlayer') {
					if (player !== null && player !== undefined) {
						master.deletePlayer(player.id)
						payload = {type: 'deletePlayer', success: true}
					} else {
						payload = {type: 'deletePlayer', success: false}
					}
					socket.emit('action', payload)
				}
			} else if (action.data.roomId) {
				room = master.getRoom(action.data.roomId)
				if (action.type === 'server/getRoomFromId') {
					payload = {type: 'getRoomFromId', room: room.extract()}
					socket.emit('action', payload)
				}
				if (action.type === 'server/deleteRoom') {
					room = master.deleteRoom(action.data.roomId)
					payload = {type: 'deleteRoom', room}
					socket.emit('action', payload)
				}
				if (action.type === 'server/gameIsRunning') {
					payload = {type: 'gameIsRunning', room: { isRunning: room.gameIsRunning() }}
					socket.emit('action', payload)
				}
			}
			if (callback) {
				callback({ player, room })
			}
		})
	})
}

export function create(params){
	const promise = new Promise((resolve, reject) => {
		const app = http.createServer()
		const master = new ServerMaster(params)
		initApp(app, params, () =>{
			const io = socketIO().attach(app)
			const stop = (cb) => {
				io.close()
				app.close( () => {
					app.unref()
				})
				loginfo(`Engine stopped.`)
				cb()
			}
			const giveBonusToPlayer = (playerId, bonusType) => {
				let p = master.getPlayer(playerId)
				if (p) {
					p.bonusType = bonusType
				}
			}
			initEngine(io, master, params)
			resolve({stop, giveBonusToPlayer})
		})
	})
	return promise
}
