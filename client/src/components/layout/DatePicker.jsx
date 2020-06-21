import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { DateTimePicker } from "@material-ui/pickers";
import ReservationContext from "../../context/reservations/reservationContext";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const DatePicker = () => {
  const classes = useStyles();
  const reservationContext = useContext(ReservationContext);

  const { dateFrom, dateTo, setDateFrom, setDateTo } = reservationContext;

  const handleDateFrom = (e) => {
    const time = moment(e).toDate();
    setDateFrom(time.setMinutes(0));
  };
  const handleDateTo = (e) => {
    const time = moment(e).toDate();
    setDateTo(time.setMinutes(0));
  };

  return (
    <Box className={classes.container}>
      <DateTimePicker
        label="Date from"
        inputVariant="outlined"
        value={dateFrom}
        onChange={handleDateFrom}
        minutesStep={60}
        views={["date", "year", "month", "hours"]}
      />

      <DateTimePicker
        label="Date to"
        inputVariant="outlined"
        value={dateTo}
        onChange={handleDateTo}
        minutesStep={60}
        views={["date", "year", "month", "hours"]}
      />
    </Box>
  );
};

export default DatePicker;
