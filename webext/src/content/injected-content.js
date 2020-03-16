import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import Sutra from './Sutra'

/* Remember, you can't import css because it wouldn't be bundled into anything since this is content script that manipulates the loaded page */

const SUTRA_ELEMENT = "sutra-injected-content"
let container = document.getElementById(SUTRA_ELEMENT)
if (!container) {
  container = document.createElement('div')
  container.id = SUTRA_ELEMENT
  document.body.prepend(container)
}

ReactDOM.render(<Sutra/>, container)
