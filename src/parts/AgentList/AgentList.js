import Box from '@material-ui/core/Box'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './style.sass'
import VirtualizedTable from './VirtualizedTable'

const AgentItemListComponent = props => {
  const agents = props.activeSearch ? props.filteredData : props.data
  const [listHeight, setListHeight] = useState(window.innerHeight - 544)

  useEffect(() => {
    const updateWindowDimensions = () => {
      setListHeight(window.innerHeight - 544)
    }

    window.addEventListener('resize', updateWindowDimensions)

    return () => window.removeEventListener('resize', updateWindowDimensions)
  }, [])

  return (
    <Box style={{ height: listHeight, width: '100%' }}>
      <VirtualizedTable
        rowCount={agents.length}
        agents={agents}
        rowGetter={({ index }) => {
          // modified for join latitude & longitude
          const modifiedAgent = {
            ...agents[index],
            lat_long: `${agents[index].latitude}/${agents[index].longitude}`
          }
          return modifiedAgent
        }}
        /**
         * NOTE: In react-virtualized width is required.
         * In columns, width is used to get rid of console warning error
         * HACK: In index.sass file .MuiTableCell-root class
         * used flexBasis: auto !important
         * for automatic sizing
         */
        columns={[
          {
            label: 'Name',
            dataKey: 'name',
            width: 200
          },
          {
            label: 'Address',
            dataKey: 'address',
            width: 200
          },
          {
            label: 'Lat/Long',
            dataKey: 'lat_long',
            width: 200
          }
        ]}
      />
    </Box>
  )
}

const mapStateToProps = state => ({
  data: state.agents.data,
  filteredData: state.agents.filteredData,
  activeSearch: state.agents.activeSearch
})

export default connect(mapStateToProps, {})(AgentItemListComponent)
