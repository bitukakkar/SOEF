import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState, memo } from "react";
import { AutoSizer, Column, Table } from "react-virtualized";
import { connect } from "react-redux";
import { updateSelectedAgent } from "../../reducers/agents";
import { Tooltip } from "@material-ui/core";

import TableCellImage from "./TableCellImage";

const styles = (theme) => ({
  flexContainer: {
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
    flex: 1,
  },
  table: {
    // temporary right-to-left patch, waiting for
    // https://github.com/bvaughn/react-virtualized/issues/454
    "& .ReactVirtualized__Table__headerRow": {
      flip: false,
      paddingRight: theme.direction === "rtl" ? "0 !important" : undefined,
    },
  },
  tableRow: {
    cursor: "pointer",
    borderBottom: 0,
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
  noClick: {
    cursor: "initial",
  },
  selected: {
    backgroundColor: "rgba(33, 209, 204, .3)",
    width: "100%",
    borderRadius: "2px",
  },
});

const headerHeight = 30;
const rowHeight = 40;

function MuiVirtualizedTable(props) {
  const tableRef = useRef(null);

  const [scrollTo, setScrollTo] = useState(-1);

  const getRowClassName = ({ index, ...others }) => {
    const { classes, onRowClick } = props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
      [classes.selected]: scrollTo === others.rowIndex,
    });
  };

  const cellRenderer = ({ cellData, columnIndex, ...others }) => {
    const { classes, onRowClick } = props;
    return (
      <div
        className={clsx({
          [classes.selected]: scrollTo === others.rowIndex,
        })}
      >
        <Tooltip title={cellData}>
          <TableCell
            className={clsx(classes.tableCell, classes.flexContainer, {
              [classes.noClick]: onRowClick == null,
            })}
            component="div"
            variant="body"
            style={{ height: rowHeight }}
          >
            {/* add table cell image */}
            {others?.dataKey === "name" ? (
              <TableCellImage genus={others.rowData.genus} />
            ) : (
              <></>
            )}
            {cellData}
          </TableCell>
        </Tooltip>
      </div>
    );
  };

  const headerRenderer = ({ label, columnIndex }) => {
    return (
      <TableCell
        style={{ height: headerHeight }}
        component="div"
        variant="head"
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  useEffect(() => {
    if (props.selectedAgent) {
      const foundIndex = props.agents.findIndex(
        (x) => x.address === props.selectedAgent.address
      );
      setScrollTo(foundIndex);
    } else {
      setScrollTo(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selectedAgent]);

  const { classes, columns, ...tableProps } = props;
  return (
    <AutoSizer>
      {({ height, width }) => (
        <Table
          height={height}
          width={width}
          ref={tableRef}
          rowHeight={rowHeight}
          gridStyle={{
            direction: "inherit",
          }}
          scrollToIndex={scrollTo}
          headerHeight={headerHeight}
          className={classes.table}
          {...tableProps}
          rowClassName={getRowClassName}
          onRowClick={({ index }) => {
            props.updateSelectedAgent(props.agents[index]);
          }}
          noRowsRenderer={() => {
            return (
              <div
                style={{
                  margin: "12px 8px",
                  display: "flex",
                  justifyContent: "center",
                  color: "grey",
                }}
              >
                No Data Found
              </div>
            );
          }}
        >
          {columns.map(({ dataKey, ...other }, index) => {
            return (
              <Column
                key={dataKey}
                headerRenderer={(headerProps) =>
                  headerRenderer({
                    ...headerProps,
                    columnIndex: index,
                  })
                }
                className={classes.flexContainer}
                cellRenderer={cellRenderer}
                dataKey={dataKey}
                {...other}
              />
            );
          })}
        </Table>
      )}
    </AutoSizer>
  );
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      width: PropTypes.number,
    })
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number,
};

const mapStateToProps = (state) => ({
  selectedAgent: state.agents.selectedAgent,
});

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

export default connect(mapStateToProps, { updateSelectedAgent })(
  memo(VirtualizedTable)
);
