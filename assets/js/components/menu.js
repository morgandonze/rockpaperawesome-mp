import React, { Component } from 'react'
import queue from '../queue.js'

class Menu extends Component {
  constructor (props) {
    super(props)
    this.state = {
      parent: props.parent,
      userName: props.userName
    }
  }

  setGame = (game, playerId) => {
    const { parent } = this.state
    parent.setState({game: game, playerId: playerId})
    game.join()
    game.on('throw_complete', (d) => {parent.setState(Object.assign(parent.state, {data: d}))})
    game.on('presence_state', state => {
      let presences = Presence.syncState(parent.state.presences, state)
      parent.setState(Object.assign(parent.state, {presences: presences}))
    })
    game.on('presence_diff', diff => {
      let presences = Presence.syncDiff(parent.state.presences, diff)
      parent.setState(Object.assign(parent.state, {presences: presences}))
    })
  }

  joinQueue = () => {
    const { userName } = this.state
    queue(userName, this.setGame)
  }

  render () {
    return (
      <div>
        <h1>Rockpaperawesome!</h1>
        <div>
          <button onClick={this.joinQueue()}>Join Queue</button>
        </div>
        <h3>Looking for game...</h3>
      </div>
    )
  }
}

export default Menu