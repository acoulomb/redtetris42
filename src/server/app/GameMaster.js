import Spectre from "./Spectre"
import Piece from "./Piece"

const START = 1
const STOP = 2

export default class GameMaster {
	constructor(params) {
		this.params = params
		this.players = []
		this.pieces = []
		this.state = STOP
		this.ladderPosition = 4
		this.startTime
	}

	extract() {
		return {
			state: this.state,
			players: this.players.map(p => p.extract()),
		}
	}

	remove(player) {
		if (this.state === START) {
			this.players = this.players.filter(p => p.id !== player.id)
			this.ladderPosition--
			if (this.players.length === 1) {
				this.players[0].socket.emit('action', { type: 'endGame',  data: {
					ladderPosition: 1,
					text: "You win !",
				}})
				clearInterval(this.loopId)
			}
		}
	}

	isRunning() {
		return this.state === START
	}

	/*
	**	Return bool
	*/
	start(players, rules, params) {
		if (this.state === START) {
			return false
		}
		this.rules = rules
		this.params = params
		this.startTime = Date.now()
		this.players = players
		this.ladderPosition = this.players.length
		this.players.forEach(p => {
			p.spectre = new Spectre(p.id)
			p.spectres = []
			p.pieces = []
			p.ladderPosition = 0
			p.score = 0
			p.combo = 0
			p.bonusType = null
			p.hold = null
		})
		this.generateNewPiece()
		this.state = START
		const spectres = this.players.map(player => ({
			id:player.id,
			name: player.name,
			spectre: player.spectre
		}))
		this.players.forEach(player => {
			player.socket.emit('action', { type: 'startNewGame',  data: {
				pieces: player.pieces,
				hold: player.hold,
				board: player.spectre.board,
				ladderPosition: player.ladderPosition,
				spectres,
				state: this.state,
				score: player.score,
				combo: player.combo,
				rules: this.rules,
				comboMin: this.rules.ComboMin,
				bonusType: player.bonusType,
			}})
		})
		this.loop()
		return true
	}

	// Creation de piece de base dans pieces
	generateNewPiece() {
		let min = 1000000
		for (let index = 0; index < this.players.length; index++) {
			if (this.players[index].pieces.length < min) {
				min = this.players[index].pieces.length
			}
		}
		while (min < 4)
		{
			const piece = new Piece(this.rules)
			for (var i = this.players.length - 1; i >= 0; i--) {
				this.players[i].pieces.push(new Piece(this.rules, piece.index))
			}
			min++
		}
	}

	sendUnbreakableLine(nline, playerId) {
		this.players.forEach(p => {
			if (p.id !== playerId) {
				for (let i = 0; i < nline; i++) {
					p.spectre.addBottomLine( -1)
				}
			}
		})
	}
	
	gravity() {
		let endGame = false
		this.players.forEach(player => {
			if (player.ladderPosition !== 0) return
			let piece = player.pieces[0]
			let fullLines = 0
			if (player.spectre.isCollide(piece, [piece.position[0] - 1, piece.position[1]]) == true) {
				if (player.spectre.addPiece(piece, piece.position) === false) {
					player.ladderPosition = this.ladderPosition	
						player.socket.emit('action', { type: 'endSoloGame',  data: {
							ladderPosition: player.ladderPosition,
							text: "Game over",
						}})
						this.ladderPosition--
						return
				}
				let lastPiece = player.pieces.shift()
				this.generateNewPiece()
				if (this.ladderPosition === 1 && this.players.length > 1) {
					player.ladderPosition = 1
				} else if (player.spectre.isCollide(player.pieces[0], player.pieces[0].position) === true) {
					if (this.players.length === 1) {
						player.ladderPosition = this.ladderPosition	
						player.socket.emit('action', { type: 'endSoloGame',  data: {
							ladderPosition: player.ladderPosition,
							text: "Game over",
						}})
						this.ladderPosition--
					} else {
						player.ladderPosition = this.ladderPosition
						if (this.ladderPosition !== undefined && this.ladderPosition !== null) {
							player.socket.emit('action', { type: 'endGame',  data: {
								ladderPosition: 4,
								text: "T'es mauvais jack",
							}})
						}
						this.ladderPosition--
					}					
				} else {
					if (this.rules.Yams === false)
					{
						fullLines = player.spectre.checkBoard()
						if (fullLines !== 0) {
							this.sendUnbreakableLine(fullLines, player.id)
						}
					}
					else
					{
						fullLines = player.spectre.checkBoardYams(lastPiece)
					}
					player.score += 10 * fullLines
					if (player.combo + fullLines < this.rules.ComboMin) {
						player.combo += fullLines
					} else {
						player.combo = this.rules.ComboMin
						if (player.bonusType == null) {
							if (this.players.length == 1) {
								player.bonusType = 0;
							} else {
								player.bonusType = Math.floor(Math.random() * Math.floor(this.rules.BonusType))
							}
						}
					}
				}
				return
			}
			if (this.ladderPosition === 1 && this.players.length > 1) {
				if (this.ladderPosition !== undefined && this.ladderPosition !== null) {
					player.socket.emit('action', { type: 'endGame',  data: {
						ladderPosition: 4,
						text: "You win !",
					}})
				}
				this.ladderPosition--
				return
			}
			player.pieces[0].move([-1, 0])
		})
		const spectres = this.players.map(player => ({
			id:player.id,
			name: player.name,
			spectre: player.spectre.board || [],
			isUnderMalus: player.blind || player.freeze 
		}))
		for (var i = 0; i < this.players.length; i++) {
			const player = this.players[i]
			if (typeof player.ladderPosition === 'number' && player.ladderPosition === 0) {
				player.socket.emit('action', { type: 'updateGame',  data: {
					pieces: player.pieces,
					combo: player.combo,
					bonusType: player.bonusType,
					hold: player.hold,
					board: player.spectre.board,
					ladderPosition: player.ladderPosition,
					spectres,
					score: player.score,
				}})
			} else {
				player.socket.emit('action', { type: 'updateSpectres',  data: {
					spectres,
				}})
			}
		}
		if (this.ladderPosition <= 0) {
			this.state = STOP
			clearInterval(this.loopId)
		}
	}

	loop() {
		this.loopId = setInterval(this.gravity.bind(this), this.params.loopSpeed)
	}
}