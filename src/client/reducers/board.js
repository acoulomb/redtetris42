const initial = null

const BOARD_HEIGHT = 20
const BOARD_WIDTH = 10

const mergeBoard = (board, piece) => {
	for (let pieceX = 0; pieceX < piece.matrix.length; pieceX++) {
		for (let pieceY = 0; pieceY < piece.matrix[0].length; pieceY++) {
			if (piece.matrix[pieceX][pieceY] !== 0) {
				board[piece.position[1] + pieceY][piece.position[0] - pieceX] = piece.matrix[pieceX][pieceY]
			}
		}		
	}
	return board
}

const reducer = (state = initial , action) => {
	switch(action.type){
	case 'startNewGame':
		return []
	case 'updateBoard':
		return mergeBoard(action.data.board, action.data.pieces[0])
	case 'updateGame':
		return mergeBoard(action.data.board, action.data.pieces[0])
	case 'resetBoard':
		return null
	default: 
		return state
	}
}

export default reducer