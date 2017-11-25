import queue from './queue'
import setGame from './setGame'

export default (elem) => {
  return function () {
    const { userName, parent } = elem.state
    queue(userName, setGame(parent))
    let lookingElem = document.getElementById("looking")
    if (!!lookingElem) {
      lookingElem.innerHTML = "<h3>Looking for game...</h3>"
    }
  }
}
