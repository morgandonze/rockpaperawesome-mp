import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'

class Prompt extends Component {
  constructor (props) {
    super(props)
    this.state = {
      turnTime: props.turnTime || 0,
      symbols: this.setSymbols()
    }
  }

  componentWillReceiveProps (props) {
    const { turnTime } = props
    this.setState({
      turnTime: turnTime
    })
  }

  render () {
    const { turnTime } = this.state
    if (!!this.promptSymbol()) {
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
    let handTime = 750
    let timerTime = 900
    let symbols = []
    symbols.push([null, 3000])
    symbols.push(["hand-rock-o", handTime])
    symbols.push(["hand-paper-o", handTime])
    symbols.push(["hand-scissors-o", handTime])
    symbols.push(["play", handTime])
    symbols.push([null, 4500])
    symbols.push(["hourglass-1", timerTime])
    symbols.push(["hourglass-2", timerTime])
    symbols.push(["hourglass-3", timerTime])
    symbols.push(["times", 4000])
    return symbols
  }

  promptSymbol = () => {
    let { turnTime, symbols } = this.state
    let cumulativeTime = 0

    for (let s of symbols) {
      cumulativeTime += s[1]
      if (cumulativeTime > turnTime) return s[0]
    }

    return null
  }
}

export default Prompt