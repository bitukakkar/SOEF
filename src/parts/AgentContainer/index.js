import React, { memo } from "react";
import AgentList from "../AgentList/AgentList";
import Search from "./Search";
import "./style.sass";
import Alert from "./Alert";

const AgentContainer = () => {
  return (
    <div>
      <div className="side-nav-headers">Agents</div>
      <div className="bottom-10"></div>
      <div className="flex flex-col">
        <Search />
      </div>
      <div className="bottom-20"></div>
      <AgentList className="w-100" />
      <Alert />
    </div>
  );
};

export default memo(AgentContainer);
