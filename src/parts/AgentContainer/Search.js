import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  updateagents,
  updateFilteredData,
  updateSelectedAgent,
  updateSelectedValue,
  updateError,
} from "../../reducers/agents";
import "./style.sass";
import { useDebounce } from "use-debounce";
import AgentContainer from "./Select";

function Search(props) {
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebounce(value, 400);

  const selectedValue = props.selectedValue;

  const handleValue = (value) => {
    setValue(value);
  };

  const resetSearch = async () => {
    setValue("");
    updateSelectedValue("name");
    props.updateFilteredData({ data: [], activeSearch: false });
    props.updateSelectedAgent(null);
  };

  const search = async () => {
    if (!!selectedValue && !!value) {
      let onlineAgents = props.data || [];
      if (onlineAgents.length) {
        const filterData =
          onlineAgents.filter((agent) => {
            const agentLowerCaseValue = agent[selectedValue]
              .toString()
              .toLowerCase();

            const searchValue = value.toString().toLocaleLowerCase();
            return agentLowerCaseValue.includes(searchValue);
          }) || [];
        props.updateFilteredData({ data: filterData, activeSearch: true });
      }
    } else {
      props.updateError("testing");
    }
    props.updateSelectedAgent(null);
  };

  useEffect(() => {
    if (debouncedValue === "") {
      resetSearch();
      return;
    }

    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, props.selectedValue]);

  return (
    <>
      <div className="flex flex-spacebetween-center">
        <div className="search-input-container">
          <div className="search-input-box">
            <input
              type="text"
              className="search-input"
              placeholder="Search"
              onChange={(e) => handleValue(e.target.value)}
            />
          </div>
        </div>
        <div className="filter-container">
          <AgentContainer />
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  data: state.agents.data,
  selectedValue: state.agents.selectedValue,
});

export default connect(mapStateToProps, {
  updateagents,
  updateSelectedAgent,
  updateFilteredData,
  updateError,
})(Search);
