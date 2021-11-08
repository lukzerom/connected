import { Button, Divider, Grid, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { useEffectOnce } from "react-use";
import { useStations } from "../../../context/stations/StationContext";
import { Station } from "../../../types/Station";
import UserStation from "../../layout/UserStation";
import { useStyles } from "./utils";

const MyStations: FunctionComponent = () => {
  const classes = useStyles();

  const { userstations, getUserStations, loading } = useStations();

  useEffectOnce(() => {
    getUserStations();
  });

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
