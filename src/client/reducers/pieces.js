const initial = []

const reducer = (state = initial , action) => {
	switch(action.type){
	case 'updateGame':
		return action.data.pieces
	case 'resetBoard':
		return []
	default: 
		return state
	}
}

export default reducer