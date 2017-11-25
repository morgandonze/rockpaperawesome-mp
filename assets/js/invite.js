import { Socket, Presence } from 'phoenix'
import setGame from './setGame'

let inviteTokenFromAddress = () => {
  let path = document.location.pathname
  let pattern = /\/invite\/([a-f0-9]{8}\-([a-f0-9]{4}\-){3}[a-f0-9]{12})/
  let match = path.match(pattern)
  return match && match[1]
}

let invite = (elem) => {
  return function () {
    const { userName, parent } = elem.state
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
          setGame(parent)(game, userName)
        }
      })
      waitInvite.join()
    })
    invite.join()
  }
}

let acceptInvite = (elem) => {
  return (token, userName) => {
    let { parent } = elem.state
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
}

export default {
  invite: invite,
  acceptInvite: acceptInvite,
  inviteTokenFromAddress: inviteTokenFromAddress
}