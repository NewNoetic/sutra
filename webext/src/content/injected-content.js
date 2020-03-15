import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import Sutra from './Sutra'

/* Remember, you can't import css because it wouldn't be bundled into anything since this is content script that manipulates the loaded page */

const SUTRA_ELEMENT = "sutra-injected-content"

const render = (component) => {
  ReactDOM.render(component, document.getElementById(SUTRA_ELEMENT))
}

// window.onload = async () => {
  // const { enabled, clientId, disabledDomains } = await browser.storage.sync.get(['enabled', 'clientId', 'disabledDomains'])
  // if (!enabled) { return }
  // if (disabledDomains.filter(dd => window.location.hostname.includes(dd)).length > 0) { return }

console.log('injecting sutra elements')

let wrapper = document.getElementById(SUTRA_ELEMENT)

console.log(`sutra wrapper: ${wrapper}`)

if (!wrapper) {
  console.log('adding sutra wrapper to document')
  wrapper = document.createElement('div')
  wrapper.id = SUTRA_ELEMENT
  document.body.prepend(wrapper)
}
render(<Sutra />)

  // const version = browser.runtime.getManifest().version
  // const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  // const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  // const analytics = { version, window: { width, height }, clientId }
  // TODO: send analytics if needed
// }