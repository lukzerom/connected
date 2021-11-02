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
import React, { Dispatch, FunctionComponent, useState } from "react";
import { useStations } from "../../context/stations/StationContext";
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

type DatePickerDialogProps = {
  toggleModal: () => void;
  modalOpen: boolean;
  setDateTo: Dispatch<React.SetStateAction<number>>;
  setDateFrom: Dispatch<React.SetStateAction<number>>;
  dateFrom: number;
  dateTo: number;
};
const DatePickerDialog: FunctionComponent<DatePickerDialogProps> = ({
  toggleModal,
  modalOpen,
  setDateFrom,
  setDateTo,
  dateFrom,
  dateTo,
}) => {
  const [alert, setAlert] = useState(false);

  const { getAvailableStations } = useStations();

  const classes = useStyles();

  const handleClose = () => {
    toggleModal();
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
    toggleModal();
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={modalOpen}
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
          <DatePicker
            setDateFrom={setDateFrom}
            setDateTo={setDateTo}
            dateFrom={dateFrom}
            dateTo={dateTo}
          />
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
