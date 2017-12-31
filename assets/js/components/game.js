import React, { Component } from 'react'
import Scores from './scores'
import Throws from './throws'
import ThrowControls from './throwControls'
const TURN_DURATION = 4000

class Game extends Component {
  constructor (props) {
    super(props)
    this.state = {
      game: props.game,
      player: props.player,
      moveNum: 0,
      turnActive: false
    }
  }

  componentWillReceiveProps(props) {
    const { moveNum } = this.state
    const { data } = props
    let newMoveNum = (data && data.turns && data.turns.length) || 0

    if (newMoveNum > moveNum) {
      this.startTurn()
      this.setState({
        moveNum: newMoveNum
      })
    } else {
      this.setState({moveNum: moveNum})
    }

    this.setState({
      game: props.game,
      player: props.player,
      scores: data && data.scores,
      turns: data && data.turns
    })
  }

  componentDidMount() {
    this.startTurn()
  }

  componentWillUnmount() {
    this.timerID && clearInterval(this.timerID)
  }

  startTurn = () => {
    if (!!this.timerID) clearInterval(this.timerID)
    this.timerID = setInterval(this.expireTurn, TURN_DURATION)
    this.setState({turnActive: true})
  }

  expireTurn = () => {
    this.timerID && clearInterval(this.timerID)
    this.timerID = null
    this.setState({turnActive: false})
  }

  moveTime = () => {
    const { moveStart } = this.state
    return Date.now() - moveStart
  }

  render () {
    const { game, scores, turns, moveNum, turnActive, player } = this.state
    let turn = turns && turns[0]
    return (
      <div>
        <Scores scores={scores} player={player} />
        <Throws turn={turn} player={player} />
        <ThrowControls newMoveNum={moveNum} game={game} active={turnActive} />
      </div>
    )
  }
}

export default Game