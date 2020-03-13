import React from 'react'
import Fast from './Fast'

class Sutra extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playing: false
    }
  }
  componentDidMount() {
    let activeDoublePress;
    document.addEventListener('keyup', (event) => {
      switch (event.key) {
        case 'Shift': {
          if (activeDoublePress) {
            console.log('double')
            this.setState({
              playing: true
            })
            } else {
              activeDoublePress = true
              setTimeout(() => activeDoublePress = false, 500)
            }
          }
          case 'Escape': {
            this.setState({
              playing: false
            })
          }
        }
      });
    }

    render() {
      const text = document.getSelection().toString()
      console.log(text)
      return (
        <Fast text={text} style={{ display: this.state.playing ? 'block' : 'none' }} {...this.props} playing={this.state.playing} />
      )
    }
  }

  export default Sutra;