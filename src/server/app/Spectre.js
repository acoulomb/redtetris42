/*
**	Le board devrait etre compose a la vertical pour gerer de maniere simple la gravite
**	des pieces dans le mode yams
*/

const BOARD_HEIGHT = 20
const BOARD_WIDTH = 10


export default class Spectre {
	constructor() {
		this.reset()
	}

	reset() {
		this.board = new Array(BOARD_WIDTH)
		for (var i = this.board.length - 1; i >= 0; i--) {
			this.board[i] = new Array(BOARD_HEIGHT).fill(0)
		}
	}

	isFullLine(arr) {
		return arr.indexOf(0) === -1
	}

	addBottomLine(value) {
		for (var i = 0; i < this.board.length; i++) {
			let val = this.board[i].pop()
			if (val != 0)
				this.board[i] = [value, ...this.board[i], val]
			else
				this.board[i] = [value, ...this.board[i]]
		}
	}

	calcNAdjacentValue(l, c, val, posToCheck, path) {
		let r = 0
		if (l >= BOARD_HEIGHT || l < 0)
			return 0
		if (c >= BOARD_WIDTH || c < 0)
			return 0
		if (this.board[c][l] === val && path.find(elem => elem.l === l && elem.c === c)	=== undefined) {
			path.push({ l, c })
			r = 1
			r += this.calcNAdjacentValue(l - 1, c, val, posToCheck, path)
			r += this.calcNAdjacentValue(l + 1, c, val, posToCheck, path)
			r += this.calcNAdjacentValue(l, c + 1, val, posToCheck, path)
			r += this.calcNAdjacentValue(l, c - 1, val, posToCheck, path)
			return r
		}
		return r
	}

	extractMatrix(lastPiece) {
		let posToCheck = []
		const { position } = lastPiece
		for (let l = 0; l < lastPiece.matrix.length; l++) {
			for (let c = 0; c < lastPiece.matrix[0].length; c++) {
				if (lastPiece.matrix[l][c] !== 0) {
					posToCheck.push({
						l: position[0] - l,
						c: position[1] + c,
					})
				}
			}
		}
		return posToCheck
	}

	checkPositionSet(posToCheck, initValue = 0) {
		let didUpdate = false
		let posToBeRemoved = []
		posToCheck.forEach((pos, turn) => {
			if (pos.l >= BOARD_HEIGHT || pos.l < 0 || pos.c >= BOARD_WIDTH || pos.c < 0) {
				posToBeRemoved.push(pos)
				return
			}
			let value = this.board[pos.c][pos.l]
			if (value === 0) {
				posToBeRemoved.push(pos)
				return
			}
			let path = []
			let nAdjacent = this.calcNAdjacentValue(pos.l, pos.c, value, posToCheck, path)
			if (nAdjacent > 3) {
				didUpdate = true
				path.sort((p1, p2) => p2.l - p1.l)
				for (var i = 0; i < path.length; i++) {
					if (posToCheck.find(({ l, c }) => l === path[i].l && c === path[i].c) === undefined) {
						posToCheck.push(path[i])
					}					
				}
				path.forEach(({ c, l }) => {
					initValue++
					this.board[c].splice(l, 1)
					this.board[c].push(0)
				})
			} else {
				posToBeRemoved.push(pos)
			}
		})
		posToCheck = posToCheck.filter(({ l, c }) => (
			posToBeRemoved.find(p => p.l === l && p.c === c) === undefined
		))
		if (didUpdate === true) return this.checkPositionSet(posToCheck, initValue)
		return initValue
	}

	checkBoardYams(lastPiece){
		if (lastPiece.matrix[0][0] == 8) {
			this.explosion({ l: lastPiece.position[0], c: lastPiece.position[1] })
			return 0
		}
		let posToCheck = this.extractMatrix(lastPiece)
		return this.checkPositionSet(posToCheck)
	}

	/*
	**	Check board + disparition ligne si necessaire
	*/
	checkBoard() {
		let numberDeleted = 0
		let l = 0
		while (l < BOARD_HEIGHT) {
			let isFullLine = true
			let lastBomb = undefined
			for (let c = 0; c < BOARD_WIDTH; c++) {
				if (this.board[c][l] === 8)
					lastBomb = { l, c }
				if (this.board[c][l] < 0)
					isFullLine = false
				if (this.board[c][l] === 0)
					isFullLine = false
			}
			if (isFullLine === true) {
				numberDeleted++
				for (let c = 0; c < BOARD_WIDTH; c++) {
					if (lastBomb !== undefined && (lastBomb.c == c + 1 || lastBomb.c == c - 1)) continue
					if (lastBomb !== undefined && lastBomb.c == c) {
						this.explosion(lastBomb)
						continue
					}
					this.board[c].splice(l, 1)
					this.board[c].push(0)
				}
				continue
			} else if (lastBomb !== undefined) {
				this.explosion(lastBomb)
				l = (l - 1 < 0) ? 0 : l - 1
				continue
			}
			l++
		}
		return numberDeleted
	}

	/*
	**	Explosion suite a tnt
	*/
	explosion(bomb) {
		let replace = (bomb.l > 0 && bomb.l < BOARD_HEIGHT - 1) ? [0,0,0] : [0,0]
		let from = (bomb.l - 1 < 0) ? 0 : bomb.l - 1
		if (bomb.c > 0) {
			this.board[bomb.c - 1].splice(from, replace.length)
			this.board[bomb.c - 1].push(...replace)
		}
		this.board[bomb.c].splice(from, replace.length)
		this.board[bomb.c].push(...replace)
		if (bomb.c < BOARD_WIDTH - 1) {
			this.board[bomb.c + 1].splice(from, replace.length)
			this.board[bomb.c + 1].push(...replace)
		}
	}

	/*
	**	Ajout de la piecedans this.board
	**		return bool
	**			true = j'ai pu poser ma piece
	**			false = j'ai perdu
	*/

	checkUnbreakLine(piece, position) {
		for (let l = 0; l < piece.matrix.length; l++) {
			for (let c = 0; c < piece.matrix[0].length; c++) {
				if (piece.matrix[l][c] !== 0) {
					if (position[1] + c >= BOARD_WIDTH || position[1] + c < 0
						|| position[0] - l < 0 || position[0] - l >= BOARD_HEIGHT) {
						return -1
					}
					if (this.board[position[1] + c][position[0] - l] < 0) {
						return 0
					}
				}
			}
		}
		return 1
	}
	addPiece(piece, position) {
		let r = this.checkUnbreakLine(piece, position)
		while ((r = this.checkUnbreakLine(piece, position)) == 0) {
			position[0]++
		}
		if (r === -1) {
			return false
		}		
		for (let l = 0; l < piece.matrix.length; l++) {
			for (let c = 0; c < piece.matrix[0].length; c++) {
				if (piece.matrix[l][c] !== 0) {
					this.board[position[1] + c][position[0] - l] = piece.matrix[l][c]
				}
			}
		}
		return true
	}

	/*
	**	Check si la piece eut etre mise dans mon tableau a uneposition
	**	return bool
	*/
	isCollide(piece, position) {
		for (let l = 0; l < piece.matrix.length; l++) {
			for (let c = 0; c < piece.matrix[0].length; c++) {
				if (piece.matrix[l][c] !== 0) {
					if (position[1] + c < 0 || position[1] + c >= BOARD_WIDTH) {
						return true
					}
					if (position[0] - l < 0 || position[0] - l >= BOARD_HEIGHT) {
						return true
					}
					if (this.board[position[1] + c][position[0] - l] !== 0) {
						return true
					}
				}
			}
		}
		return false
	}
}