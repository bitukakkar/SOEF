import React, { memo } from 'react'
import { connect } from 'react-redux'
import { MarkerClusterer } from '@react-google-maps/api'
import MapMarker1 from './MapMarker1'
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

const removeDuplicateObjectFromArray = (array, key) => {
    var check = new Set();
    return array.filter(obj => !check.has(obj[key]) && check.add(obj[key]));
  }
const GoogleMarerCluster1 = props => {
  const { data, clusters, activeSearch } = props
  const markerData =  clusters //removeDuplicateObjectFromArray(clusters,'id')
  console.log("clustersdata",clusters)
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
          <MapMarker1 key={data.id} marker={data} clusterer={clusterer} />
        ))
      }
      
    </MarkerClusterer>
  )
}

const mapStateToProps = state => ({
  clusters: state.agents.clusters,
  filteredData: state.agents.filteredData,
  activeSearch: state.agents.activeSearch
})

export default connect(mapStateToProps)(memo(GoogleMarerCluster1))
