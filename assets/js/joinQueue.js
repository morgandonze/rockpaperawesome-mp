import queue from './queue'

export default (elem) => {
  return function () {
    const { parent } = elem.state
    queue(parent)
    let lookingElem = document.getElementById("looking")
    if (!!lookingElem) {
      lookingElem.innerHTML = "<h3>Looking for game...</h3>"
    }
  }
}
