import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckIcon from "@material-ui/icons/Check";
import EvStationIcon from "@material-ui/icons/EvStation";
import UpdateIcon from "@material-ui/icons/Update";
import moment from "moment";
import React, { FunctionComponent } from "react";
import { useReservations } from "../../context/reservations/ReservationContext";
import { ReservationType } from "../../types/Reservation";

const useStyles = makeStyles({
  root: {
    margin: "2rem",
    width: "100%",
  },

  title: {
    fontSize: "2rem",
  },

  row: {
    display: "flex",
    flexDirection: "row",
  },

  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "5rem",
  },

  icon: {
    fontSize: "5rem",
    color: "#303030",
  },
  register: {
    backgroundColor: "#eef9bf",
    borderRadius: "4px",
    flexGrow: 1,
  },
  pluginIcon: {
    height: "4rem",
    width: "30%",
  },
  divider: {
    margin: "1rem 0",
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
  },
  filler: {
    flexGrow: 1,
  },
  acceptance: {
    display: "inline-block",
  },
  smallIcon: {
    fontSize: "1rem",
  },
  green: {
    color: "#22bb33",
    display: "inline-block",
  },
  red: {
    color: "#bb2124",
    display: "inline-block",
  },
  card: {
    margin: "1rem",
  },
  info: {
    margin: "0 auto",
  },
});

type ReservationCardProps = {
  reservation: ReservationType;
};

const ReservationCard: FunctionComponent<ReservationCardProps> = ({
  reservation,
}) => {
  const classes = useStyles();

  let from = moment(reservation.timeStampFrom).format("YYYY-MM-DD HH:00");
  let to = moment(reservation.timeStampTo).format("YYYY-MM-DD HH:00");

  const { confirmReservation, rejectReservation } = useReservations();

  const verification = (accepted: boolean, rejected: boolean) => {
    if (!accepted && !rejected) {
      return (
        <Box className={classes.acceptance}>
          <UpdateIcon className={classes.smallIcon} /> Pending
        </Box>
      );
    }

    if (accepted) {
      return (
        <Box className={classes.green}>
          <CheckIcon className={classes.smallIcon} /> Accepted
        </Box>
      );
    }

    if (rejected) {
      return (
        <Box className={classes.red}>
          <CancelIcon className={classes.smallIcon} /> Rejected
        </Box>
      );
    }
  };

  const handleAccept = (reservation: ReservationType) => {
    const changedReservation = {
      ...reservation,
      isOwnerAccepted: true,
    };

    confirmReservation(changedReservation);
  };

  const handleReject = (reservation: ReservationType) => {
    const changedReservation = {
      ...reservation,
      isOwnerRejected: true,
    };

    rejectReservation(changedReservation);
  };

  const buttons = (reservation: ReservationType) => {
    if (!reservation.isOwnerAccepted && !reservation.isOwnerRejected) {
      return (
        <>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={() => handleReject(reservation)}
          >
            Reject
          </Button>
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={() => handleAccept(reservation)}
          >
            Accept
          </Button>
        </>
      );
    } else {
      if (reservation.isOwnerRejected) {
        return (
          <Typography className={classes.info}>
            You have rejected the reservation
          </Typography>
        );
      }
      if (reservation.isOwnerAccepted) {
        return (
          <Typography className={classes.info}>
            You have accepted the reservation
          </Typography>
        );
      }
    }
  };

  return (
    <>
      <Grid item xs={12} className={classes.card}>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Grid container className={classes.row}>
              <Grid item xs={4}>
                <EvStationIcon className={classes.icon} />
              </Grid>
              <Grid item xs={8}>
                <Typography className={classes.title}>
                  {reservation.stationName}
                </Typography>
                <Typography color="textSecondary" variant="caption">
                  {reservation.stationStreet}
                </Typography>
              </Grid>
            </Grid>
            <Divider className={classes.divider} />
            <Grid className={classes.row}>
              <Box className={classes.register}>
                <Typography variant="h3" align="center">
                  {reservation.carRegistration}
                </Typography>
              </Box>
            </Grid>
            <Divider className={classes.divider} />
            <Grid container>
              <Grid xs={6}>
                <Typography align="center">
                  <strong>Date from: </strong> {from}
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography align="center">
                  <strong>Date to :</strong> {to}
                </Typography>
              </Grid>
            </Grid>
            <Divider className={classes.divider} />
            <Grid container>
              <Grid xs={6}>
                <Typography align="center">
                  <strong>Driver:</strong> {reservation.userName}, Tel:{" "}
                  {reservation.userPhone}{" "}
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography align="center">
                  Verification:{" "}
                  {verification(
                    reservation.isOwnerAccepted,
                    reservation.isOwnerRejected
                  )}
                </Typography>
              </Grid>
            </Grid>
            <Divider className={classes.divider} />
            <Grid container>
              <Grid xs={12}>
                <Typography align="center">
                  You will earn <strong>{reservation.fullPrice}</strong> euros
                </Typography>
              </Grid>
            </Grid>
            <Divider className={classes.divider} />
            <Grid container xs={12} className={classes.buttons}>
              {buttons(reservation)}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default ReservationCard;
