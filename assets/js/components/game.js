import React, { Component } from 'react'
import Scores from './scores'
import Throws from './throws'
import ThrowControls from './throwControls'

class Game extends Component {
  constructor (props) {
    super(props)
    this.state = {
      game: props.game,
      data: props.data,
      player: props.player,
      handleThrow: props.handleThrow
    }
  }

  componentWillReceiveProps(props) {
    this.setState(
      Object.assign(
        this.state,
        {
          game: props.game,
          data: props.data,
          player: props.player
        }
      )
    )
  }

  render () {
    const { game, data, player, handleThrow } = this.state
    return (
      <div>
        <h1>Rockpaperawesome!</h1>
        <p>Game: {game && game.topic}</p>
        <Scores data={data} player={player} />
        <Throws data={data} player={player} />
        <ThrowControls game={game} handleThrow={handleThrow} />
      </div>
    )
  }
}

export default Game