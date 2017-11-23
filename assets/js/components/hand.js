import React, { Component } from 'react'

class Hand extends Component {
  constructor (props) {
    super(props)
    const { hand } = props
    this.state = {hand: this.translateHand(hand)}
  }

  translateHand = (hand) => {
    switch (hand) {
      case 1:
        return "[Rock]";
        break;
      case 2:
        return "[Paper]";
        break;
      case 3:
        return "[Scissors]";
        break;
      default:
        return "[]"
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