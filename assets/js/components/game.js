import React, { Component } from 'react'
import Scores from './scores'
import Prompt from './prompt'
import Throws from './throws'
import ThrowControls from './throwControls'
const TURN_DURATION = 10950

class Game extends Component {
  constructor (props) {
    super(props)
    this.state = {
      game: props.game,
      player: props.player,
      moveNum: 0,
      turnTime: 0,
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
    this.timerID = setInterval(this.turnTimerTick, 75)
    this.turnStartTime = Date.now()
    this.setState({turnActive: true, turnTime: 0})
  }

  turnTimerTick = () => {
    let turnTime = Date.now() - this.turnStartTime
    this.setState({turnTime: turnTime})

    if (turnTime > TURN_DURATION) {
      this.expireTurn()
    }
  }

  expireTurn = () => {
    this.setState({
      turnActive: false
    })
  }

  render () {
    const { game, scores, turns, moveNum, turnTime, turnActive, player } = this.state
    let turn = turns && turns[0]
    return (
      <div>
        <Scores scores={scores} player={player} />
        <Prompt turnTime={turnTime} />
        <Throws turn={turn} player={player} />
        <ThrowControls newMoveNum={moveNum} game={game} active={turnActive} />
      </div>
    )
  }
}

export default Game