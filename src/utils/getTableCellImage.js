import {
  Robot,
  Vehicle,
  Avatar,
  Building,
  Buyer,
  Data,
  Financial,
  Furniture,
  Iot,
  service,
  Test,
  Viewer,
} from "../assets/icons/table_cell";
import genusConstants from "../constants/genusConstants";

const getTableCellImage = (genus) => {
  switch (genus) {
    case genusConstants.avatar:
      return Avatar;

    case genusConstants.building:
      return Building;

    case genusConstants.buyer:
      return Buyer;

    case genusConstants.data:
      return Data;

    case genusConstants.financial:
      return Financial;

    case genusConstants.furniture:
      return Furniture;

    case genusConstants.iot:
      return Iot;

    case genusConstants.service:
      return service;

    case genusConstants.test:
      return Test;

    case genusConstants.vehicle:
      return Vehicle;

    case genusConstants.viewer:
      return Viewer;

    default:
      return Robot;
  }
};

export default getTableCellImage;
