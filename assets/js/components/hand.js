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
    return (
      <FontAwesome
        name={"hand-"+hand+"-o"}
        className={"fa-3x " + side}
      />
    )
  }

  translateHand = (hand) => {
    return ['rock', 'paper', 'scissors'][hand-1]
  }
}

export default Hand