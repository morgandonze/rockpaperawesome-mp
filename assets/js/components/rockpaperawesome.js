import React, { Component } from 'react'
import { Socket, Presence } from 'phoenix'
import queue from './queue.js'

class Rockpaperawesome extends Component {
  constructor (props) {
    super(props)

    let game = null
    let userName = document.getElementById('User').innerText
    let socket = new Socket('/socket', {params: {user_name: userName}})
    socket.connect()
    queue(socket, this.setGame)

    const { game } = this.props
    this.state = {
      game: null,
      presences: {}
    }
  }

  fooz = (newGame) => {
    game = newGame
    game.join()

    // game.on('throw_complete', onThrowComplete)

    game.on('presence_state', state => {
      presences = Presence.syncState(presences, state)
      // presenceUiUpdate(presences)
    })

    game.on('presence_diff', diff => {
      presences = Presence.syncDiff(presences, diff)
      // presenceUiUpdate(presences)
    })
  }

  componentWillReceiveProps (props) {
    const { game } = props
    console.log(props)
    this.setState({
      game: game
    })
  }

  render () {
    return (
      <div>
        <h1>Rockpaperawesome!</h1>
        <p>Game: {this.state.game}</p>
      </div>
    )
  }
}

export default Rockpaperawesome
