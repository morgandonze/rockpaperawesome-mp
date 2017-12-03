import { Socket, Presence } from 'phoenix'

let setGame = function (elem) {
  return (game) => {
    // TODO check whether elem has method setState
    elem.setState({game: game})
    game.on('throw_complete', (d) => {
      elem.setState(
        Object.assign(elem.state, {data: d})
      )}
    )

    game.on('presence_state', state => {
      let presences =
        Presence.syncState(elem.state.presences, state)
      elem.setState(
        Object.assign(
          elem.state, {presences: presences}
      ))
    })

    game.on('presence_diff', diff => {
      let presences =
        Presence.syncDiff(elem.state.presences, diff)
      elem.setState(
        Object.assign(
          elem.state, {presences: presences}
      ))
    })

    game.join()
  }
}

export default setGame