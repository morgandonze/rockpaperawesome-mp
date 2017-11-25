import React, { Component } from 'react'
import { Socket, Presence } from 'phoenix'
import joinQueue from '../joinQueue'
import setGame from '../setGame'
import Invite from '../invite'

class Menu extends Component {
  constructor (props) {
    super(props)
    this.state = {
      parent: props.parent,
      userName: props.userName
    }

    let token = Invite.inviteTokenFromAddress()
    if (!!token) {
      Invite.acceptInvite(this)(token, props.userName)
    }
  }

  render () {
    let token = Invite.inviteTokenFromAddress()
    return (
      <div>
        <h1>Rockpaperawesome!</h1>
        <div>
          <button onClick={joinQueue(this)}>Join Queue</button>
          <button onClick={Invite.invite(this)}>Invite a Friend to Play</button>
        </div>
        <div id={"looking"} />
      </div>
    )
  }
}

export default Menu