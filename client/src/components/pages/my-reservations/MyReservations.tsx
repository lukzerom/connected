import { Divider, Grid, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import React, { FunctionComponent } from "react";
import { useEffectOnce } from "react-use";
import { useReservations } from "../../../context/reservations/ReservationContext";
import { ReservationType } from "../../../types/Reservation";
import MapDialog from "../../layout/MapDialog";
import ReservationCard from "../../layout/ReservationCard";
import ReservationCardStation from "../../layout/ReservationCardStation";
import { useStyles } from "./utils";

const MyReservations: FunctionComponent = () => {
  const classes = useStyles();

  const {
    getUserReservationsAsDriver,
    getUserReservationsAsStation,
    userReservationsAsDriver,
    userReservationsAsStation,
    loading,
  } = useReservations();

  useEffectOnce(() => {
    getUserReservationsAsStation();
    getUserReservationsAsDriver();
  });

  return (
    <>
      <MapDialog />
      <Box className={classes.vehiclesWrapper}>
        <Grid container justify="center">
          <Grid item xs={10} className={classes.topPanel}>
            <Typography variant="h4" className={classes.title}>
              My Reservations
            </Typography>
          </Grid>
        </Grid>

        <Divider />
        <Grid container justify="center" className={classes.carContainer}>
          <Grid item xs={6}>
            <Typography variant="h6" align="center" className={classes.title}>
              Reservation for your trip
            </Typography>
            {loading ? (
              <Typography variant="h6" align="center">
                <CircularProgress color="primary" className={classes.loading} />
              </Typography>
            ) : (
              <Box>
                {userReservationsAsDriver.length === 0 ? (
                  <Typography
                    variant="h6"
                    align="center"
                    className={classes.noReservations}
                  >
                    You dont have any reservations for trip
                  </Typography>
                ) : (
                  userReservationsAsDriver.map(
                    (reservation: ReservationType) => {
                      return (
                        <ReservationCard
                          key={reservation._id}
                          reservation={reservation}
                        />
                      );
                    }
                  )
                )}
              </Box>
            )}
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" align="center" className={classes.title}>
              Reservation of your stations
            </Typography>
            {loading ? (
              <Typography variant="h6" align="center">
                <CircularProgress color="primary" className={classes.loading} />
              </Typography>
            ) : (
              <Box>
                {userReservationsAsStation.length === 0 ? (
                  <Typography
                    variant="h6"
                    align="center"
                    className={classes.noReservations}
                  >
                    You dont have any reservations of your stations
                  </Typography>
                ) : (
                  userReservationsAsStation.map(
                    (reservation: ReservationType) => {
                      return (
                        <ReservationCardStation
                          key={reservation._id}
                          reservation={reservation}
                        />
                      );
                    }
                  )
                )}
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default MyReservations;
