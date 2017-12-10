import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import $ from 'jquery'
import orientation from '../iconOrientation'

class ThrowControls extends Component {
  constructor (props) {
    super(props)
    const { newMoveNum, game } = props
    this.state = {
      moveNum: newMoveNum,
      locked: false,
      game: game,
      hand: null
    }
  }

  componentWillReceiveProps (props) {
    const { newMoveNum, game } = props
    const { moveNum } = this.state
    if(newMoveNum > moveNum) {
      let unlockTimer = setTimeout(this.unlock, 800)
    }
    this.setState({
      moveNum: newMoveNum,
      game: game
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
    const { locked } = this.state
    return locked
  }

  unlock = () => {
    this.setState({
      locked: false,
      hand: null
    })
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

      this.setState({
        locked: true,
        hand: hand
      })
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