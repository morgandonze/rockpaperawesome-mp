import React, { Component } from 'react'

class Scores extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillReceiveProps (props) {
    const { data, playerId } = props
    let scores = data && data.scores
    let players = data && data.players

    let player = players && players.indexOf(playerId)
    this.setState(
      Object.assign(this.state, {
        scores: scores,
        player: player
      }))
  }

  render () {
    const { scores, player } = this.state

    if (!scores) {
      return(
        <div>0 0</div>
      )
    }

    if (player == 0) {
      return(
        <div>
          {scores[0]} {scores[1]}
        </div>
      )
    } else {
      return(
        <div>
          {scores[1]} {scores[0]}
        </div>
      )
    }
  }
}

export default Scores