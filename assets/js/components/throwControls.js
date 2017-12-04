import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import $ from 'jquery'

class ThrowControls extends Component {
  constructor (props) {
    super(props)
    const { newMoveNum, game } = props
    this.state = {
      moveNum: newMoveNum,
      unlockAt: 0,
      game: game,
      hand: null
    }
  }

  componentWillReceiveProps (props) {
    const { newMoveNum, game } = props
    const { moveNum } = this.state

    let newState = Object.assign(
      { moveNum: newMoveNum,
      game: game },
      newMoveNum > moveNum ? {hand: null} : null
    )
    this.setState(newState)
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
    const { moveNum, unlockAt } = this.state
    return unlockAt > moveNum
  }

  controlStyles = (elemHand) => {
    const { hand } = this.state
    let locked = this.isLocked() ? ' locked' : ''
    let chosen = (hand && elemHand == hand) ? ' chosen' : ''
    let base = 'fa-3x fa-rotate-90 player-control'
    return base + locked + chosen
  }

  handleThrow = (hand) => {
    return () => {
      if(this.isLocked()) { return }

      this.setState({
        unlockAt: this.state.unlockAt+1,
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