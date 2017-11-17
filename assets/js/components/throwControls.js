import React, { Component } from 'react'

class ThrowControls extends Component {
  constructor (props) {
    super(props)
    const { game } = props
    this.state = {
      game: game,
      hand: null
    }
  }

  handleClick = (hand) => {
    return () => {
      this.setState(
        Object.assign(
          this.state,
          {hand: hand}
        )
      )
      let game = this.state.game
      game && game.push('throw', hand)
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
    let hand = this.state && this.state.hand;
    console.log(hand)
    return(
      <div>
        <div>Move: {hand}</div>
        <button onClick={this.handleClick(1)}>Rock</button>
        <button onClick={this.handleClick(2)}>Paper</button>
        <button onClick={this.handleClick(3)}>Scissors</button>
      </div>
    )
  }
}

export default ThrowControls