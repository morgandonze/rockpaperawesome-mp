import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import t from '../timing'

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
    let symbols = []
    symbols.push([null, t.PRE_HURRY])
    symbols.push(["hourglass-1", t.HURRY])
    symbols.push(["hourglass-2", t.HURRY])
    symbols.push(["hourglass-3", t.HURRY])
    symbols.push(["times", t.MISSED])
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