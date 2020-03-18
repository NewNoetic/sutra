import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import browser from 'webextension-polyfill'
import Version from '../utils/Version'
import Feedback from '../utils/Feedback'
import ClientId from '../utils/ClientId'
import Flexbox from '../utils/Flexbox'
import '../css/main.css'

class Options extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      enabled: true,
      extractEndpoint: '',
      speed: null,
      installType: null
    }
  }

  async componentDidMount () {
    const { enabled, extractEndpoint, speed } = await browser.storage.sync.get(['enabled', 'extractEndpoint', 'speed'])
    const { installType } = await browser.management.getSelf()

    this.setState({
      enabled,
      extractEndpoint,
      speed: speed || 300,
      installType
    })
  }

  async componentDidUpdate (prevProps, prevState) {
    const { enabled, extractEndpoint, speed } = this.state
    await browser.storage.sync.set({ enabled, extractEndpoint, speed })
  }

  render () {
    const { enabled, extractEndpoint, speed, installType } = this.state

    const developmentOptions = (
      <>
        <h3>Development options</h3>
        <div className="row">
          <div className="col-sm">
            <label>Extract endpoint</label>
            <br />
            <input type="text" name="endpoint" value={extractEndpoint} onChange={(event) => {
              this.setState({
                extractEndpoint: event.target.value
              })
            }} />
          </div>
        </div>
      </>
    )

    return (
      <div className="container">
        {installType === 'development' && developmentOptions}
        <h3>Options</h3>
        <div className="row">
          <div className="col-sm-3">
            <label>Enabled</label>
            <br />
            <input type="checkbox" checked={enabled} onChange={() => {
              this.setState((prevState) => ({
                enabled: !prevState.enabled
              }))
            }} />
          </div>
        </div>
        <hr />
        <Flexbox style={{ flexWrap: 'wrap' }}>
          <Flexbox style={{ paddingRight: '1rem' }}>
            <Version />
          </Flexbox>
          <Flexbox style={{ paddingRight: '1rem' }}>
            <ClientId />
          </Flexbox>
          <Flexbox>
            <Feedback />
          </Flexbox>
        </Flexbox>
      </div>
    )
  }
}

ReactDOM.render(<Options />, document.getElementById('options'))
