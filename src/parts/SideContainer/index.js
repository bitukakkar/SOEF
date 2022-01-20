import React from "react";
import "./style.sass";
import StatusContainer from "../StatusContainer";
import AgentContainer from "../AgentContainer";
import logo from "./../../assets/LOGO_Black.png";

const SideContainer = () => {
  return (
    <div className="side-container side-nav-padding">
      <div className="side-container-logo">
        <img src={logo} alt="logo" className="logo" />
      </div>
      <StatusContainer />
      <div className="bottom-30"></div>
      <AgentContainer />
    </div>
  );
};

export default SideContainer;
