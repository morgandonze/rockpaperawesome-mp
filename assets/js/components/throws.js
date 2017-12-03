import React, { Component } from 'react'
import Hand from './hand'
import orderByPlayer from '../orderByPlayer'

class Throws extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillReceiveProps (props) {
    const { data, player } = props
    let turns = data && data.turns
    let hands = data && data.turns && data.turns[0]
    let orderedHands = hands && orderByPlayer(hands, player)
    this.setState( Object.assign(this.state, {
      hands: orderedHands
    }))
  }

  render () {
    const { hands } = this.state
    if (hands) {
      return (
        <div>
          <Hand hand={hands[0]} />
          <Hand hand={hands[1]} />
        </div>
      )
    } else {
      return(<div></div>)
    }
  }
}

export default Throws