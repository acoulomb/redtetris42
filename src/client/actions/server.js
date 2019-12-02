export const createPlayerFromName = (name) => {
  return {
    type: 'server/createPlayerFromName',
    data: { name }
  }
}

export const getPlayerFromName = (name) => {
  return {
    type: 'server/getPlayerFromName',
    data: { name }
  }
}

export const getPlayerFromId = (playerId) => {
  return {
    type: 'server/getPlayerFromId',
    data: { playerId }
  }
}

export const exitRoom = (roomId, playerId) => {
  return {
    type: 'server/exitRoom',
    data: { roomId, playerId }
  }
}

export const sendHash = (hash) => {
  return {
    type: 'server/sendHash',
    data: { hash }
  }
}

export const getPlayers = () => {
  return {
    type: 'server/getPlayers',
    data: {}
  }
}

export const resetBonus = () => {
  return {
    type: 'resetBonus',
    data: {}
  }
}

export const createRoom = (name, playerId) => {
  return {
    type: 'server/createRoom',
    data: { name, playerId }
  }
}

export const getRooms = () => {
  return {
    type: 'server/getRooms',
    data: {}
  }
}

export const getRoomFromId = (roomId) => {
  return {
    type: 'server/getRoomFromId',
    data: { roomId }
  }
}

export const deleteRoom = (roomId) => {
  return {
    type: 'server/deleteRoom',
    data: { roomId }
  }
}

export const deletePlayer = (playerId) => {
  return {
    type: 'server/deletePlayer',
    data: { playerId }
  }
}

export const startNewGame = (roomId, playerId) => {
  return {
    type: 'server/startNewGame',
    data: { roomId, playerId }
  }
}

export const startNewYamsGame = (roomId, playerId) => {
  return {
    type: 'server/startNewYamsGame',
    data: { roomId, playerId }
  }
}

export const gameIsRunning = (roomId) => {
  return {
    type: 'server/gameIsRunning',
    data: { roomId }
  }
}

export const onKeyDown = (roomId, playerId, { keyCode }) => {
  return {
    type: 'server/onKeyDown',
    data: { roomId, playerId, keyCode }
  }
}

export const removePlayer = (roomId, playerId) => {
  return {
    type: 'server/removePlayer',
    data: { roomId, playerId }
  }
}

export const resetLadderPosition = (roomId, playerId) => {
  return {
    type: 'resetLadderPosition',
    data: {}
  }
}

export const resetModal = () => {
  return {
    type: 'resetModal',
    data: {}
  }
}

export const stopGame = (roomId, playerId) => {
  return {
    type: 'server/stopGame',
    data: { roomId, playerId }
  }
}


export const joinRoom = (roomId, playerId) => {
  return {
    type: 'server/joinRoom',
    data: {roomId, playerId}
  }
}

export const resetBoard = () => {
  return {
    type: 'resetBoard',
    data: {}
  }
}

export const changePage = page => {
  return {
    type: 'changePage',
    data: { page }
  }
}

export const printModal = () => {
  return {
    type: 'printModal',
    data: {}
  }
}
