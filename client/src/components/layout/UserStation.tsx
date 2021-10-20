import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { FunctionComponent, useContext } from "react";
import { Link } from "react-router-dom";
import StationContext from "../../context/stations/stationContext";
import { Station } from "../../types/Station";
import Extras from "./Extras";
import { chargerIcon } from "./utils";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "1rem 0",
    height: "10rem",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    height: "80%",
    justifyContent: "space-between",
  },

  icon: {
    height: "100%",
    width: "3rem",
    marginRight: "2rem",
  },
  wrapper: {
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    top: "0",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  adressBox: {
    flexDirection: "column",
  },
  niceButtons: {
    borderRadius: "2rem",
  },
  extras: {
    display: "flex",
  },
  button: {
    width: "100%",
  },
}));

type UserStationProps = {
  station: Station;
};

const UserStation: FunctionComponent<UserStationProps> = ({ station }) => {
  const classes = useStyles();
  const stationContext = useContext(StationContext);
  const { setEditStation, userstations, deleteStation } = stationContext;

  const handleEdit = (id?: string) => {
    let station = userstations.filter((station: Station) => {
      return station._id === id;
    });

    let pickedStation = station[0];

    setEditStation(pickedStation);
  };

  const handleDelete = (id?: string) => {
    deleteStation(id);
  };

  return (
    <div>
      <Grid container justify="center">
        <Grid item xs={10}>
          <Card className={classes.card}>
            <CardContent className={classes.content}>
              <Grid item xs={2}>
                {chargerIcon(station.plugin)}
              </Grid>
              <Grid item xs={6}>
                <Box className={classes.adressBox}>
                  <Typography variant="h6">{station.name}</Typography>
                  <Typography variant="caption">
                    {station.country} {station.city} {station.streetName}{" "}
                    {station.streetNumber}
                  </Typography>
                  <Box className={classes.extras}>
                    {station.extras.map((extra, index) => (
                      <Extras key={index} extra={extra} />
                    ))}
                  </Box>
                </Box>
              </Grid>
              <Box>
                <Typography variant="h4">{station.price} EUR/h</Typography>
              </Box>
              <Box className={classes.box}>
                <Link
                  to="/edit-station"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => handleEdit(station._id)}
                  >
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={() => handleDelete(station._id)}
                >
                  Delete
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserStation;
