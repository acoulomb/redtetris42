import GAMERULES from './Gamerule'

export default class Tnt{
	constructor() {
		this.position = [19, 5]
		this.matrix = [[8]]
		this.position[1] -= Math.floor((this.matrix.length - 1) / 2)
	}

	rotate() {}

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
}