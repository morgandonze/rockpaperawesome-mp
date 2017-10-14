// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import 'phoenix_html'
import { Socket, Presence } from 'phoenix'

import React from 'react'
import ReactDOM from 'react-dom'

import Rockpaperawesome from './components/rockpaperawesome.js'
import queue from './queue.js'

let game = null
let presences = {}
let setGame = (newGame) => {
  game = newGame
  game.join()

  // game.on('throw_complete', onThrowComplete)

  game.on('presence_state', state => {
    presences = Presence.syncState(presences, state)
    // presenceUiUpdate(presences)
  })

  game.on('presence_diff', diff => {
    presences = Presence.syncDiff(presences, diff)
    // presenceUiUpdate(presences)
  })

  ReactDOM.render(
    <Rockpaperawesome game={game} />,
    document.getElementById('rockpaperawesome')
  )
}

let userName = document.getElementById('User').innerText
let socket = new Socket('/socket', {params: {user_name: userName}})
socket.connect()
queue(socket, setGame)
