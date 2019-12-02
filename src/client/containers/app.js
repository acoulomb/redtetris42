import React from 'react'
import { connect } from 'react-redux'
import * as event from '../actions/server.js'
import Game from '../components/game'

import LoginContainer from './login'
import RoomMenuContainer from './roommenu'
import GameMenuContainer from './gamemenu'
import GameContainer from './game'

const App = (props) => {
  return (
    <div>
      {(() => {
        switch(props.page) {
          case '/':
            return <LoginContainer />
          case '/gamemenu':
            return <GameMenuContainer />
          case '/roommenu':
            return <RoomMenuContainer />
          case '/game':
            return <GameContainer />
          default:
            return <LoginContainer />
        }
      })()}
    </div>
  )
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(App)