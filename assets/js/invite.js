import { Socket, Presence } from 'phoenix'
import setGame from './setGame'

let inviteTokenFromAddress = () => {
  let path = document.location.pathname
  let pattern = /\/invite\/([a-f0-9]{8}\-([a-f0-9]{4}\-){3}[a-f0-9]{12})/
  let match = path.match(pattern)
  return match && match[1]
}

let invitedMessage = (invite_link) => {
  return "Send a friend this invitation link:<br><a href='" +
  invite_link + "'>" + invite_link + "</a>" +
  "<h3>Waiting for opponent to join...</h3>"
}

let gameStartedHandler = (preChannel) => {
  (d) => {
    let gameId = d && d['game_id']
    if (gameId) {
      preChannel.leave()
      let game = socket.channel('game:' + gameId)
      setGame(parent)(game)
    }
  }
}

let inviteCreatedHandler = (socket, invite) => {
  return (d) => {
    let invite_token = d.invite_token
    let invite_link = "localhost:4000/invite/" + invite_token
    document.getElementById("looking").innerHTML = invitedMessage(invite_link)
    invite.leave()

    let waitInvite = socket.channel('invite:' + invite_token)
    waitInvite.on('game_started', gameStartedHandler(waitInvite))
    waitInvite.join()
  }
}

let invite = (elem) => {
  return function () {
    const { parent } = elem.state
    let socket = new Socket('/socket')
    socket.connect()
    let invite = socket.channel('invite')
    invite.on("invite_created", inviteCreatedHandler(socket, invite))
    invite.join()
  }
}

let acceptInvite = (elem) => {
  return (token) => {
    let { parent } = elem.state
    let socket = new Socket('/socket')
    socket.connect()
    let invite = socket.channel('invite:' + token)
    invite.on("game_started", gameStartedHandler(invite))
    invite.join()
    invite.push("accept_invite", {token: token})
  }
}

export default {
  invite: invite,
  acceptInvite: acceptInvite,
  inviteTokenFromAddress: inviteTokenFromAddress
}