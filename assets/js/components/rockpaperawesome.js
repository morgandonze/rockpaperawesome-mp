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
      hand: null,
      presences: {}
    }
  }

  setGame = (game, playerId) => {
    this.setState({game: game, playerId: playerId})
    game.join()

    game.on('throw_complete', (d) => {this.setState(Object.assign(this.state, {data: d}))})

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
    this.setState(
      Object.assign(
        this.state,
        {
          game: game,
          hand: hand
        }
      )
    )
  }

  handleThrow = (hand) => {
    return () => {
      this.setState(
        Object.assign(
          this.state,
          {hand: hand}
        )
      )
      let game = this.state.game
      game && game.push('throw', hand)
    }
  }

  render () {
    let topic = this.state.game && this.state.game.topic
    let game = this.state.game
    let hand = this.state.hand
    return (
      <div>
        <h1>Rockpaperawesome!</h1>
        <p>Game: {topic}</p>
        <div>Throw: {hand}</div>
        <ThrowControls game={game} handleThrow={this.handleThrow} />
      </div>
    )
  }
}

export default Rockpaperawesome
