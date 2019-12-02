const initial = "/"

const reducer = (state = initial , action) => {
	switch(action.type){
	case 'changePage':
		return action.data.page
	default: 
		return state
	}
}

export default reducer