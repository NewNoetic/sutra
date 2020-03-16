import React from 'react'
import PropTypes from 'prop-types'
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

    this.keydownHandler = this.keydownHandler.bind(this)
  }

  async keydownHandler(event) {
    const { enabled } = this.state
    switch (event.keyCode) {
      case 32: // space to play/pause    
          if (enabled) {
            this.setState((prevState) => {
              return {
                paused: !prevState.paused
              }
            })
          }
          event.preventDefault()
        break
      case 27: // escape to exit
        this.setState({
          text: null,
          enabled: false,
          paused: false
        })
        event.preventDefault()
        break
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

    document.addEventListener('keydown', this.keydownHandler)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keydownHandler)
  }

  async getText() {
    let text = this.props.text // if we passed in text via injected-content.js

    if (!text) { // if text was selected on the page
      text = document.getSelection().toString()
    }

    if (!text) { // extract main text from the page
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

Sutra.defaultProps = {
  text: null
}

Sutra.propTypes = {
  text: PropTypes.string
}

export default Sutra
