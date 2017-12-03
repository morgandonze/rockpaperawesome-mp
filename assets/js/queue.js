import { Socket } from 'phoenix'
import setGame from './setGame'

export default (parent) => {
  let socket = new Socket('/socket')
  socket.connect()
  let queue = socket.channel('queue')

  let joinCheckTimerId = null
  let pollForGamesFound = function () {
    queue.push('check_for_game')
  }
  queue.on('game_found', data => {
    clearInterval(joinCheckTimerId)
    let gameId = data['game_id']
    let playerId = data['user_id']
    let game = socket.channel('game:' + gameId)
    setGame(parent)(game)
    parent.setState({playerId: playerId})
  })

  queue.join()
  joinCheckTimerId = setInterval(pollForGamesFound, 1000)
}
