import React, { useState, useEffect } from "react";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import { connect } from "react-redux";
import {
  updateSelectedValue,
  updateSelectedAgent,
} from "../../reducers/agents";
import "./style.sass";
import filterIcon from "./../../assets/filter_icon.png";

const AgentContainer = (props) => {
  const [selectValue, setSelectValue] = useState("name");
  const [open, setOpen] = useState(false);

  const handleSelection = (value) => {
    props.updateSelectedAgent(null);
    setSelectValue(value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    props.updateSelectedValue(selectValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectValue]);

  return (
    <div>
      <FormControl>
        <img
          src={filterIcon}
          alt="filter"
          id="openMenu"
          className="filter-icon"
          onClick={handleOpen}
        />
        <Select
          value={selectValue}
          onChange={(event) => handleSelection(event.target.value)}
          style={{ display: "none" }}
          open={open}
          onClose={handleClose}
          MenuProps={{
            anchorEl: document.getElementById("openMenu"),
            style: { marginTop: 45 },
          }}
        >
          <MenuItem value={"name"}>Name</MenuItem>
          <MenuItem value={"address"}>Address</MenuItem>
          <MenuItem value={"genus"}>Genus</MenuItem>
          <MenuItem value={"classification"}>Classification</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedValue: state.agents.selectedValue,
});

export default connect(mapStateToProps, {
  updateSelectedValue,
  updateSelectedAgent,
})(AgentContainer);
