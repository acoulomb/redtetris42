import { combineReducers } from 'redux'
import player from './player'
import rooms from './rooms'
import room from './room'
import game from './game'
import spectres from './spectres'
import board from './board'
import pieces from './pieces'
import modal from './modal'
import page from './page'
import blind from './blind'
import hash from './hash'
export default combineReducers({
	player,
	rooms,
	room,
	game,
	spectres,
	board,
	pieces,
	page,
	modal,
	blind,
	hash,
})