import React, { Component } from 'react'
import Hand from './hand'

class Throws extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillReceiveProps (props) {
    const { data } = props
    let turns = data && data.turns
    this.setState(
      Object.assign(this.state, {turns: turns})
    )
  }

  render () {
    const { turns } = this.state
    let lastTurn = turns && turns[0]
    let throw1 = lastTurn && lastTurn[0]
    let throw2 = lastTurn && lastTurn[1]
    return(
      <div>
        <Hand hand={throw1} />
        <Hand hand={throw2} />
      </div>
    )
  }
}

export default Throws