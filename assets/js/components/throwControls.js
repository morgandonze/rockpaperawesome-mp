import React, { Component } from 'react'

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
      <div>
        <a href="#" onClick={this.handleThrow(1)}>Rock</a>
        <a href="#" onClick={this.handleThrow(2)}>Paper</a>
        <a href="#" onClick={this.handleThrow(3)}>Scissors</a>
      </div>
    )
  }
}

export default ThrowControls