import React, { Component } from 'react'

class ThrowControls extends Component {
  constructor (props) {
    super(props)
    const { game, handleThrow } = props
    this.state = {
      game: game,
      handleThrow: handleThrow
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

  render () {
    const { handleThrow } = this.state
    return(
      <div>
        <button onClick={handleThrow(1)}>Rock</button>
        <button onClick={handleThrow(2)}>Paper</button>
        <button onClick={handleThrow(3)}>Scissors</button>
      </div>
    )
  }
}

export default ThrowControls