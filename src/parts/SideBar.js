import React from "react";
import "./style.sass";
import Status from "../StatusComponent.js";
import AgentContainer from "../AgentContainer/AgentContainer.js";

const SideBar = () => {
  return (
    <div className="side-container side-nav-padding">
      <Status />
      <div className="bottom-20"></div>
      <div className="divider"></div>
      <div className="bottom-20"></div>
      <AgentContainer />
    </div>
  );
};

export default SideBar;
