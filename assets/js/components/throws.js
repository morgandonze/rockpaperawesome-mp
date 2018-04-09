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

  componentWillReceiveProps (props) {
    const { turn, turnTime, player } = props
    this.setState({
      uoTurn: turn,
      turnTime: turnTime,
      player: player
    })
  }

  render () {
    const { uoTurn, turnTime, player } = this.state
    let turn = uoTurn && orderByPlayer(uoTurn, player)
    let classes = this.reveal() ? "" : " player-wiggle"
    let playerHand = this.reveal() ? ((turn && turn[0]) || 1) : 1
    let opponentHand = this.reveal() ? ((turn && turn[1]) || 1) : 1

    return (
      <div id='throws'>
        <Hand hand={playerHand} classes={classes} side={'player'} />
        <Hand hand={opponentHand} side={'opponent'}/>
      </div>
    )
  }
}

export default Throws