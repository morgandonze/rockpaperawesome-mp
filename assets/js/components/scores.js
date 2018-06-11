import React, { Component } from 'react'
import orderByPlayer from '../orderByPlayer'
import t from '../timing'

class Scores extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillReceiveProps (props) {
    const { scores, prevScores, turnTime, player } = props
    this.setState({
      uoScores: scores,
      prevScores: prevScores,
      turnTime: turnTime,
      player: player
    })
  }

  scoreToDisplay = () => {
    const { uoScores, prevScores, turnTime, player } = this.state
    let scores
    if ( turnTime >= t.SHAKE_TIME ) {
      scores = orderByPlayer(uoScores, player)
    } else {
      scores = orderByPlayer(prevScores, player)
    }
    return scores
  }

  render () {
    let scores = this.scoreToDisplay()
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