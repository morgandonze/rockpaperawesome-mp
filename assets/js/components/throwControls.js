import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import $ from 'jquery'
import orientation from '../iconOrientation'
import t from "../timing"

class ThrowControls extends Component {
  constructor (props) {
    super(props)
    const { active, turnTime, firstTurn, moveMade, game, recordMoveMade } = props
    this.state = {
      active: active,
      game: game,
      hand: null,
      recordMoveMade: recordMoveMade
    }
  }

  componentWillReceiveProps (props) {
    const { game, active, hand } = props
    const { preActive } = this.state
    if (!!active && !preActive ) {
      this.setState({hand: null})
    }
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

  unlock = () => {
    this.setState({
      locked: false,
      hand: null
    })
  }

  controlStyles = (elemHand) => {
    const { hand } = this.state
    let locked = this.isLocked() ? ' locked' : ''
    let chosen = (!!hand && elemHand == hand) ? ' chosen' : ''
    let o = orientation(elemHand, 'control')
    let base = 'fa-3x player-control'
    return base + locked + chosen + o
  }

  highlightStyles = () => {
    const { turnTime, firstTurn, moveMade } = this.props
    const baseStyle = "controlHighlight fa-2x "
    const offStyle = baseStyle + "highlight-off "

    if ( moveMade ) {
      return offStyle
    }

    if ( firstTurn && turnTime > t.SHAKE_TIME) {
      return baseStyle
    }

    if (turnTime > t.HURRY_START) {
      return baseStyle
    }

    return offStyle
  }

  handleThrow = (hand) => {
    const { recordMoveMade } = this.state
    return () => {
      if(this.isLocked()) { return }

      this.setState({ hand: hand })
      let game = this.state.game
      recordMoveMade()
      game && game.push('throw', hand)
    }
  }

  controlHand = (hand, handleThrow) => {
    return(
      <div>
        <FontAwesome className={this.highlightStyles()} name={"arrow-circle-down"} />
        <FontAwesome
          id={'control-'+hand}
          onClick={handleThrow(hand)}
          className={this.controlStyles(hand)} name={"hand-"+hand+"-o"} />
      </div>
    )
  }
}

export default ThrowControls