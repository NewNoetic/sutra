import 'core-js/stable'
import 'regenerator-runtime/runtime'
import browser from 'webextension-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import Sutra from './Sutra'
import '../utils/jquery.js'

/* Remember, you can't import css because it wouldn't be bundled into anything since this is content script that manipulates the loaded page */

const render = (component) => {
  ReactDOM.render(component, document.getElementById('sutra-injected-content'))
}

window.onload = async () => {
  // const { enabled, clientId, disabledDomains } = await browser.storage.sync.get(['enabled', 'clientId', 'disabledDomains'])
  // if (!enabled) { return }
  // if (disabledDomains.filter(dd => window.location.hostname.includes(dd)).length > 0) { return }

  const wrapper = document.createElement('div')
  wrapper.id = 'sutra-injected-content'
  document.body.prepend(wrapper)
  render(<Sutra />)

  // const version = browser.runtime.getManifest().version
  // const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  // const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  // const analytics = { version, window: { width, height }, clientId }
  // TODO: send analytics if needed
}

// let activeDoublePress;
// document.addEventListener('keyup', (event) => {
//   switch (event.key) {
//     case 'Shift': {
//       if (activeDoublePress) {
//         render(
//           <Fast 
//             text={document.getSelection().toString()}
//             wpm={10}
//             playing
//             onStop={() => {
//               render(<div />)
//             }}
//           />
//         )
//       } else {
//         activeDoublePress = true
//         setTimeout(() => activeDoublePress = false, 500)
//       }
//     }
//     case 'Escape': {
//       render(<div />)
//     }
//   }
// });