const initial = ""

const reducer = (state = initial , action) => {
	switch(action.type){
	case 'server/sendHash':
		return action.data.hash
	default: 
		return state
	}
}

export default reducer