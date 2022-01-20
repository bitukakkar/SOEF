import React from "react";
import "./style.sass";

const StatusBlock = ({ image, title, subTitle }) => {
  return (
    <div className="status-block">
      <div className="status-block-image-circle">
        <img src={image} alt="" className="status-block-image" />
      </div>
      <h4 className="status-block-title">{title || 0}</h4>
      <p className="status-block-sub-title">{subTitle}</p>
    </div>
  );
};

export default StatusBlock;
