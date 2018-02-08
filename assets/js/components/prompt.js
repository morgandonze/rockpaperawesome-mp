import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import t from '../timing'

class Prompt extends Component {
  constructor (props) {
    super(props)
    this.state = {
      turnTime: props.turnTime || 0,
      symbols: this.setSymbols(),
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
    let neutralSymbols = []
    neutralSymbols.push([null, t.MOVE_TIME])
    neutralSymbols.push([null, t.RESULT])
    neutralSymbols.push(["hourglass-1", t.HURRY])
    neutralSymbols.push(["hourglass-2", t.HURRY])
    neutralSymbols.push(["hourglass-3", t.HURRY])

    let winSymbols = []
    winSymbols.push(["star", t.RESULT])
    winSymbols.push([null, t.MOVE_TIME])
    winSymbols.push(["hourglass-1", t.HURRY])
    winSymbols.push(["hourglass-2", t.HURRY])
    winSymbols.push(["hourglass-3", t.HURRY])

    let loseSymbols = []
    loseSymbols.push(["bomb", t.RESULT])
    loseSymbols.push([null, t.MOVE_TIME])
    loseSymbols.push(["hourglass-1", t.HURRY])
    loseSymbols.push(["hourglass-2", t.HURRY])
    loseSymbols.push(["hourglass-3", t.HURRY])

    return {
      0: neutralSymbols,
      1: winSymbols,
      2: loseSymbols,
    }
  }

  promptSymbol = () => {
    let { turnTime, symbols, result } = this.state
    let cumulativeTime = 0

    for (let s of symbols[result]) {
      let time = s[1]
      let symbol = s[0]

      cumulativeTime += time
      if (cumulativeTime > turnTime) return symbol
    }

    return null
  }
}

export default Prompt