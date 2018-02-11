import React, { Component } from 'react'
import orderByPlayer from '../orderByPlayer'

class Scores extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillReceiveProps (props) {
    const { scores, player } = props
    this.setState({
      uoScores: scores,
      player: player
    })
  }

  render () {
    const { uoScores, player } = this.state
    let scores = orderByPlayer(uoScores, player)
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