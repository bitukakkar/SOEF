import {
  vehicleMarker,
  dataMarker,
  financialMarker,
  avatarMarker,
  buildingMarker,
  viewerMarker,
  testMarker,
  iotMarker,
  furnitureMarker,
  buyerMarker,
  sellerMarker,
  // agentsMarker,
} from "../assets/icons/map/markers";

import genusConstants from "../constants/genusConstants";

export default function getMapMarkerImage(genus) {
  switch (genus) {
    case genusConstants.avatar:
      return avatarMarker;

    case genusConstants.building:
      return buildingMarker;

    case genusConstants.buyer:
      return buyerMarker;

    case genusConstants.data:
      return dataMarker;

    case genusConstants.financial:
      return financialMarker;

    case genusConstants.furniture:
      return furnitureMarker;

    case genusConstants.iot:
      return iotMarker;

    case genusConstants.service:
      return sellerMarker;

    case genusConstants.test:
      return testMarker;

    case genusConstants.vehicle:
      return vehicleMarker;

    case genusConstants.viewer:
      return viewerMarker;

    default:
      return testMarker;
  }
}
