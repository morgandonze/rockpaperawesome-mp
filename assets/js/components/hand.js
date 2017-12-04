import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'

class Hand extends Component {
  constructor (props) {
    super(props)
    const { hand, side } = props
    this.state = {
      hand: this.translateHand(hand),
      side: side
    }
  }

  componentWillReceiveProps (props) {
    const { hand, side } = props
    this.setState({
      hand: this.translateHand(hand),
      side: side
    })
  }

  render () {
    const { hand, side } = this.state
    let orientation = this.orientation(hand, side)
    return (
      <FontAwesome
        name={"hand-"+hand+"-o"}
        className={"fa-3x " + side + orientation}
      />
    )
  }

  translateHand = (hand) => {
    return ['rock', 'paper', 'scissors'][hand-1]
  }

  orientation = (hand, side) => {
    if (side=='player') {
      if (hand=='scissors') {
        return ' rotate-180-flip'
      } else {
        return ' fa-rotate-90'
      }
    }

    if (side=='opponent') {
      if (hand=='scissors') {
        return ' '
      } else {
        return ' rotate-270-flip'
      }
    }
  }
}

export default Hand