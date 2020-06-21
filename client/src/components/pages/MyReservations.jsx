import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import ReservationContext from "../../context/reservations/reservationContext";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Typography, Divider, Grid } from "@material-ui/core";
import ReservationCard from "../layout/ReservationCard";
import ReservationCardStation from "../layout/ReservationCardStation";
import MapDialog from "../layout/MapDialog";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  vehiclesWrapper: {
    backgroundColor: "#f4f6ff",
    minHeight: "100vh",
    padding: "0 10vw",
  },
  topPanel: {
    display: "flex",
    justifyContent: "space-between",
    margin: "1rem",
  },
  carContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  card: {
    margin: "1rem",
  },
  title: {
    color: "#127681",
  },
  noReservations: {
    color: "#127681",
    marginTop: "50%",
  },
  loading: {
    margin: "10rem auto",
  },
}));

const MyReservations = () => {
  const authContext = useContext(AuthContext);
  const reservationContext = useContext(ReservationContext);
  const classes = useStyles();

  const {
    getUserReservationsAsDriver,
    getUserReservationsAsStation,
    userReservationsAsDriver,
    userReservationsAsStation,
    loadingUserTrips,
  } = reservationContext;

  useEffect(() => {
    authContext.loadUser();
    getUserReservationsAsDriver();
    getUserReservationsAsStation();
    //eslint-disable-next-line
  }, []);

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
            {loadingUserTrips ? (
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
                  userReservationsAsDriver.map((reservation) => {
                    return (
                      <ReservationCard
                        key={reservation._id}
                        reservation={reservation}
                      />
                    );
                  })
                )}
              </Box>
            )}
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" align="center" className={classes.title}>
              Reservation of your stations
            </Typography>
            {loadingUserTrips ? (
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
                  userReservationsAsStation.map((reservation) => {
                    return (
                      <ReservationCardStation
                        key={reservation._id}
                        reservation={reservation}
                      />
                    );
                  })
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
