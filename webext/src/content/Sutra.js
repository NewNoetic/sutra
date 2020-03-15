import React from 'react'
import Fast from './Fast'
import browser from 'webextension-polyfill'

class Sutra extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: null,
      paused: false,
      enabled: false
    }
  }

  async componentDidMount() {
    const { speed } = await browser.storage.sync.get(['speed'])
    const text = await this.getText()
    this.setState({
      text,
      enabled: true,
      paused: false,
      speed: speed || 300
    })

    document.addEventListener('keyup', async (event) => {
      const { enabled } = this.state
      switch (event.keyCode) {
        case 16: // shift to play/pause    
            if (enabled) {
              this.setState((prevState) => {
                return {
                  paused: !prevState.paused
                }
              })
            }
          break
        case 27: // escape to exit
          this.setState({
            text: null,
            enabled: false
          })
          break
      }
      event.preventDefault()
    })
  }

  componentWillUnmount() {
    document.removeEventListener('keyup')
  }

  async getText() {
    var text = document.getSelection().toString()
    if (!text) {
      const { extractEndpoint } = await browser.storage.sync.get(['extractEndpoint'])
      const response = await fetch(extractEndpoint, {
        method: 'POST',
        body: JSON.stringify({ html: document.body.innerHTML }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
      const json = await response.json()
      text = json.text
    }

    return text
  }

  render() {
    const { enabled, paused, text, speed } = this.state
    if (!enabled || !text || typeof text !== 'string') {
      return (<div />)
    }
    return (
      <Fast
        {...this.props}
        wpm={speed}
        text={text}
        playing={!paused}
        onStop={() => {
          this.setState({ enabled: false, text: null })
        }}
      />
    )
  }
}

export default Sutra
