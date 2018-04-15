import { Socket, Presence } from 'phoenix'
import setGameGenerator from './setGame'

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

let gameStartedHandler = (setGame, socket, preChannel) => {
  return (d) => {
    let gameId = d && d['game_id']
    if (gameId) {
      preChannel.leave()
      let game = socket.channel('game:' + gameId)
      setGame(game)
    }
  }
}

let inviteCreatedHandler = (parent, setGame, socket, invite) => {
  return (d) => {
    let invite_token = d.invite_token
    let playerId = d.player_id
    let invite_link = "https://" + window.location.hostname + "/invite/" + invite_token
    document.getElementById("looking").innerHTML = invitedMessage(invite_link)
    invite.leave()

    if(!!playerId) {
      parent.setState({playerId: playerId})
    }

    let waitInvite = socket.channel('invite:' + invite_token)
    waitInvite.on('game_started', gameStartedHandler(setGame, socket, waitInvite))
    waitInvite.join()
  }
}

let invite = (elem) => {
  return function () {
    const { parent } = elem.state
    let socket = new Socket('/socket')
    socket.connect()
    let invite = socket.channel('invite')
    let setGame = setGameGenerator(parent)
    invite.on("invite_created", inviteCreatedHandler(parent, setGame, socket, invite))
    invite.join()
  }
}

let acceptInvite = (elem) => {
  return (token) => {
    let { parent } = elem.state
    let socket = new Socket('/socket')
    socket.connect()
    let invite = socket.channel('invite:' + token)
    // Closing the connection to invite (as in gameStartedHandler)
    // might cause a problem if it happens before the "player_id_created"
    // message is received
    let setGame = setGameGenerator(parent)
    invite.on("game_started", gameStartedHandler(setGame, socket, invite))
    invite.on("player_id", d => {
      parent.setState({playerId: d.player_id})
    })
    invite.join()
    invite.push("accept_invite", {token: token})
  }
}

export default {
  invite: invite,
  acceptInvite: acceptInvite,
  inviteTokenFromAddress: inviteTokenFromAddress
}