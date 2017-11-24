import React, { Component } from 'react'
import { Socket, Presence } from 'phoenix'
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
    document.getElementById("looking").innerHTML = "<h3>Looking for game...</h3>"
  }

  invite = () => {
    const { userName } = this.state
    let socket = new Socket('/socket', {params: {user_name: userName}})
    socket.connect()
    let invite = socket.channel('invite')
    invite.on("invite_created", (d) => {
      console.log(d)
    })
    invite.join()
  }

  render () {
    return (
      <div>
        <h1>Rockpaperawesome!</h1>
        <div>
          <button onClick={this.joinQueue}>Join Queue</button>
          <button onClick={this.invite}>Invite a Friend to Play</button>
        </div>
        <div id={"looking"} />
      </div>
    )
  }
}

export default Menu