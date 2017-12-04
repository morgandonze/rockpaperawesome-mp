import React, { Component } from 'react'
import orderByPlayer from '../orderByPlayer'

class Scores extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillReceiveProps (props) {
    const { scores, player } = props
    let orderedScores = orderByPlayer(scores, player)
    this.setState(
      Object.assign(this.state, {
        scores: orderedScores,
        player: player
      }))
  }

  render () {
    const { scores } = this.state
    if (!scores) {
      return( <div>0 0</div>)
    }
    return (
      <div>
        {scores[0]} {scores[1]}
      </div>
    )
  }
}

export default Scores