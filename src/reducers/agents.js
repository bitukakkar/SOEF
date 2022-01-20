import { createSlice } from "@reduxjs/toolkit";

function merge(a, b, prop) {
  var reduced = a.filter(
    (aitem) => !b.find((bitem) => aitem[prop] === bitem[prop])
  );
  return reduced.concat(b);
}

const agents = createSlice({
  name: "agents",
  initialState: {
    data: [],
    clusters:[],
    filteredData: [],
    activeSearch: false,
    selectedAgent: null,
    nodeLatLng: null,
    selectedValue: "name",
    error: null,
    zoom: 4,
    bound: "",
  },
  reducers: {
    updateagents(state, action) {
      state.data = merge(state.data, action.payload.data, "address");
    },
    updateclusters(state, action) {
      state.clusters = action.payload.data; //merge(state.clusters, action.payload.data, "id");
    },
    updateFilteredData(state, action) {
      state.filteredData = action.payload.data;
      state.activeSearch = action.payload.activeSearch;
    },
    updateSelectedAgent(state, action) {
      state.selectedAgent = action.payload;
    },
    updateNodeLatLng(state, action) {
      state.nodeLatLng = action.payload;
    },
    updateSelectedValue(state, action) {
      state.selectedValue = action.payload;
    },
    updateError(state, action) {
      state.error = action.payload;
    },
    updateZoomLevel(state, action) {
      state.zoom = action.payload;
    },
    updateBoundLevel(state, action) {
      state.bound = action.payload;
    },
  },
});

const { actions, reducer } = agents;

export const {
  updateagents,
  updateSelectedAgent,
  updateFilteredData,
  updateNodeLatLng,
  updateSelectedValue,
  updateError,
  updateZoomLevel,
  updateBoundLevel,
  updateclusters
} = actions;

export default reducer;
