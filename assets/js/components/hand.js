import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import orientation from '../iconOrientation'

class Hand extends Component {
  constructor (props) {
    super(props)
    const { hand, side, classes, noOrient } = props
    this.state = {
      hand: this.translateHand(hand),
      side: side,
      classes: (classes && " " + classes) || "",
      noOrient: noOrient
    }
  }

  componentWillReceiveProps (props) {
    const { hand, side, classes, noOrient } = props
    this.setState({
      hand: this.translateHand(hand),
      side: side,
      classes: (classes && " " + classes) || "",
      noOrient: noOrient
    })
  }

  render () {
    const { hand, side, classes, noOrient } = this.state
    let o = noOrient ? "" : orientation(hand, side)
    return (
      <FontAwesome
        name={"hand-"+hand+"-o"}
        className={"fa-3x " + side + o + classes}
      />
    )
  }

  translateHand = (hand) => {
    if (hand == -1) return 'rock'
    return ['rock', 'paper', 'scissors'][hand-1]
  }
}

export default Hand