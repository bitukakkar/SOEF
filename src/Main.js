// import { GoogleMap, LoadScript } from "@react-google-maps/api";
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import SideContainer from './parts/SideContainer'
import { GoogleMap } from './parts'

const online = 'online'
const offline = 'offline'

const Main = props => {
  const onNetworkChangeListener = event => {
    switch (event.type) {
      case online:
        props.startFetchAgent()
        break
      case offline:
        props.stopFetchAgent()
        break
      default:
        break
    }
  }

  useEffect(() => {
    props.startFetchAgent()
    window.addEventListener(online, onNetworkChangeListener)
    window.addEventListener(offline, onNetworkChangeListener)

    return () => {
      window.removeEventListener(online, onNetworkChangeListener)
      window.removeEventListener(offline, onNetworkChangeListener)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='App'>
      <SideContainer key={'sideContainer'} />
      <GoogleMap />
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  startFetchAgent: () => dispatch({ type: 'START_FETCH_RECORD' }),
  stopFetchAgent: () => dispatch({ type: 'STOP_FETCH_RECORD' })
})

export default connect(null, mapDispatchToProps)(Main)
