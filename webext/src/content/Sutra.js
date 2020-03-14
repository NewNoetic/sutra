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

  async componentDidMount() {
    let activeDoublePress
    document.addEventListener('keyup', async (event) => {
      const { enabled } = this.state
      switch (event.keyCode) {
        case 16: // shift
          if (activeDoublePress) {
            const { speed } = await browser.storage.sync.get(['speed'])
            const text = await this.getText()
            this.setState({
              text,
              enabled: true,
              paused: false,
              speed: speed || 300
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
        case 18: // left
          this.setState((prevState) => {
            const spd = (prevState.speed % 1000) + 100
            return { speed: spd }
          })
          break
      }
      event.preventDefault()
    })
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
    // if (!text) {
    //   const paragraph = document.querySelector('p:hover')
    //   if (paragraph) {
    //     text = paragraph.textContent
    //   }
    // }

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
