import { Grid } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import React, {
  FunctionComponent,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "../../context/auth/AuthContext";
import ReservationContext from "../../context/reservations/reservationContext";
import StationContext from "../../context/stations/stationContext";
import ChargerDetails from "../layout/ChargerDetails";
import DatePickerDialog from "../layout/DatePickerDialog";
import ProtectedMap from "../layout/ProtectedMap";
import ReservationDialog from "../layout/ReservationDialog";

const useStyles = makeStyles((theme) => ({
  bg: {
    backgroundColor: "#f4f6ff",
    minHeight: "100vh",
  },
}));

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ChargersMap: FunctionComponent = () => {
  const stationContext = useContext(StationContext);
  const reservationContext = useContext(ReservationContext);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const { error, success, setError, setSuccess } = reservationContext;
  const { getAvailableStations } = stationContext;

  const { loadUser } = useAuth();

  useEffect(() => {
    loadUser();
    getAvailableStations();
  }, []);

  const handleCloseError = (event: SyntheticEvent<Element, Event>) => {
    setOpenError(false);
    setError(null);
  };

  const handleCloseSuccess = (event: SyntheticEvent<Element, Event>) => {
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
