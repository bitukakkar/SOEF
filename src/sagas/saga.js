import {
  call,
  put,
  delay,
  cancel,
  take,
  fork,
  select
} from 'redux-saga/effects'
import axios from 'axios'
import { agentsURL } from '../constants'
import { updateagents,updateclusters } from '../reducers/agents'

const RECORDS_PER_PAGE = 100
const RECORDS_PER_BATCH = 100

var agentData = []
var clusterData = []

function merge (oldAgents, newAgents, prop) {
  var reduced = oldAgents.filter(
    oldAgent => !newAgents.find(newAgent => oldAgent[prop] === newAgent[prop])
  )
  return reduced.concat(newAgents)
}

const getAgentsAPI = (page,zoom,bounds) =>
  axios
    .get(agentsURL, {
      params: {
        limit: RECORDS_PER_PAGE,
        offset: page,
        zoom:zoom,
        // bounds:bounds
      }
    })
    .then(response => {
      return response.data
    })
    .catch(err => {
      return err
    })
 const removeDuplicateObjectFromArray = (array, key) => {
      var check = new Set();
      return array.filter(obj => !check.has(obj[key]) && check.add(obj[key]));
    }
function * fetchRecordsAsync (page = 0) {
  while (true) {
    try {
      const store = yield select()
      let zoom = store.agents.zoom;
      let bounds = store.agents.bound;
      const response = yield call(getAgentsAPI, page,zoom,bounds)
      const { agents,clusters } = response.results
     
      if (!agents.length) {
        const data = merge(store.agents.data, agentData, 'address')
        yield put(updateagents({ data }))
        agentData = []
        //return
      }
      agentData.push(...agents)
      if (agentData.length >= RECORDS_PER_BATCH || page === 0) {
        const data = merge(store.agents.data, agentData, 'address')
        yield put(updateagents({ data }))
        yield delay(200)
        agentData = []
      }


      console.log("sagaclusters",clusters.length + "/"+RECORDS_PER_BATCH)
      if (!clusters.length) {
        console.log("case1")
        const data = merge(store.agents.clusters, clusterData, 'id')
        yield put(updateclusters({ data }))
        clusterData = []
        return
      }
      clusterData.push(...clusters)
      if (clusterData.length >= RECORDS_PER_BATCH || page === 0) {
        console.log("case2",clusterData.length)
        const data = merge(store.agents.clusters, clusterData, 'id')
        yield put(updateclusters({ data }))
        yield delay(200)
        clusterData = []
      }
      page = page + RECORDS_PER_PAGE
    } catch (e) {
      console.log(e)
      return
    }
  }
}

function * watchFetchRecords () {
  while (true) {
    yield call(fetchRecordsAsync)
    yield delay(1000)
  }
}

export function * watchRecordsCancellable () {
  while (true) {
    yield take('START_FETCH_RECORD')
    const task = yield fork(watchFetchRecords)
    yield take('STOP_FETCH_RECORD')
    yield cancel(task)
  }
}
