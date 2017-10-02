// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import 'phoenix_html'

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"







// Setup

import {Socket, Presence} from 'phoenix'

let userId = document.getElementById('User').innerText
let socket = new Socket('/socket', {params: {user_id: userId}})
socket.connect()

let queue = socket.channel('game:queue')

let presences = {}

// Rendering

let formatTimestamp = (timestamp) => {
  let date = new Date(timestamp)
  return date.toLocaleTimeString()
}
let listBy = (user, {metas: metas}) => {
  return {
    user: user,
    onlineAt: formatTimestamp(metas[0].online_at)
  }
}

let userList = document.getElementById("UserList")
let render = (presences) => {
  userList.innerHTML = Presence.list(presences, listBy)
    .map(presence => `
    <li>
    ${presence.user}
    <br>
    <small>online since ${presence.onlineAt}</small>
    </li>
  `)
    .join('')
}

// Receivers

queue.on('presence_state', state => {
  presences = Presence.syncState(presences, state)
  render(presences)
})

queue.on('presence_diff', diff => {
  presences = Presence.syncDiff(presences, diff)
  render(presences)
})

queue.join()


// Message senders

let handler = function (hand) {
  queue.push('test', hand)
}

let handlerClosure = function (hand) {
  return function () {
    return handler(hand)
  }
}

document.getElementById('input-rock').onclick = handlerClosure('rock')
document.getElementById('input-paper').onclick = handlerClosure('paper')
document.getElementById('input-scissors').onclick = handlerClosure('scissors')
