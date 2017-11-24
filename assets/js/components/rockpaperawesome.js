import React, { Component } from 'react'
import queue from '../queue.js'
import Game from './game'
import Menu from './menu'

class Rockpaperawesome extends Component {
  constructor (props) {
    super(props)
    let userName = document.getElementById('User').innerText
    this.state = {
      userName: userName,
      playerId: null,
      presences: {}
    }
  }

  componentWillReceiveProps (props) {
    const { game } = props
    this.setState( Object.assign(
      this.state,
      { game: game, data: data }
    ))
  }

  render () {
    const { game, data, userName } = this.state
    let players = data && data.players
    let playerId = this.state.playerId
    let player = players && players.indexOf(playerId)

    if (!game) {
      return (
        <Menu parent={this} userName={userName} />
      )
    } else {
      return (
        <Game game={game} data={data} player={player} />
      )
    }
  }
}

export default Rockpaperawesome
