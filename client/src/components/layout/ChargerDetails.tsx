import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EvStationIcon from "@material-ui/icons/EvStation";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import moment from "moment";
import React, { FunctionComponent, useContext } from "react";
import ReservationContext from "../../context/reservations/reservationContext";
import StationContext from "../../context/stations/stationContext";
import Extras from "./Extras";
import { chargerIcon } from "./utils";

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

const ChargerDetails: FunctionComponent = () => {
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
                  align="center"
                >
                  <LocationOnIcon className={classes.icon} />
                  Al. {station.street} {station.streetNumber}
                </Typography>
              </Grid>
            </Grid>
            <Divider variant="middle" className={classes.divider} />
            <Grid container spacing={3}>
              <Grid item xs={6} className={classes.plugin}>
                {chargerIcon(station.plugin)}
              </Grid>
              <Grid item xs={6}>
                <Typography
                  color="textSecondary"
                  variant="h4"
                  gutterBottom
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
              {station.additives.map((extra: string, index: number) => {
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
                  align="center"
                >
                  Total hours: {durationHours}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid item xs={12} className={classes.buttons}>
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
