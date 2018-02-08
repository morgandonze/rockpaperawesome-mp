import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import t from '../timing'

class Prompt extends Component {
  constructor (props) {
    super(props)
    this.state = {
      turnTime: props.turnTime || 0,
      symbolTimings: this.setSymbols(),
      moveMade: false,
      result: 0,
    }
  }

  componentWillReceiveProps (props) {
    const { turnTime, moveMade, result } = props
    this.setState({
      turnTime: turnTime,
      moveMade: moveMade,
      result: result,
    })
  }

  render () {
    const { turnTime, moveMade, result } = this.state
    if (!!this.promptSymbol() && !moveMade) {
      return (
        <div id="prompt">
          <FontAwesome name={this.promptSymbol()} />
        </div>
      )
    } else {
      return (
        <div id="prompt">
          <FontAwesome name="times" className="invis" />
        </div>
      )
    }
  }

  setSymbols = () => {
    let symbols = []
    symbols.push([[null, "star", "bomb", "compress"], t.MOVE_TIME])
    symbols.push([[null], t.RESULT])
    symbols.push([["hourglass-1"], t.HURRY])
    symbols.push([["hourglass-2"], t.HURRY])
    symbols.push([["hourglass-3"], t.HURRY])

    return symbols
  }

  promptSymbol = () => {
    let { turnTime, symbolTimings, result } = this.state
    let cumulativeTime = 0

    for (let symbolTiming of symbolTimings) {
      let time = symbolTiming[1]
      let symbols = symbolTiming[0]

      cumulativeTime += time
      if (cumulativeTime > turnTime) {
        return this.resultSymbol(symbols, result)
      }
    }

    return null
  }

  resultSymbol = (symbols, result) => {
    if (symbols.length == 1) {
      return symbols[0]
    } else {
      return symbols[result]
    }
  }
}

export default Prompt