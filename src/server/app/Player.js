import GAMERULES from './Gamerule'
import Tnt from './Tnt'
import Spectre from './Spectre'

const mapEvent = new Map()
const LEFT_ARROW = 37
const RIGHT_ARROW = 39
const UP_ARROW = 38
const DOWN_ARROW = 40
const SPACE = 32
const KEYR = 82
const KEYE = 69
const KEYH = 72
const KEYB = 66

mapEvent.set(SPACE, (player, room) => {
	if (player.pieces.length > 0) {
		const piece = player.pieces[0]
		let i = 1
		let fullLines = 0
		while (player.spectre.isCollide(piece, [piece.position[0] - i, piece.position[1]]) === false) {
			i++
		}
		i--
		if (i > 0) {
			player.pieces[0].move([-i, 0])
			player.spectre.addPiece(player.pieces[0], player.pieces[0].position)
			let lastPiece = player.pieces.shift()
			room.master.generateNewPiece()
			if (room.master.rules.Yams === false)
			{
				fullLines = player.spectre.checkBoard(lastPiece)
				if (fullLines !== 0) {
					room.master.sendUnbreakableLine(fullLines, player.id)
				}
			}
			else
				fullLines = player.spectre.checkBoardYams(lastPiece)
			player.score += 10 * fullLines
			if (player.combo + fullLines < room.master.rules.ComboMin) {
				player.combo += fullLines
			} else {
				player.combo = room.master.rules.ComboMin
				if (player.bonusType == null) {
					if (room.master.players.length == 1) {
						player.bonusType = 0;
					} else {
						player.bonusType = Math.floor(Math.random() * Math.floor(room.master.rules.BonusType))
					}
				}
			}
		}
	}
})

mapEvent.set(KEYB, (player, room) => {
	if (player.bonusType !== null) {
		let bonus = player.bonusType
		player.combo = 0
		player.bonusType = null
		switch (bonus) {
			case 0: // tnt
				player.pieces.splice(1, 0, new Tnt());
				break
			case 1: // freeze
				room.players.forEach(p => {
					if (p.id != player.id) {
						p.freeze = true
						p.socket.emit('action', { type: 'stateFreeze', data: { state: true, playerName: player.name }})
						setTimeout((p) => { 
							p.freeze = false
							p.socket.emit('action', { type: 'stateFreeze', data: { state: false }})
						}, 4000, p)
					}
				});
				break
			case 2: // blind
				room.players.forEach(p => {
					if (p.id != player.id) {
						p.blind = true
						p.socket.emit('action', { type: 'stateBlind', data: { state: true, playerName: player.name }})
						setTimeout((p) => { 
							p.blind = false 
							p.socket.emit('action', { type: 'stateBlind', data: {state: false}})
						}, 4000, p)
					}
				});
				break
		}
	}
})

mapEvent.set(KEYE, (player) => {
	if (player.pieces.length > 0) {
		player.pieces[0].rotate(-1)
		if (player.spectre.isCollide(player.pieces[0], player.pieces[0].position) === true) {
			player.pieces[0].rotate(1)
		}
	}
})

mapEvent.set(KEYH, (player) => {
 	if (player.pieces.length > 0) {
 		if (player.pieces[0].matrix[0][0] == 8) return
		if (player.hold !== null) {
			if (player.spectre.isCollide(player.hold, player.pieces[0].position) === true) return
			let tmp = player.hold
			player.hold = player.pieces[0]
			player.pieces[0] = tmp
			player.pieces[0].position = Array.from(player.hold.position)
		} else {
			player.hold = player.pieces[0]
			player.pieces.shift()
		}
	}
})

mapEvent.set(KEYR, (player) => {
	if (player.pieces.length > 0) {
		player.pieces[0].rotate(1)
		if (player.spectre.isCollide(player.pieces[0], player.pieces[0].position) === true) {
			player.pieces[0].rotate(-1)
		}
	}
})

mapEvent.set(UP_ARROW, (player) => {
	if (player.pieces.length > 0) {
		player.pieces[0].rotate(1)
		if (player.spectre.isCollide(player.pieces[0], player.pieces[0].position) === true) {
			player.pieces[0].rotate(-1)
		}
	}
})

mapEvent.set(LEFT_ARROW, (player) => {
	if (player.pieces.length > 0) {
		if (player.spectre.isCollide(player.pieces[0],
			[player.pieces[0].position[0],
			player.pieces[0].position[1] - 1]) === false) {
			player.pieces[0].move([0, -1])
		}
	}
})

mapEvent.set(RIGHT_ARROW, (player) => {
	if (player.pieces.length > 0) {
		if (player.spectre.isCollide(player.pieces[0],
			[player.pieces[0].position[0],
			player.pieces[0].position[1] + 1]) === false) {
			player.pieces[0].move([0, 1])
		}
	}
})

mapEvent.set(DOWN_ARROW, (player) => {
	if (player.pieces.length > 0) {
		if (player.spectre.isCollide(player.pieces[0],
			[player.pieces[0].position[0]- 1,
			player.pieces[0].position[1]]) === false) {
			player.pieces[0].move([-1, 0])
		}
	}
})

export default class Player {
	constructor(socket, jwt_object) {
		this.socket = socket
		this.id
		this.name = ""
		this.scoreMax = 0
		this.score = 0
		this.pieces = []
		this.roomId = null
		this.combo = 0
		this.bonusType = null
		this.hold = null
		this.spectre = new Spectre()
		this.ladderPosition
		this.freeze = false
		this.blind = false
		Object.assign(this, jwt_object)
		if (!this.id) {
			this.id = "Player-" + Math.random().toString(36).substr(2, 16)
		}
	}

	extract() {
		return {
			id: this.id,
			name: this.name,
			score: this.score,
			scoreMax: this.scoreMax,
			roomId: this.roomId,
			bonusType: this.bonusType,
			hold: this.hold,
			ladderPosition: this.ladderPosition,
		}
	}

	onKeyDown({ keyCode }, room) {
		if (this.freeze == false) {
			if (mapEvent.has(keyCode)) {
				mapEvent.get(keyCode)(this, room)
			}
		}
	}

	setName(newName) {
		this.name = newName
	}

	/*
	**	JWT private key
	**	return string
	*/
	export(private_key) {

	}
}