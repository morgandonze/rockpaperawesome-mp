  export default (hand, side) => {
    let info = {
      player: {
        scissors: 'rotate-180-flip',
        rock: 'fa-rotate-90',
        paper: 'fa-rotate-90'
      },
      control: {
        scissors: 'rotate-270-flip',
        rock: '',
        paper: ''
      },
      opponent: {
        scissors: '',
        rock: 'rotate-270-flip',
        paper: 'rotate-270-flip'
      }
    }

    return ' ' + info[side][hand]
  }