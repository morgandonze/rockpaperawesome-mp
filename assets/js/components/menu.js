import React, { Component } from 'react'
import { Socket, Presence } from 'phoenix'
import joinQueue from '../joinQueue'
import Invite from '../invite'

class Menu extends Component {
  constructor (props) {
    super(props)
    this.state = {
      parent: props.parent
    }

    let token = Invite.inviteTokenFromAddress()
    if (!!token) {
      Invite.acceptInvite(this)(token)
    }
  }

  render () {
    let token = Invite.inviteTokenFromAddress()
    joinQueue(this)()
    return (
      <div>
        <div>
          <div onClick={joinQueue(this)}>Join Queue</div>
          <div onClick={Invite.invite(this)}>Invite a Friend to Play</div>
        </div>
        <div id={"looking"} />
      </div>
    )
  }
}

export default Menu