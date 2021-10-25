import { Button, Divider, Grid, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import React, { FunctionComponent, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthContext";
import StationContext from "../../context/stations/stationContext";
import { Station } from "../../types/Station";
import UserStation from "../layout/UserStation";

const useStyles = makeStyles(() => ({
  stationsWrapper: {
    backgroundColor: "#f4f6ff",
    minHeight: "100vh",
    padding: "0 10vw",
  },
  topPanel: {
    display: "flex",
    justifyContent: "space-between",
    margin: "1rem",
  },
  title: {
    color: "#127681",
  },
  loading: {
    margin: "10rem auto",
  },
}));

const MyStations: FunctionComponent = () => {
  const classes = useStyles();

  const stationContext = useContext(StationContext);

  const { loadUser } = useAuth();
  const { userstations, getUserStations, loading } = stationContext;

  useEffect(() => {
    loadUser();
    getUserStations();
  }, [loadUser, getUserStations]);

  return (
    <Box className={classes.stationsWrapper}>
      <Grid container justify="center">
        <Grid item xs={10} className={classes.topPanel}>
          <Typography variant="h4" className={classes.title}>
            My stations
          </Typography>
          <Link to="/add-station" style={{ textDecoration: "none" }}>
            <Button variant="contained" startIcon={<AddToPhotosIcon />}>
              Add station
            </Button>
          </Link>
        </Grid>
      </Grid>

      <Divider />

      {loading ? (
        <Typography variant="h6" align="center" className={classes.title}>
          <CircularProgress color="primary" className={classes.loading} />
        </Typography>
      ) : (
        <Box>
          {userstations.length === 0 ? (
            <Typography variant="h6" align="center" className={classes.title}>
              Add your first station :)
            </Typography>
          ) : (
            userstations.map((userstation: Station) => {
              return (
                <UserStation key={userstation._id} station={userstation} />
              );
            })
          )}
        </Box>
      )}
    </Box>
  );
};

export default MyStations;
