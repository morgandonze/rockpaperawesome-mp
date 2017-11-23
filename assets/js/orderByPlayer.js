export default  (a, player) => {
  if (typeof player != undefined && player === 1) {
    return a.reverse()
  } else {
    return a
  }
}
