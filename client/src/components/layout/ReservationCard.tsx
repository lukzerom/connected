import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckIcon from "@material-ui/icons/Check";
import EmojiTransportationIcon from "@material-ui/icons/EmojiTransportation";
import UpdateIcon from "@material-ui/icons/Update";
import moment from "moment";
import React, { FunctionComponent, useCallback, useState } from "react";
import { useReservations } from "../../context/reservations/ReservationContext";
import { useStations } from "../../context/stations/StationContext";
import { ReservationType } from "../../types/Reservation";

const useStyles = makeStyles({
  root: {
    margin: "2rem",
    width: "100%",
    ["@media (max-width:1024px)"]: {
      margin: 0,
    },
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
});

type ReservationCardProps = {
  reservation: ReservationType;
};

const ReservationCard: FunctionComponent<ReservationCardProps> = ({
  reservation,
}) => {
  const [mapModal, setMapModal] = useState(false);

  const classes = useStyles();

  const { getStation } = useStations();

  const toggleMapModal = useCallback(() => {
    setMapModal(!mapModal);
  }, [mapModal, setMapModal]);

  const { deleteReservation } = useReservations();

  let from = moment(reservation.timeStampFrom).format("YYYY-MM-DD HH:00");
  let to = moment(reservation.timeStampTo).format("YYYY-MM-DD HH:00");

  const verification = (accepted: boolean, rejected: boolean) => {
    if (!accepted && !rejected) {
      return (
        <Typography display="inline" className={classes.acceptance}>
          <UpdateIcon className={classes.smallIcon} /> Pending
        </Typography>
      );
    }

    if (accepted) {
      return (
        <Typography display="inline" className={classes.green}>
          <CheckIcon className={classes.smallIcon} /> Accepted
        </Typography>
      );
    }

    if (rejected) {
      return (
        <Typography display="inline" className={classes.red}>
          <CancelIcon className={classes.smallIcon} /> Rejected
        </Typography>
      );
    }
  };

  const handleDelete = (id: string) => {
    deleteReservation(id);
  };

  const handleMapModal = async (id: string) => {
    toggleMapModal();
    await getStation(id);
  };

  return (
    <>
      <Grid item xs={12} className={classes.card}>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Grid container className={classes.row}>
              <Grid item xs={3}>
                <EmojiTransportationIcon className={classes.icon} />
              </Grid>

              <Grid item>
                <Typography className={classes.title}>
                  {reservation.stationCity}
                </Typography>
                <Typography color="textSecondary" variant="caption">
                  {reservation.stationStreet}
                </Typography>
              </Grid>
            </Grid>
            <Divider className={classes.divider} />
            <Grid container>
              <Grid xs={6} item>
                <Typography align="center">
                  <strong>Date from: </strong> {from}
                </Typography>
              </Grid>
              <Grid xs={6} item>
                <Typography align="center">
                  <strong>Date to :</strong> {to}
                </Typography>
              </Grid>
            </Grid>
            <Divider className={classes.divider} />

            <Grid container>
              <Grid xs={6} item>
                <Typography align="center">
                  <strong>Owner:</strong> {reservation.ownerName}, Tel:{" "}
                  {reservation.ownerPhone}{" "}
                </Typography>
              </Grid>
              <Grid xs={6} item>
                <Grid>
                  <Typography display="inline">Verification: </Typography>

                  {verification(
                    reservation.isOwnerAccepted,
                    reservation.isOwnerRejected
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Divider className={classes.divider} />
            <Grid container>
              <Grid xs={12} item>
                <Typography align="center">
                  Prepare <strong>{reservation.fullPrice}</strong> euros in
                  cash, please
                </Typography>
              </Grid>
            </Grid>
            <Divider className={classes.divider} />
            <Grid container className={classes.footer}>
              <Button
                variant="contained"
                size="small"
                onClick={() => handleMapModal(reservation.station)}
                disabled
              >
                See on map
              </Button>

              <Button
                id={reservation._id}
                variant="contained"
                size="small"
                color="secondary"
                onClick={() => handleDelete(String(reservation._id))}
              >
                Delete
              </Button>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default ReservationCard;
