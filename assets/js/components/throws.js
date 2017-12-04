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
    let orderedHands = turn && orderByPlayer(turn, player)
    this.setState( Object.assign(this.state, {
      turn: orderedHands
    }))
  }

  render () {
    const { turn } = this.state
    if (turn) {
      return (
        <div>
          <Hand hand={turn[0]} />
          <Hand hand={turn[1]} />
        </div>
      )
    } else {
      return(<div></div>)
    }
  }
}

export default Throws