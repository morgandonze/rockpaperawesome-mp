import React, { Component } from 'react'
import Scores from './scores'
import Prompt from './prompt'
import Throws from './throws'
import ThrowControls from './throwControls'
import t from '../timing'
import orderByPlayer from '../orderByPlayer'

class Game extends Component {
  constructor (props) {
    super(props)
    this.turnTime = 0
    this.state = {
      game: props.game,
      player: props.player,
      scores: [0, 0],
      moveNum: 0,
      moveMade: false,
      turnActive: false,
      firstTurn: true,
      turnTime: 0,
      result: 0,
    }
  }

  componentWillReceiveProps(props) {
    const { moveNum, result } = this.state
    const { data } = props
    let newMoveNum = (data && data.turns && data.turns.length) || 0
    let prevScores = this.state.scores || [0,0]
    let isNewTurn = newMoveNum > moveNum
    let prevTurn = data && data.turns[0]

    if (newMoveNum > 0) {
      this.setState({
        firstTurn: false
      })
    }

    if (isNewTurn) {
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
      turns: data && data.turns,
      result: (data && this.calcResult(prevTurn, data.scores, prevScores, isNewTurn, props.player)) || 0
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
    this.timerID = setInterval(this.turnTimerTick, 100)
    this.turnStartTime = Date.now()
    this.turnTime = 0
    this.setState({
      turnTime: 0,
      moveMade: false,
      turnActive: true
    })
  }

  calcResult(turn, scores, prevScores, newTurn, player) {
    if (turn && orderByPlayer(turn, player)[0] == -1) {
      return 3 // didn't make a move
    }
    if (!scores || !prevScores || !newTurn) return 0 // first move
    let dPlayScore = orderByPlayer(scores, player)[0] - orderByPlayer(prevScores, player)[0]
    let dOppScore = orderByPlayer(scores, player)[1] - orderByPlayer(prevScores, player)[1]

    if (dPlayScore > 0) return 1 // win
    if (dPlayScore==0 && dOppScore > 0) return 2 // lose
    return 0
  }

  turnTimerTick = () => {
    this.turnTime = Date.now() - this.turnStartTime
    const { turnTime } = this.state

    if (this.turnTime - turnTime > 50) {
      this.setState({turnTime: this.turnTime})
    }

    if (this.turnTime > t.TURN) {
      this.expireTurn()
    }
  }

  expireTurn = () => {
    const { game, moveMade } = this.state
    if (!moveMade && game) {
      game.push('miss')
    }
    this.setState({
      turnActive: false
    })
  }

  recordMoveMade = () => {
    this.setState({
      moveMade: true,
      turnActive: false
    })
  }

  render () {
    const { game, scores, result, turns, moveNum, turnTime, moveMade, turnActive, firstTurn, player } = this.state
    let turn = turns && turns[0]
    return (
      <div>
        <Scores scores={scores} player={player} />
        <Prompt turnTime={turnTime} moveMade={moveMade} result={result} />
        <Throws turn={turn} turnTime={turnTime} player={player} />
        <ThrowControls
          newMoveNum={moveNum}
          game={game}
          recordMoveMade={this.recordMoveMade}
          turnTime={turnTime}
          firstTurn={firstTurn}
          active={turnActive}
        />
      </div>
    )
  }
}

export default Game