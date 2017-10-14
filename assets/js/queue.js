export default (socket, setGame) => {
  let queue = socket.channel('queue')
  let joinCheckTimerId = null
  let pollForGamesFound = function () {
    queue.push('check_for_game')
  }
  queue.join()
  joinCheckTimerId = setInterval(pollForGamesFound, 1000)

  queue.on('game_found', data => {
    clearInterval(joinCheckTimerId)
    let gameId = data['game_id']
    let game = socket.channel('game:' + gameId)
    setGame(game)
  })
}
