import React, { Component } from 'react'
import Scores from './scores'
import Throws from './throws'
import ThrowControls from './throwControls'

class Game extends Component {
  constructor (props) {
    super(props)
    this.state = {
      game: props.game,
      player: props.player,
    }
  }

  componentWillReceiveProps(props) {
    const { data } = props
    let moveNum = (data && data.turns && data.turns.length) || 0
    this.setState({
      game: props.game,
      player: props.player,
      scores: data && data.scores,
      turns: data && data.turns,
      moveNum: moveNum
    })
  }

  render () {
    const { game, scores, turns, moveNum, player } = this.state
    let turn = turns && turns[0]
    return (
      <div>
        <Scores scores={scores} player={player} />
        <Throws turn={turn} player={player} />
        <ThrowControls moveNum={moveNum} game={game} />
      </div>
    )
  }
}

export default Game