import { GoogleMap, LoadScript } from '@react-google-maps/api'
import React, { useEffect, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import GMarkerCluster from './GoogleMarkerCluster'
import GMarkerCluster1 from './GoogleMarkerCluster1'
import InfoWindow from './InfoWindow'
import GoogleMapStyle from '../utils/GoogleMapStyle'
import { updateZoomLevel,updateBoundLevel,updateclusters , updateagents } from '../reducers/agents'

const keys = {
  gmap: 'gmap',
  gscript: 'gscript'
}

const mapContainerStyle = {
  width: '100vw',
  height: '100vh'
}

const Main = props => {
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 })
  const [map, setMap] = React.useState(null)

  useEffect(() => {
    if (props.nodeLatLng && map && mapCenter.lat === 0 && mapCenter.lng === 0) {
      map && map.panTo(props.nodeLatLng)
      setMapCenter(props.nodeLatLng)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [props.nodeLatLng, map])

  const onLoad = useCallback(function callback (map) {
    const bounds = new window.google.maps.LatLngBounds()
    map.fitBounds(bounds)
    if (map) {
    
      setMap(map)
    }
     
  }, [])

  const onUnmount = useCallback(function callback () {
    setMap(null)
  }, [])

  useEffect(() => {
    if (props.selectedAgent) {
      map &&
        map.panTo({
          lat: parseFloat(props.selectedAgent.latitude),
          lng: parseFloat(props.selectedAgent.longitude)
        })

       
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selectedAgent])

  const onZoomChanged = () =>{
    var zoom = map.getZoom();
    props.updateZoomLevel(zoom)
    let data = [];
    props.updateclusters({data})
   // props.updateagents({data})
    console.log("zoom",zoom)
  }

  const onBoundsChanged = () => {
     var bounds = map.getBounds();
     var NECorner = bounds.getNorthEast();
      var SWCorner = bounds.getSouthWest();
      // let boundobject =  
      //    [
      //      {
      //      "lat": SWCorner.lat(), 
      //      "lng": SWCorner.lng() ,
      //      },
      //      {
      //     "lat": NECorner.lat(),
      //     "lng": NECorner.lng()
      //      }
      //    ]
         let boundobject =  
           {
           "lat": SWCorner.lat(), 
           "lng": SWCorner.lng() ,
          "lat": NECorner.lat(),
          "lng": NECorner.lng()
           }
         
        //  console.log("boundobject",boundobject)
    props.updateBoundLevel(boundobject)
    // let data = [];
    // props.updateclusters({data})
  }

  return (
    <LoadScript
      key={keys.gscript}
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_KEY}
    >
      <GoogleMap
        refs="map"
        key={keys.gmap}
        mapContainerStyle={mapContainerStyle}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          minZoom: 4,
          mapTypeControl: false,
          styles: GoogleMapStyle
        }}

        onZoomChanged={onZoomChanged}
        onBoundsChanged={onBoundsChanged}
      >
        <GMarkerCluster />
        <GMarkerCluster1 />
        <InfoWindow />
      </GoogleMap>
    </LoadScript>
  )
}

const mapStateToProps = state => ({
  selectedAgent: state.agents.selectedAgent,
  nodeLatLng: state.agents.nodeLatLng,
  agents:state.agents.data
})

export default connect(mapStateToProps, {updateZoomLevel,updateBoundLevel,updateclusters,updateagents})(Main)
