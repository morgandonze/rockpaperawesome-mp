import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import orientation from '../iconOrientation'

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
    let o = orientation(hand, side)
    return (
      <FontAwesome
        name={"hand-"+hand+"-o"}
        className={"fa-3x " + side + o}
      />
    )
  }

  translateHand = (hand) => {
    if (hand == -1) return 'rock'
    return ['rock', 'paper', 'scissors'][hand-1]
  }
}

export default Hand