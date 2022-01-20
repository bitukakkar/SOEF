import AlertBox from "../../components/AlertBox";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateError } from "../../reducers/agents";

function Alert({ error, updateError }) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    updateError(null);
  };

  useEffect(() => {
    if (error) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [error]);

  return <AlertBox open={open} handleClose={handleClose} />;
}

const mapStateToProps = (state) => ({
  error: state.agents.error,
});

export default connect(mapStateToProps, { updateError })(Alert);
