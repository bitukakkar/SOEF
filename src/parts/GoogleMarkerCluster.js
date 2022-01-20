import React, { memo } from 'react'
import { connect } from 'react-redux'
import { MarkerClusterer } from '@react-google-maps/api'
import MapMarker from './MapMarker'
import { CLUSTER_GRID_SIZE, CLUSTER_MAX_ZOOM } from '../constants'
import {
  clusterm1,
  clusterm2,
  clusterm3,
  clusterm4,
  clusterm5
} from '../assets'

const keys = {
  agentCluster: 'agentCluster',
  fliteredCluster: 'fliteredCluster'
}

const clusterStyle = [
  {
    url: clusterm1,
    width: 53,
    height: 53
  },
  {
    url: clusterm2,
    width: 56,
    height: 56
  },
  {
    url: clusterm3,
    width: 66,
    height: 66
  },
  {
    url: clusterm4,
    width: 78,
    height: 78
  },
  {
    url: clusterm5,
    width: 90,
    height: 90
  }
]

const GoogleMarerCluster = props => {
  const { data, filteredData, activeSearch } = props
  const markerData = activeSearch ? filteredData : data
  return (
    <MarkerClusterer
      key={activeSearch ? keys.fliteredCluster : keys.agentCluster}
      options={{ styles: clusterStyle }}
      averageCenter
      enableRetinaIcons
      gridSize={CLUSTER_GRID_SIZE}
      maxZoom={CLUSTER_MAX_ZOOM}
    >
      {clusterer =>
        markerData.map(data => (
          <MapMarker key={data.address} marker={data} clusterer={clusterer} />
        ))
      }
    </MarkerClusterer>
  )
}

const mapStateToProps = state => ({
  data: state.agents.data,
  filteredData: state.agents.filteredData,
  activeSearch: state.agents.activeSearch
})

export default connect(mapStateToProps)(memo(GoogleMarerCluster))
