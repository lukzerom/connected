import { Grid } from "@material-ui/core";
import React, { FunctionComponent, useCallback, useState } from "react";
import { useEffectOnce } from "react-use";
import { useStations } from "../../../context/stations/StationContext";
import ChargerDetails from "../../layout/ChargerDetails";
import DatePickerDialog from "../../layout/DatePickerDialog";
import ProtectedMap from "../../layout/ProtectedMap";
import ReservationDialog from "../../layout/ReservationDialog";
import { useStyles } from "./utils";

const ChargersMap: FunctionComponent = () => {
  const [dateFrom, setDateFrom] = useState(new Date().setMinutes(0));
  const [dateTo, setDateTo] = useState(new Date().setMinutes(0));

  const [modalOpen, setModalOpen] = useState(false);
  const [reservationModalOpen, setReservationModalOpen] = useState(false);

  const { getAvailableStations } = useStations();
  const classes = useStyles();

  useEffectOnce(() => {
    getAvailableStations();
  });

  const toggleModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen]);

  const toggleReservationModal = useCallback(() => {
    setReservationModalOpen(!reservationModalOpen);
  }, [reservationModalOpen]);

  return (
    <Grid container direction="row">
      <DatePickerDialog
        toggleModal={toggleModal}
        modalOpen={modalOpen}
        setDateFrom={setDateFrom}
        setDateTo={setDateTo}
        dateFrom={dateFrom}
        dateTo={dateTo}
      />
      <ReservationDialog
        toggleReservationModal={toggleReservationModal}
        reservationModalOpen={reservationModalOpen}
        dateFrom={dateFrom}
        dateTo={dateTo}
      />
      <Grid item xs={12} sm={7}>
        <ProtectedMap />
      </Grid>
      <Grid item xs={12} sm={5} className={classes.bg}>
        <ChargerDetails
          toggleModal={toggleModal}
          toggleReservationModal={toggleReservationModal}
          dateFrom={dateFrom}
          dateTo={dateTo}
        />
      </Grid>
    </Grid>
  );
};

export default ChargersMap;
