import { Marker } from '@react-google-maps/api'
import React, { memo, useState } from 'react'
import { connect } from 'react-redux'

import { updateSelectedAgent } from '../reducers/agents'
import { getMapMarkerImage, getMapMarkerHoverImage } from '../utils'

const MapMarker = props => {
  const { address, latitude, longitude, genus = '' } = props.marker
  const [isMarkerHover, setIsMarkerHover] = useState(false)

  const scaledSize = new window.google.maps.Size(
    (!isMarkerHover && 34) || 163,
    42.84
  )

  const anchor = new window.google.maps.Point(
    (!isMarkerHover && 34 / 2) || 17,
    42.84 / 2
  )
  return (
    <Marker
      icon={{
        url: !isMarkerHover
          ? getMapMarkerImage(genus)
          : getMapMarkerHoverImage(genus),
        scaledSize,
         origin: new window.google.maps.Point(0, 0),
        anchor
      }}
      key={address}
      position={{
        lat: parseFloat(latitude),
        lng: parseFloat(longitude)
      }}
      // clusterer={props.clusterer}
      onMouseOver={() => setIsMarkerHover(true)}
      onMouseOut={() => setIsMarkerHover(false)}
      onClick={() => props.updateSelectedAgent(props.marker)}
    />
  )
}

export default connect(null, { updateSelectedAgent })(memo(MapMarker))
