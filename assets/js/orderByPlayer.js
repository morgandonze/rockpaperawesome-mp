export default  (a, player) => {
  if (typeof player != undefined && player === 1) {
    return a && a.slice().reverse()
  } else {
    return a
  }
}
