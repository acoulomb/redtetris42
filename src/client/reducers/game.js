const initial = {
	ladderPosition: 0,
	endGame: null,
	endSoloGame: null,
	score: 0,
	hold: null,
	combo: 0,
	bonusType: null,
	comboMin: 0,
	rules: { yams: false }
}

const reducer = (state = initial , action) => {
	switch(action.type){
	case 'updateGame':
		return Object.assign({}, state, {
			spectres: action.data.spectres,
			score: action.data.score,
			hold: action.data.hold,
			combo: action.data.combo,
			bonusType: action.data.bonusType
	})
	case 'resetLadderPosition':
		return Object.assign({}, state, { ladderPosition: null })			
	case 'endGame':
		return Object.assign({}, state, { ladderPosition: action.data.ladderPosition, endGame: true })
	case 'resetBonus':
		return Object.assign({}, state, { bonusType: null })
	case 'endSoloGame':
		return Object.assign({}, state, { endSoloGame: true, ladderPosition: 0 })
	case 'createRoom':
		return Object.assign({}, state, { endSoloGame: null, endGame: null })
	case 'startNewGame':
		if (action.success === false) {
			return state
		}
		return Object.assign({}, state, {
			endSoloGame: null,
			endGame: null,
			ladderPosition: 0,
			rules: action.data.rules,
			comboMin: action.data.comboMin })
	case 'updateBoard':
		return Object.assign({}, state, { hold: action.data.hold })
	case 'resetBoard':
		return Object.assign({}, state, { hold: null })
	default:
		return state
	}
}

export default reducer