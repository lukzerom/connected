import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { DateTimePicker } from "@material-ui/pickers";
import moment, { MomentInput } from "moment";
import React, { Dispatch, FunctionComponent } from "react";

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

type DatePickerProps = {
  setDateTo: Dispatch<React.SetStateAction<number>>;
  setDateFrom: Dispatch<React.SetStateAction<number>>;
  dateFrom: number;
  dateTo: number;
};

const DatePicker: FunctionComponent<DatePickerProps> = ({
  setDateFrom,
  setDateTo,
  dateFrom,
  dateTo,
}) => {
  const classes = useStyles();

  const handleDateFrom = (e: MomentInput) => {
    const time = moment(e).toDate();
    setDateFrom(time.setMinutes(0));
  };
  const handleDateTo = (e: MomentInput) => {
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
