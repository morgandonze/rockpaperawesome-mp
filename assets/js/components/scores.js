import React, { Component } from 'react'
import orderByPlayer from '../orderByPlayer'
import FontAwesome from 'react-fontawesome'
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

  translateScore = (score) => {
    let scoreIcons = []
    for (var i=1; i <= score; i++) {
      scoreIcons.push(
        <FontAwesome
          name="diamond"
          className="fa fa-3x"
        />
      )
    }
    return (
      <div class="scoreGroupContainer">
        {scoreIcons}
      </div>
    )
  }

  render () {
    let scores = this.scoreToDisplay()
    if (!scores) {
      return( <div id="score-row"></div>)
    }
    return (
      <div id="score-row">
        {this.translateScore(scores[0])} {this.translateScore(scores[1])}
      </div>
    )
  }
}

export default Scores