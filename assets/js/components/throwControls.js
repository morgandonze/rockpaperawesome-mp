import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import $ from 'jquery'
import orientation from '../iconOrientation'

class ThrowControls extends Component {
  constructor (props) {
    super(props)
    const { game, active } = props
    this.state = {
      game: game,
      hand: null,
      active: active
    }
  }

  componentWillReceiveProps (props) {
    const { game, active } = props
    console.log('active', active)
    this.setState({
      game: game,
      active: active
    })
  }

  render () {
    return(
      <div id="controls">
        <div id="controlsWrap">
        {this.controlHand('rock', this.handleThrow)}
        {this.controlHand('paper', this.handleThrow)}
        {this.controlHand('scissors', this.handleThrow)}
        </div>
      </div>
    )
  }

  isLocked = () => {
    return !this.state.active
  }

  controlStyles = (elemHand) => {
    const { hand } = this.state
    let locked = this.isLocked() ? ' locked' : ''
    let chosen = (hand && elemHand == hand) ? ' chosen' : ''
    let o = orientation(elemHand, 'control')
    let base = 'fa-3x player-control'
    return base + locked + chosen + o
  }

  handleThrow = (hand) => {
    return () => {
      if(this.isLocked()) { return }

      this.setState({ hand: hand })
      let game = this.state.game
      game && game.push('throw', hand)
    }
  }

  controlHand = (hand, handleThrow) => {
    return(
      <FontAwesome
        id={'control-'+hand}
        onClick={handleThrow(hand)}
        className={this.controlStyles(hand)} name={"hand-"+hand+"-o"} />
    )
  }
}

export default ThrowControls