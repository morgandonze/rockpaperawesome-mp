  export default (hand, side) => {
    if (side=='player') {
      if (hand=='scissors') {
        return ' rotate-180-flip'
      } else {
        return ' fa-rotate-90'
      }
    }

    if (side=='control') {
      if (hand=='scissors') {
        return ' rotate-270-flip'
      } else {
        return ' '
      }
    }

    if (side=='opponent') {
      if (hand=='scissors') {
        return ' '
      } else {
        return ' rotate-270-flip'
      }
    }
  }