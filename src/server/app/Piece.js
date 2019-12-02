const random = require('random')

export default class Piece{
	constructor(rules = { Yams: false }, indexPiece) {
		this.position = [19, 5]
		if (typeof indexPiece === 'number') {
			this.index = indexPiece
			this.matrix = rules.Pieces[indexPiece]
		} else {
			this.index = this.generateType(rules)
			this.matrix = rules.Pieces[this.index]
		}
		this.position[1] -= Math.floor((this.matrix.length - 1) / 2)
		this.applyRules(rules)
	}

	applyRules(rules) {
		if (rules.Yams === true) {
			for (let l = 0; l < this.matrix.length; l++) {
				for (let c = 0; c < this.matrix[l].length; c++) {
					if (this.matrix[l][c] !== 0) {
						this.matrix[l][c] = random.int(1, 7)
					}
				}
			}
		}
	}

	rotate(d) {
		d = d % 4
		let newMatrix
		if (d < 0) {
			while (d < 0) {
				newMatrix = this.matrix.map((rowValue, indexRow) => (
					rowValue.map((caseValue, indexCol) => (
						this.matrix[indexCol][this.matrix.length - indexRow - 1]
					))
				))
				this.matrix = newMatrix
				d++
			}
		} else {
			while (d > 0) {
				newMatrix = this.matrix.map((rowValue, indexRow) => (
					rowValue.map((caseValue, indexCol) => (
						this.matrix[this.matrix.length - indexCol - 1][indexRow]
					))
				))
				this.matrix = newMatrix
				d--
			}
		}
	}

	/*
	**	vector : array [x, y]
	*/
	move(vector) {
		this.position[0] += vector[0]
		this.position[1] += vector[1]
	}

	/*
	**	vector : array [x, y]
	*/
	setPosition(vector) {
		this.position = vector
	}

	generateType(rules) {
		return Math.floor(Math.random() * Math.floor(rules.Pieces.length))
	}
}