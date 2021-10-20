import { DialogActions, DialogContent } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";
import React, { FunctionComponent, useContext, useState } from "react";
import ReservationContext from "../../context/reservations/reservationContext";
import StationContext from "../../context/stations/stationContext";
import DatePicker from "./DatePicker";

const useStyles = makeStyles((theme) => ({
  stationsWrapper: {
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    width: "100%",
  },
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  dialogContent: {
    padding: theme.spacing(2),
  },
  divider: {
    margin: "1rem 0;",
  },
}));

const DatePickerDialog: FunctionComponent = () => {
  const [alert, setAlert] = useState(false);
  const reservationContext = useContext(ReservationContext);
  const stationContext = useContext(StationContext);

  const { dateFrom, dateTo, isModalOpen, toggleModal } = reservationContext;

  const { getAvailableStations } = stationContext;

  const classes = useStyles();

  const handleClose = () => {
    toggleModal(false);
  };

  const handleSearch = () => {
    if (dateFrom >= dateTo) {
      setAlert(true);
      const interval = window.setInterval(() => {
        setAlert(false);
        clearInterval(interval);
      }, 5000);
      return;
    }
    getAvailableStations(dateFrom, dateTo);
    toggleModal(false);
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isModalOpen}
      >
        <MuiDialogTitle disableTypography>
          <Typography variant="h6">
            Enter arrival and departure dates
          </Typography>

          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        <DialogContent dividers>
          <DatePicker />
          <Divider className={classes.divider} />
          <Typography>
            if you select the hours you are interested in, the application will
            only show you the stations available at that time. If you skip this
            step, you'll see the current status of the charging station.
          </Typography>
          {alert ? (
            <Alert severity="error">Please enter a valid date range</Alert>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSearch} color="primary">
            Search
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DatePickerDialog;
