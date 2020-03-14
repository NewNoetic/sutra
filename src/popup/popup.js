import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import browser from 'webextension-polyfill'
import Version from '../utils/Version'
import Feedback from '../utils/Feedback'
import Flexbox from '../utils/Flexbox'
import '../css/main.css'

class Popup extends React.Component {
  constructor () {
    super()
    this.state = {
      enabled: false
    }
  }

  async componentDidMount () {
    const { enabled, speed } = await browser.storage.sync.get(['enabled', 'speed'])
    this.setState({
      enabled: enabled || false,
      speed: speed || 300
    })
  }

  async componentDidUpdate (prevProps, prevState) {
    const { enabled, speed } = this.state
    await browser.storage.sync.set({ enabled, speed })
  }

  render () {
    const { speed } = this.state
    return (
      <div className="container">
        <h3>Sutra</h3>
        <br />
        <div className="form-group">
          <label htmlFor="select-speed">Speed</label>
          <select className="form-control" id="select-speed" autoFocus value={speed} onChange={(event) => {
            this.setState({
              speed: event.target.value
            })
          }}>
            <option>200</option>
            <option>300</option>
            <option>400</option>
            <option>500</option>
            <option>600</option>
            <option>700</option>
            <option>800</option>
            <option>900</option>
            <option>1000</option>
          </select>
        </div>
        <small>
          <Flexbox style={{ flexWrap: 'wrap' }}>
            <Flexbox style={{ paddingRight: '.5rem' }}>
              <Version />
            </Flexbox>
            <Flexbox>
              <Feedback />
            </Flexbox>
          </Flexbox>
        </small>
      </div>
    )
  }
}

ReactDOM.render(<Popup />, document.getElementById('popup'))
