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
        <button onClick={this.handleThrow(1)}>Rock</button>
        <button onClick={this.handleThrow(2)}>Paper</button>
        <button onClick={this.handleThrow(3)}>Scissors</button>
      </div>
    )
  }
}

export default ThrowControls