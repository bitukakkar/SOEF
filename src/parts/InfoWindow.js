/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import { Tooltip } from "@material-ui/core";
import { InfoBox } from "@react-google-maps/api";
import { connect } from "react-redux";
import React from "react";
import closIcon from "../assets/close-icon.svg";
import { updateSelectedAgent } from "../reducers/agents";
import "./InfoWindow.sass";
import { getTableCellImage, validateIsSvgFile } from "../utils";

const InfoWindow = (props) => {
  const marker = props.selectedAgent || {};

  function getTimeDiff(time) {
    let msec = parseInt(time);
    let secondsInHour = 3600;
    let secondsInMinute = 60;
    const hh = Math.floor(msec / secondsInHour);
    msec -= hh * secondsInHour;
    const mm = Math.floor(msec / secondsInMinute);
    msec -= mm * secondsInMinute;
    if (!hh) {
      return `${mm} minutes`;
    }
    return hh + " hours " + mm + " minutes";
  }

  function closeInfoBox(params) {
    props.updateSelectedAgent(null);
  }

  const Image = getTableCellImage(marker.genus);

  if (Object.keys(marker).length) {
    return (
      <InfoBox
        options={{ closeBoxURL: "", enableEventPropagation: true }}
        position={{
          lat: (props.selectedAgent && props.selectedAgent.latitude) || null,
          lng: (props.selectedAgent && props.selectedAgent.longitude) || null,
        }}
      >
        <div
          className="custom-popup popup-triangle-border"
          style={{
            background: "#fff 0% 0% no-repeat padding-box",
            color: "#1C232B",
            position: "relative",
            marginLeft: "15px !important",
          }}
        >
          <div className="popup-header">
            <div>
              <a
                onClick={() => {
                  closeInfoBox();
                }}
                className="close-icon"
              >
                <img src={closIcon} alt="close" />
              </a>
            </div>
            <div className="popup-header-content">
              <div className="agent-icon-div">
                {validateIsSvgFile(Image) ? (
                  <Image className="agent-icon svg-agent-icon" />
                ) : (
                  <img
                    src={getTableCellImage(marker.genus)}
                    alt="agent"
                    className="agent-icon"
                  />
                )}
              </div>
              <h3 className="popup-header-title">{marker?.genus} Agent</h3>
            </div>
          </div>
          <table className="info-window-table" style={{ tableLayout: "fixed" }}>
            <tbody>
              <tr>
                <th className="w-50 popup-title">Address:</th>
                <td className="popup-text text-ellipsis">
                  <Tooltip title={marker.chain + " : " + marker.address}>
                    <span className="popup-text text-ellipsis">
                      {marker.chain + " : " + marker.address}
                    </span>
                  </Tooltip>
                </td>
              </tr>
              <tr>
                <th className="w-50 popup-title">Last Activity:</th>
                <td className="popup-text text-ellipsis">
                  {getTimeDiff(marker.idle_for)}
                </td>
              </tr>
              <tr>
                <th className="w-50 popup-title">Age:</th>
                <td className="popup-text text-ellipsis">
                  {getTimeDiff(marker.age)}
                </td>
              </tr>
              <tr>
                <th className="w-50 mw-100px popup-title">Classification:</th>
                <td className="popup-text text-ellipsis">
                  <span className="popup-text text-ellipsis">
                    {marker.classification || "Not specified"}
                  </span>
                </td>
              </tr>
              <tr>
                <th className="w-50 popup-title">Descriptors:</th>
                <td className="popup-text text-ellipsis">{`${marker.personality_pieces} personality pieces, ${marker.service_keys} service keys`}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </InfoBox>
    );
  } else {
    return "";
  }
};

const mapStateToProps = (state) => ({
  selectedAgent: state.agents.selectedAgent,
});

export default connect(mapStateToProps, { updateSelectedAgent })(InfoWindow);
