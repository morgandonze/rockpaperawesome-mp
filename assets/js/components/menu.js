import React, { Component } from 'react'
import { Socket, Presence } from 'phoenix'
import queue from '../queue'
import setGame from '../setGame'

class Menu extends Component {
  constructor (props) {
    super(props)
    this.state = {
      parent: props.parent,
      userName: props.userName
    }

    let token = this.inviteTokenFromAddress()
    if (!!token) {
      this.acceptInvite(token, props.userName)
    }
  }

  inviteTokenFromAddress = () => {
    let path = document.location.pathname
    let pattern = /\/invite\/([a-f0-9]{8}\-([a-f0-9]{4}\-){3}[a-f0-9]{12})/
    let match = path.match(pattern)
    return match && match[1]
  }

  joinQueue = () => {
    const { userName, parent } = this.state
    queue(userName, this.setGame(parent))
    document.getElementById("looking").innerHTML = "<h3>Looking for game...</h3>"
  }

  invite = () => {
    const { userName, parent } = this.state
    let socket = new Socket('/socket', {params: {user_name: userName}})
    socket.connect()
    let invite = socket.channel('invite')
    invite.on("invite_created", (d) => {
      let invite_token = d.invite_token
      let invite_link = "localhost:4000/invite/" + invite_token
      document.getElementById("looking").innerHTML =
        "Send a friend this invitation link:<br><a href='" +
        invite_link + "'>" + invite_link + "</a>" +
        "<h3>Waiting for opponent to join...</h3>"
      invite.leave()
      let waitInvite = socket.channel('invite:' + invite_token, userName)
      waitInvite.on('game_started', (d) => {
        let gameId = d && d['game_id']
        if (gameId) {
          waitInvite.leave()
          let game = socket.channel('game:' + gameId)
          console.log(setGame(parent))
          setGame(parent)(game, userName)
        }
      })
      waitInvite.join()
    })
    invite.join()
  }

  acceptInvite = (token, userName) => {
    let { parent } = this.state
    let socket = new Socket('/socket', {params: {user_name: 'bob'}})
    socket.connect()
    let invite = socket.channel('invite:' + token)
    invite.on("game_started", (d) => {
      let gameId = d && d['game_id']
      if (gameId) {
        invite.leave()
        let game = socket.channel('game:' + gameId)
        setGame(parent)(game, userName)
      }
    })
    invite.join()
    invite.push("accept_invite", {token: token, user_id: userName || 'dingus'})
  }

  render () {
    let token = this.inviteTokenFromAddress()
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