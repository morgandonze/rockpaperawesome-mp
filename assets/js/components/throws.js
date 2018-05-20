import React, { Component } from 'react'
import Hand from './hand'
import orderByPlayer from '../orderByPlayer'
import t from '../timing'

class Throws extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  reveal = () => {
    const { turnTime } = this.state
    return turnTime >= t.SHAKE_TIME
  }

  overrideOrientation = () => {
    const { firstTurn, missedMoves, player } = this.props
    const { turnTime } = this.state
    return [
      !firstTurn && !missedMoves[player] && turnTime < t.SHAKE_TIME,
      !firstTurn && !missedMoves[1 - player] && turnTime < t.SHAKE_TIME
    ]
  }

  componentWillReceiveProps (props) {
    const { turn, turnTime, player } = props
    this.setState({
      uoTurn: turn,
      turnTime: turnTime,
      player: player
    })
  }

  wiggleClasses = () => {
    const { firstTurn, missedMoves, player } = this.props
    return [
      !firstTurn && !missedMoves[player] ? ' player-wiggle' : '',
      !firstTurn && !missedMoves[1 - player] ? ' opponent-wiggle' : ''
    ]
  }

  render () {
    const { uoTurn, player } = this.state
    let turn = uoTurn && orderByPlayer(uoTurn, player)
    let classes = this.reveal() ? "" : this.wiggleClasses()
    let noOrientation = this.overrideOrientation()
    let playerHand = this.reveal() ? ((turn && turn[0]) || 1) : 1
    let opponentHand = this.reveal() ? ((turn && turn[1]) || 1) : 1

    return (
      <div id='throws'>
        <Hand hand={playerHand} classes={classes[0]} side={'player'} noOrient={noOrientation[0]} />
        <Hand hand={opponentHand} classes={classes[1]} side={'opponent'} noOrient={noOrientation[1]} />
      </div>
    )
  }
}

export default Throws