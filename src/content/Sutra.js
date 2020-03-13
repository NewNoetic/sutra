import React from 'react'
import Fast from './Fast'

class Sutra extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: null,
      paused: false,
      enabled: false
    }
  }

  componentDidMount() {
    let activeDoublePress
    document.addEventListener('keyup', (event) => {
      const { enabled } = this.state
      switch (event.keyCode) {
        case 16: // shift
          if (activeDoublePress) {
            this.setState({
              text: this.getText(),
              enabled: true,
              paused: false
            })
          } else {
            activeDoublePress = true
            setTimeout(() => {
              activeDoublePress = false
            }, 500)

            if (enabled) {
              this.setState((prevState) => {
                return {
                  paused: !prevState.paused
                }
              })
            }
          }
          break
        case 27: // escape
          this.setState({
            text: null,
            enabled: false
          })
          break
      }
      event.preventDefault()
    })
  }

  getText() {
    return document.getSelection().toString()
  }

  render() {
    const { enabled, paused, text } = this.state
    if (!enabled || !text || typeof text !== 'string') {
      return (<div />)
    }
    return (
      <Fast {...this.props} text={text} playing={!paused} />
    )
  }
}

export default Sutra
