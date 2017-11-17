import React, { Component } from 'react'
import { Socket, Presence } from 'phoenix'
import queue from '../queue.js'
import ThrowControls from './throwControls'

class Rockpaperawesome extends Component {
  constructor (props) {
    super(props)

    let userName = document.getElementById('User').innerText
    queue(userName, this.setGame)

    const { game } = this.props
    this.state = {
      game: null,
      presences: {}
    }
  }

  setGame = (game) => {
    this.setState({game: game})
    game.join()

    // game.on('throw_complete', onThrowComplete)

    game.on('presence_state', state => {
      let presences = Presence.syncState(this.state.presences, state)
      this.setState({presences: presences})
      // presenceUiUpdate(presences)
    })

    game.on('presence_diff', diff => {
      let presences = Presence.syncDiff(this.state.presences, diff)
      this.setState({presences: presences})
      // presenceUiUpdate(presences)
    })
  }

  componentWillReceiveProps (props) {
    const { game } = props
    this.setState({
      game: game
    })
  }

  render () {
    let topic = this.state.game && this.state.game.topic
    let game = this.state.game
    return (
      <div>
        <h1>Rockpaperawesome!</h1>
        <p>Game: {topic}</p>
        <ThrowControls game={game} />
      </div>
    )
  }
}

export default Rockpaperawesome
