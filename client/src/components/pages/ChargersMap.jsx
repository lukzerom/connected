import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AuthContext from "../../context/auth/authContext";
import ReservationContext from "../../context/reservations/reservationContext";
import StationContext from "../../context/stations/stationContext";
import ProtectedMap from "../layout/ProtectedMap";
import ChargerDetails from "../layout/ChargerDetails";
import { Grid } from "@material-ui/core";
import DatePickerDialog from "../layout/DatePickerDialog";
import ReservationDialog from "../layout/ReservationDialog";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  bg: {
    backgroundColor: "#f4f6ff",
    minHeight: "100vh",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ChargersMap = () => {
  const authContext = useContext(AuthContext);
  const stationContext = useContext(StationContext);
  const reservationContext = useContext(ReservationContext);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const { error, success, setError, setSuccess } = reservationContext;
  const { getAvailableStations } = stationContext;

  useEffect(() => {
    authContext.loadUser();
    getAvailableStations();
    //eslint-disable-next-line
  }, []);

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
    setError(null);
  };

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
    setSuccess(null);
  };

  const classes = useStyles();

  return (
    <Grid container direction="row">
      <Snackbar
        open={error || openError}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <Alert onClose={handleCloseError} severity="error">
          You cant book your own station!
        </Alert>
      </Snackbar>
      <Snackbar
        open={success || openSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSuccess}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          You just book this station!
        </Alert>
      </Snackbar>
      <DatePickerDialog />
      <ReservationDialog />
      <Grid item xs={12} sm={7}>
        <ProtectedMap />
      </Grid>
      <Grid item xs={12} sm={5} className={classes.bg}>
        <ChargerDetails />
      </Grid>
    </Grid>
  );
};

export default ChargersMap;
