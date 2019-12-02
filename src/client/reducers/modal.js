const initial = {
    state: false,
    text: "",
}

const reducer = (state = initial , action) => {
	switch(action.type){
    case 'endGame':
		return Object.assign({}, state, { text: action.data.text, state: true})
	case 'endSoloGame':
		return Object.assign({}, state, { text: action.data.text, state: true})
	case 'printModal':
		return Object.assign({}, state, { state: true })
	case 'resetModal':
		return Object.assign({}, state, { state: false })
	case 'changePage':
		return Object.assign({}, state, { text: "", state: false })
	case 'startNewGame':
		return Object.assign({}, state, { text: "", state: false })
	default:
		return state
	}
}

export default reducer