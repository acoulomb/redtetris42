import GAMERULE from './Gamerule'
import GameMaster from './GameMaster'

const LOBBY = 0
const INGAME = 1

export default class Room {
	constructor(name, player) {
		this.id = this.generateIds()
		this.name = name
		this.players = [player]
		player.roomId = this.id
		this.state = LOBBY
		this.master = new GameMaster()
	}

	extract() {
		return {
			id: this.id,
			name: this.name,
			players: this.players.map(p => p.extract()),
			state: this.state,
			master: this.master.extract(),
		}
	}

	startGame(playerId, rule, params) {
		if (playerId === this.players[0].id) {
			if (this.master.isRunning() === false) {
				this.master.start(this.players, rule, params)
				return true
			}
			return false
		}
		return false
	}

	stopGame() {
		clearInterval(this.master.loopId)
		this.master.state = 2
	}

	updatePlayerState(player) {
		player.socket.emit('action', {
			type: 'updateBoard',
			data: {
				score: player.score,
				ladderPosition: player.ladderPosition,
				board: player.spectre.board,
				pieces: player.pieces,
				hold: player.hold,
				combo: player.combo,
				pieces: player.pieces,
				bonusType: player.bonusType,
			}
		})
	}

	updateRoomState() {
		let room = this.extract()
		this.players.forEach(player => {
			player.socket.emit('action', { type: 'updateRoom',  data: { room } })
		})
	}

	gameIsRunning() {
		return this.master.isRunning()
	}

	/*
	**	return bool
	*/
	removePlayer(player) {
		this.players = this.players.filter(p => p.id !== player.id)
		this.master.remove(player)
		player.roomId = null
		this.updateRoomState()
		return true
	}

	/*
	**	return bool
	*/
	addPlayer(player) {
		if (this.players.length < 5 && player.roomId === null) {
			this.players.push(player)
			player.roomId = this.id
			this.updateRoomState()
			return true
		}
		return false
	}

	/*
	**	return string
	*/
	generateIds() {
		return "Room-" + Math.random().toString(36).substr(2, 16);
	}
}
