import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'

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

  handleThrow = (hand) => {
    return () => {
      let game = this.state.game
      game && game.push('throw', hand)
    }
  }

  render () {
    return(
      <div id="controls">
        <div id="controlsWrap">
          <FontAwesome
            onClick={this.handleThrow(1)}
            className="fa-3x fa-rotate-90 player-hand" name="hand-rock-o" />
          <FontAwesome
            onClick={this.handleThrow(2)}
            className="fa-3x fa-rotate-90 player-hand" name="hand-paper-o" />
          <FontAwesome
            onClick={this.handleThrow(3)}
            className="fa-3x fa-rotate-90 rotate-180-flip player-hand" name="hand-scissors-o" />
        </div>
      </div>
    )
  }
}

export default ThrowControls