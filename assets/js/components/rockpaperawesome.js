import React, { Component } from 'react'

class Rockpaperawesome extends Component {
  constructor (props) {
    super(props)
    const { game } = this.props
    this.state = {
      game: game
    }
  }

  componentWillReceiveProps (props) {
    const { game } = props
    console.log(props)
    this.setState({
      game: game
    })
  }

  render () {
    return (
      <div>
        <h1>Rockpaperawesome!</h1>
        <p>Game: {this.state.game}</p>
      </div>
    )
  }
}

export default Rockpaperawesome
