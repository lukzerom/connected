import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import StationContext from "../../context/stations/stationContext";
import ReservationContext from "../../context/reservations/reservationContext";
import ChargerIcon from "./ChargerIcon";
import Extras from "../layout/Extras";
import EvStationIcon from "@material-ui/icons/EvStation";
import moment from "moment";

import {
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Divider,
  Grid,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    margin: "1rem",
    height: "95%",
  },
  media: {
    width: "100%",
    height: "10rem",
    objectFit: "contain",
  },
  divider: {
    margin: "1rem 0",
  },
  icon: {
    verticalAlign: "middle",
    marginRight: "0.5rem",
    fontSize: "16px",
    color: "#127681",
  },
  subtitle: {
    fontSize: "14px",
    verticalAlign: "middle",
    margin: "0",
  },
  plugin: {
    height: "8rem",
    objectFit: "contain",
    margin: "0 auto",
  },
  price: {
    alignSelf: "center",
  },
  rating: {
    verticalAlign: "middle",
    marginLeft: "1rem",
  },
  extrasBox: {
    display: "flex",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    color: "#127681",
  },
}));

const ChargerDetails = () => {
  const stationContext = useContext(StationContext);
  const reservationContext = useContext(ReservationContext);
  const {
    dateFrom,
    dateTo,
    toggleModal,
    isModalOpen,
    isReservationModalOpen,
    toggleReservationModal,
  } = reservationContext;

  const { station } = stationContext;
  const classes = useStyles();

  const from = moment(dateFrom).format("YYYY-MM-DD HH:00");
  const to = moment(dateTo).format("YYYY-MM-DD HH:00");

  const duration = moment.duration(moment(dateTo).diff(moment(dateFrom)));
  const durationHours = Math.round(duration.asHours());

  const handleModal = () => {
    toggleModal(!isModalOpen);
  };

  const handleReservationModal = () => {
    toggleReservationModal(!isReservationModalOpen);
  };

  return (
    <Card className={classes.card}>
      {station === undefined ? (
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            variant="h3"
            align="center"
          >
            Please pick a station
          </Typography>
        </CardContent>
      ) : (
        <>
          <CardContent>
            <Typography className={classes.title} variant="h6" align="center">
              {station.name}
            </Typography>

            <Divider variant="middle" className={classes.divider} />
            {station.picture ? (
              <CardMedia
                className={classes.media}
                image={station.picture}
                title="Station picture"
                component="img"
              />
            ) : (
              <EvStationIcon className={classes.media} />
            )}

            <Divider variant="middle" className={classes.divider} />
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Typography
                  className={classes.subtitle}
                  variant="subtitle2"
                  color="textSecondary"
                  gutterBottom
                  fontWeight="fontWeightBold"
                  align="center"
                >
                  <LocationCityIcon className={classes.icon} />
                  {station.city}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  className={classes.subtitle}
                  color="textSecondary"
                  variant="subtitle2"
                  gutterBottom
                  fontWeight="fontWeightBold"
                  align="center"
                >
                  <LocationOnIcon className={classes.icon} />
                  Al. {station.street} {station.streetNumber}
                </Typography>
              </Grid>
            </Grid>
            <Divider variant="middle" className={classes.divider} />
            <Grid container spacing={3}>
              <Grid item xs={6} align="center" className={classes.plugin}>
                <ChargerIcon plugin={station.plugin} />
              </Grid>
              <Grid item xs={6} align="center">
                <Typography
                  color="textSecondary"
                  variant="h4"
                  gutterBottom
                  fontWeight="fontWeightBold"
                  className={classes.price}
                >
                  {station.price} EUR / h
                </Typography>
              </Grid>
            </Grid>
            <Divider variant="middle" className={classes.divider} />
            <Typography color="textSecondary" gutterBottom>
              Extras:
            </Typography>
            <Box className={classes.extrasBox}>
              {station.additives.map((extra, index) => {
                return <Extras key={index} extra={extra} />;
              })}
            </Box>
            <Divider variant="middle" className={classes.divider} />
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Typography
                  className={classes.subtitle}
                  variant="subtitle2"
                  color="textSecondary"
                  gutterBottom
                  fontWeight="fontWeightBold"
                  align="center"
                >
                  From: {from}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  className={classes.subtitle}
                  variant="subtitle2"
                  color="textSecondary"
                  gutterBottom
                  fontWeight="fontWeightBold"
                  align="center"
                >
                  To: {to}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  className={classes.subtitle}
                  variant="subtitle2"
                  color="textSecondary"
                  gutterBottom
                  fontWeight="fontWeightBold"
                  align="center"
                >
                  Total hours: {durationHours}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid item xs={12} align="center" className={classes.buttons}>
              <Button variant="contained" size="large" onClick={handleModal}>
                Change time
              </Button>
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={handleReservationModal}
              >
                Book
              </Button>
            </Grid>
          </CardActions>
        </>
      )}
    </Card>
  );
};

export default ChargerDetails;
