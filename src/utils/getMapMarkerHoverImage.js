import {
  avatarHoverMarker,
  buildingHoverMarker,
  buyerHoverMarker,
  dataHoverMarker,
  financialHoverMarker,
  furnitureHoverMarker,
  iotHoverMarker,
  testHoverMarker,
  vehicleHoverMarker,
  viewerHoverMarker,
  sellerHoverMarker,
} from "../assets/icons/map/markers_hover";

import genusConstants from "../constants/genusConstants";

export default function getMapMarkerHoverImage(genus) {
  switch (genus) {
    case genusConstants.avatar:
      return avatarHoverMarker;

    case genusConstants.building:
      return buildingHoverMarker;

    case genusConstants.buyer:
      return buyerHoverMarker;

    case genusConstants.data:
      return dataHoverMarker;

    case genusConstants.financial:
      return financialHoverMarker;

    case genusConstants.furniture:
      return furnitureHoverMarker;

    case genusConstants.iot:
      return iotHoverMarker;

    case genusConstants.service:
      return sellerHoverMarker;

    case genusConstants.test:
      return testHoverMarker;

    case genusConstants.vehicle:
      return vehicleHoverMarker;

    case genusConstants.viewer:
      return viewerHoverMarker;

    default:
      return testHoverMarker;
  }
}
