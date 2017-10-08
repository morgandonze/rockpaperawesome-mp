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

// ============================================================================
// Setup
// ============================================================================

import {Socket, Presence} from 'phoenix'

let userName = document.getElementById('User').innerText
let gameId = null
let userId = null
let playerNumber = null
let opponentNumber = null

let joinCheckTimerId = null
let socket = new Socket('/socket', {params: {user_name: userName}})
socket.connect()

let queue = socket.channel('queue')
let presences = {}
let game = null

const gameIdDisplay = document.getElementById('gameId')
const playerNumDisplay = document.getElementById('playerNumber')
const playerScoreDisplay = document.getElementById('playerScore')
const opponentScoreDisplay = document.getElementById('opponentScore')
const lastMoveDisplay = document.getElementById('lastMove')
const opponentLastMoveDisplay = document.getElementById('opponentLastMove')
const moveDisplay = document.getElementById('move')

// ============================================================================
// Data handling
// ============================================================================

let playerNames = (presences) => {
  let values = presences && Object.values(presences)
  let content = values && values.map(v => {
    let userName = v.metas[0]["user_name"]
    return userName
  })
  return content.join(' vs ')
}

let turnComplete = (data) => {
  let turn = data && data.turns[0]
  return turn.every(e => e !== null)
}

let setPlayerNumber = (presences) => {
  let presence = presences[userId]
  playerNumber = presence && presence['metas'][0]['player_number']
  opponentNumber = ([2, 1])[playerNumber - 1]
}

let translateMove = (move) => {
  let key = ['rock', 'paper', 'scissors']
  return key[move]
}

let presenceUiUpdate = (presences) => {
  setPlayerNumber(presences)
  document.getElementById('playerNumber').innerText = 'Player ' + playerNumber
  gameIdDisplay.innerText = playerNames(presences)
}

// ============================================================================
// Receivers
// ============================================================================

// bkm
const onThrowComplete = data => {
  playerScoreDisplay.innerText = data.scores[playerNumber - 1]
  opponentScoreDisplay.innerText = data.scores[opponentNumber - 1]

  let turns = data.turns
  if (turns && turnComplete(data)) {
    lastMoveDisplay.innerText = translateMove(turns[0][playerNumber - 1])
    opponentLastMoveDisplay.innerText = translateMove(turns[0][opponentNumber - 1])
  }

  if (turnComplete(data)) {
    moveDisplay.innerText = '[Move]'
  }
}

queue.on('game_found', data => {
  gameId = data['game_id']
  userId = data['user_id']
  clearInterval(joinCheckTimerId)

  game = socket.channel('game:' + gameId)
  game.join()

  game.on('throw_complete', onThrowComplete)

  game.on('presence_state', state => {
    presences = Presence.syncState(presences, state)
    presenceUiUpdate(presences)
  })

  game.on('presence_diff', diff => {
    presences = Presence.syncDiff(presences, diff)
    presenceUiUpdate(presences)
  })
})

queue.join()

// Poll for joined game
let joinCheck = function () {
  queue.push('check_for_game')
}

joinCheckTimerId = setInterval(joinCheck, 1000)

// ============================================================================
// Message senders
// ============================================================================

let throwHandler = function (handCode, hand) {
  moveDisplay.innerText = hand
  game && game.push('throw', handCode)
}

let throwHandlerClosure = function (handCode, hand) {
  return function () {
    return throwHandler(handCode, hand)
  }
}

document.getElementById('input-rock').onclick = throwHandlerClosure('0', 'rock')
document.getElementById('input-paper').onclick = throwHandlerClosure('1', 'paper')
document.getElementById('input-scissors').onclick = throwHandlerClosure('2', 'scissors')
