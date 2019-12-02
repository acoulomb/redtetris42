import * as event from '../src/client/actions/server'
import expect from 'expect'
describe('GameMenu Component', () => {
  it('event.createPlayerFromName', function() {
    expect(event.createPlayerFromName("test").data.name).toEqual("test")
  })

  it('event.getPlayerFromName', function() {
    expect(event.getPlayerFromName("name").data.name).toEqual("name")
  })

  it('event.getPlayerFromId', function() {
    expect(event.getPlayerFromId(1).data.playerId).toEqual(1)
  })

  it('event.getPlayers', function() {
    expect(event.getPlayers().type).toEqual('server/getPlayers')
  })

  it('event.createRoom', function() {
    expect(event.createRoom("name", 1).data.name).toEqual("name")
  })

  it('event.getRooms', function() {
    expect(event.getRooms().type).toEqual('server/getRooms')
  })

  it('event.getRoomFromId', function() {
    expect(event.getRoomFromId().type).toEqual('server/getRoomFromId')
  })

  it('event.deleteRoom', function() {
    expect(event.deleteRoom().type).toEqual('server/deleteRoom')
  })

  it('event.deletePlayer', function() {
    expect(event.deletePlayer().type).toEqual('server/deletePlayer')
  })

  it('event.startNewGame', function() {
    expect(event.startNewGame().type).toEqual('server/startNewGame')
  })

  it('event.startNewYamsGame', function() {
    expect(event.startNewYamsGame().type).toEqual('server/startNewYamsGame')
  })

  it('event.gameIsRunning', function() {
    expect(event.gameIsRunning().type).toEqual('server/gameIsRunning')
  })

  it('event.onKeyDown', function() {
    expect(event.onKeyDown(1, 2, {keycode: 66}).type).toEqual('server/onKeyDown')
  }) 

  it('event.removePlayer', function() {
    expect(event.removePlayer().type).toEqual('server/removePlayer')
  })

  it('event.resetLadderPosition', function() {
    expect(event.resetLadderPosition().type).toEqual('resetLadderPosition')
  })

  it('event.resetModal', function() {
    expect(event.resetModal().type).toEqual('resetModal')
  })

  it('event.stopGame', function() {
    expect(event.stopGame().type).toEqual('server/stopGame')
  })

  it('event.joinRoom', function() {
    expect(event.joinRoom().type).toEqual('server/joinRoom')
  })

  it('event.resetBoard', function() {
    expect(event.resetBoard().type).toEqual('resetBoard')
  })

  it('event.changePage', function() {
    expect(event.changePage().type).toEqual('changePage')
  })

  it('event.printModal', function() {
    expect(event.printModal().type).toEqual('printModal')
  })
})

