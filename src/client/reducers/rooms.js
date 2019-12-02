const initial = []
const reducer = (state = initial , action) => {
	switch(action.type){
	case 'getRooms':
		return action.rooms
	case 'updateRooms':
		return action.rooms
	default:
		return state
	}
}

export default reducer