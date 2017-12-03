import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'

class Hand extends Component {
  constructor (props) {
    super(props)
    const { hand } = props
    this.state = {hand: this.translateHand(hand)}
  }

  translateHand = (hand) => {
    switch (hand) {
      case 1:
        return <FontAwesome name="hand-rock-o" />
        break;
      case 2:
        return <FontAwesome name="hand-paper-o" />
        break;
      case 3:
        return <FontAwesome name="hand-scissors-o" />
        break;
      default:
        return <div/>
    }
  }

  componentWillReceiveProps (props) {
    const { hand } = props
    this.setState(
      Object.assign(this.state, {hand: this.translateHand(hand)})
    )
  }

  render () {
    const { hand } = this.state
    return (
      <span>{hand}</span>
    )
  }
}

export default Hand