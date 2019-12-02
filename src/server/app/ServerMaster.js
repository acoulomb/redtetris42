import Player from './Player'
import Room from './Room'

export default class ServerMaster {
	constructor() {
		this.rooms = []
		this.players = []
	}

	/*
	**	Creation d'un joueur
	**	Incrementation de idPlayers
	**	push dans this.players
	**	return player
	*/
	createPlayer(socketId, obj) {
		const player = new Player(socketId, obj)
		this.players.push(player)
		return player
	}

	/*
	**	Creation d'un joueur
	**	push dans this.players
	**	return player
	*/
	createPlayerFromJWT(token) {
		
	}

	/*
	**	Return player
	*/
	getPlayer(id) {
		return this.players.find(p => p.id === id)
	}

	/*
	**	Return player
	*/
	getPlayerFromSocketID(socketId) {
		return this.players.find(p => p.socket.id === socketId)
	}

	/*
	**	Return player
	*/
	getPlayerFromName(name) {
		return this.players.find(p => p.name === name)
	}

	/*
	**	Return player[]
	*/
	getPlayers() {
		return this.players
	}

	/*
	**	return true/false
	*/
	deletePlayer(id) {
		this.players = this.players.filter(function(value, index, arr){
			return value.id !== id;
		});
	}

	/*
	**	Creation de la room
	**	Incrementation de idRooms
	**	push dans this.rooms
	**	return room
	*/
	createRoom(roomName, player, rules) {
		const room = new Room(roomName, player, rules)
		this.rooms.push(room)
		global.io.emit('action', { type: 'updateRooms', rooms: this.rooms.map(r => r.extract()) })
		return room
	}

	/*
	**	Return room
	*/
	getRoom(id) {
		return this.rooms.find(p => p.id === id)
	}

	/*
	**	Return room[]
	*/
	getRooms() {
		return this.rooms.map(r => ({ name: r.name, id: r.id, nplayers: r.players.length }))
	}

	/*
	**	return true/false
	*/
	deleteRoom(id) {
		this.rooms = this.rooms.filter(room => room.id !== id);
		global.io.emit('action', { type: 'updateRooms', rooms: this.rooms.map(r => r.extract()) })
		return true
	}
}
