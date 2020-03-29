import React from 'react'
import Fast from './Fast'
import browser from 'webextension-polyfill'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

class Sutra extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: null,
      paused: false,
      loading: false
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
      paused: false,
      loading: false,
      speed: speed || 300
    })

    document.addEventListener('keydown', this.keydownHandler)
  }

  async componentWillUnmount() {
    document.removeEventListener('keydown', this.keydownHandler)
    await browser.storage.sync.set({ selectedText: null })
  }

  async getText() {
    let text = (await browser.storage.sync.get('selectedText')).selectedText

    if (!text) { // if text was selected on the page
      text = document.getSelection().toString()
    }

    if (!text) { // extract main text from the page
      this.setState({
        loading: true
      })
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
      this.setState({
        loading: false
      })
    }

    return text
  }

  render() {
    const { paused, loading, text, speed } = this.state

    if (loading) {
      return (
          <Loader
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              marginLeft: '-50px',
              marginTop: '-50px'
            }}
            type='TailSpin'
            color='#FF4040'
            height={100}
            width={100}
            timeout={10000} //3 secs
        />
      )
    } else if (!text || typeof text !== 'string') {
      return null
    }

    return (
      <Fast
        {...this.props}
        wpm={speed}
        text={text}
        playing={!paused}
        onStop={async () => {
          await browser.storage.sync.set({ selectedText: null })
          this.setState({ enabled: false, text: null })
        }}
      />
    )
  }
}

export default Sutra
