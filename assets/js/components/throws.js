import React, { Component } from 'react'
import Hand from './hand'
import orderByPlayer from '../orderByPlayer'

class Throws extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillReceiveProps (props) {
    const { turn, player } = props
    this.setState({
      uoTurn: turn,
      player: player
    })
  }

  render () {
    const { uoTurn, player } = this.state
    let turn = uoTurn && orderByPlayer(uoTurn, player)
    let playerHand = (turn && turn[0]) || 1
    let opponentHand = (turn && turn[1]) || 1
    return (
      <div id='throws'>
        <Hand hand={playerHand} side={'player'} />
        <Hand hand={opponentHand} side={'opponent'}/>
      </div>
    )
  }
}

export default Throws