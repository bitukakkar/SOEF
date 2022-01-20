import { Marker } from '@react-google-maps/api'
import React, { memo, useState } from 'react'
import { connect } from 'react-redux'

import { updateSelectedAgent } from '../reducers/agents'
import { getMapMarkerImage, getMapMarkerHoverImage } from '../utils'
import {
    clusterm1,
    clusterm2,
    clusterm3,
    clusterm4,
    clusterm5
  } from '../assets'
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
const MapMarker1 = props => {
  const { address, latitude, longitude, genus = '', size } = props.marker
  const [isMarkerHover, setIsMarkerHover] = useState(false)

  const scaledSize = new window.google.maps.Size(
    (!isMarkerHover && 34) || 163,
    42.84
  )

  const anchor = new window.google.maps.Point(
    (!isMarkerHover && 34 / 2) || 17,
    42.84 / 2
  )
//   console.log("props",props.marker.id + ":"  + props.marker.size)
  return (
    <Marker
    //   icon={{
    //      url: size < 100 ? clusterm1 : clusterm4,
    //     scaledSize,
    //     origin: new window.google.maps.Point(0, 0),
    //    anchor
    //   }}
      options={{ styles: clusterStyle }}
      key={address}
      position={{
        lat: parseFloat(latitude),
        lng: parseFloat(longitude)
      }}
      animation='DROP'
      label={size.toString()}
    //   clusterer={props.clusterer}
    //   onMouseOver={() => setIsMarkerHover(true)}
    //   onMouseOut={() => setIsMarkerHover(false)}
    //   onClick={() => props.updateSelectedAgent(props.marker)}
    />
  )
}

export default connect(null, { updateSelectedAgent })(memo(MapMarker1))
