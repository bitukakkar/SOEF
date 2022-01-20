import React, { useEffect, useState, useCallback } from 'react'
import './style.sass'
import axios from 'axios'
import { updateNodeLatLng } from '../../reducers/agents'
import { connect } from 'react-redux'
import { metadataURL } from '../../constants'
import {
  agents,
  monitor,
  location,
  locationFlag
} from './../../assets/icons/current_stauts'
import StatusBlock from '../StatusBlock'
function StatusComponent (props) {
  const [data, setData] = useState({})
  const fetchData = async () => {
    try {
      const response = await axios.get(metadataURL)
      setData(response.data.response)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    fetchData()
    setInterval(() => {
      fetchData()
    }, 2 * 60 * 1000)
  }, [])

  useEffect(() => {
    if (!data || !data.location) {
      return
    }
    let lat = parseFloat(data.location.latitude)
    let lng = parseFloat(data.location.longitude)
    props.updateNodeLatLng({ lat, lng })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const getNodeLocation = useCallback(() => {
    if (!data || !data.location) {
      return '-'
    }
    let lat = parseFloat(data.location.latitude)
    let lang = parseFloat(data.location.longitude)
    return `${lat.toFixed(2)}, ${lang.toFixed(2)}`
  }, [data])

  const StatusDetailsList = [
    {
      image: agents,
      title: data && data.statistics && data.statistics.agents,
      subTitle: 'Total Agents Online'
    },
    {
      image: monitor,
      title: data && data.version,
      subTitle: 'SOEF Version '
    },
    { image: location, title: getNodeLocation(), subTitle: 'Node Location' },
    {
      image: locationFlag,
      title: data && data.statistics && data.statistics.peaks && data.statistics.peaks.peak.length > 0 && data.statistics.peaks.peak[0]['#text'],
      subTitle: 'Peak Concurrent Agents'
    }
  ]
  return (
    <div>
      <div className='side-nav-headers'>Current Status</div>
      <div className='bottom-10'></div>
      <div>
        <div className='flex flex-wrap flex-spacebetween-center'>
          {StatusDetailsList.map(status => {
            return (
              <StatusBlock
                image={status.image}
                title={status.title}
                subTitle={status.subTitle}
                key={status.subTitle}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = state => ({
  data: state.agents.data
})
export default connect(mapStateToProps, { updateNodeLatLng })(StatusComponent)
