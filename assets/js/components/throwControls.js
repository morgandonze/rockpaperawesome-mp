import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import $ from 'jquery'
import orientation from '../iconOrientation'

class ThrowControls extends Component {
  constructor (props) {
    super(props)
    const { active, game, recordMoveMade } = props
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
      <FontAwesome
        id={'control-'+hand}
        onClick={handleThrow(hand)}
        className={this.controlStyles(hand)} name={"hand-"+hand+"-o"} />
    )
  }
}

export default ThrowControls