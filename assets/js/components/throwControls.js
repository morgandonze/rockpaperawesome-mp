import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import $ from 'jquery'

class ThrowControls extends Component {
  constructor (props) {
    super(props)
    const { game, handleThrow } = props
    this.state = {
      game: game
    }
  }

  componentWillReceiveProps (props) {
    this.setState(
      Object.assign(
        this.state,
        {game: props.game}
      )
    )
  }

  handleThrow = (hand, control) => {
    return () => {
      $(".player-control").addClass('locked')
      $("#"+control).addClass('chosen')
      let game = this.state.game
      game && game.push('throw', hand)
    }
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

  controlHand = (hand, handleThrow) => {
    return(
      <FontAwesome
        id={'control-'+hand}
        onClick={handleThrow(hand, "control-"+hand)}
        className="fa-3x fa-rotate-90 player-control" name={"hand-"+hand+"-o"} />
    )
  }
}

export default ThrowControls