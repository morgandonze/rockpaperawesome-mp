import React, { Component } from 'react'
import { Socket, Presence } from 'phoenix'
import queue from '../queue.js'
import Scores from './scores'
import Throws from './throws'
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
      data: null,
      playerId: null,
      presences: {}
    }
  }

  setGame = (game, playerId) => {
    this.setState({game: game, playerId: playerId})
    game.join()

    game.on('throw_complete', (d) => {console.log(d); this.setState(Object.assign(this.state, {data: d}))})

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
    this.setState( Object.assign(
      this.state,
      {
        game: game,
        data: data
      }))
  }

  handleThrow = (hand) => {
    return () => {
      let game = this.state.game
      game && game.push('throw', hand)
    }
  }

  render () {
    const { game, data } = this.state
    let players = data && data.players
    let playerId = this.state.playerId
    let player = players && players.indexOf(playerId)

    return (
      <div>
        <h1>Rockpaperawesome!</h1>
        <p>Game: {game && game.topic}</p>
        <Scores data={data} player={player} />
        <Throws data={data} player={player} />
        <ThrowControls game={game} handleThrow={this.handleThrow} />
      </div>
    )
  }
}

export default Rockpaperawesome
