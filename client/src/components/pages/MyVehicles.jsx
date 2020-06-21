import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import CarContext from "../../context/cars/carContext";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Typography, Divider, Button, Grid } from "@material-ui/core";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import { Link } from "react-router-dom";
import CarCard from "../layout/CarCard";
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
  },
  title: {
    color: "#127681",
  },
  noVehicles: {
    color: "#127681",
    width: "100%",
  },
  loading: {
    margin: "10rem auto",
  },
}));

const MyVehicles = () => {
  const authContext = useContext(AuthContext);
  const carContext = useContext(CarContext);
  const classes = useStyles();

  const { getCars, cars, loading } = carContext;

  useEffect(() => {
    authContext.loadUser();
    getCars();
    //eslint-disable-next-line
  }, []);

  return (
    <Box className={classes.vehiclesWrapper}>
      <Grid container justify="center">
        <Grid item xs={10} className={classes.topPanel}>
          <Typography className={classes.title} variant="h4">
            My Vehicles
          </Typography>
          <Link to="/add-vehicle" style={{ textDecoration: "none" }}>
            <Button variant="contained" startIcon={<AddToPhotosIcon />}>
              Add vehicle
            </Button>
          </Link>
        </Grid>
      </Grid>

      <Divider />

      {loading ? (
        <Grid container className={classes.carContainer}>
          <CircularProgress color="primary" className={classes.loading} />
        </Grid>
      ) : (
        <Grid container className={classes.carContainer}>
          {cars.length === 0 ? (
            <Typography
              variant="h6"
              align="center"
              className={classes.noVehicles}
            >
              Add your first vehicle :)
            </Typography>
          ) : (
            cars.map((car) => {
              return <CarCard key={car._id} car={car} />;
            })
          )}
        </Grid>
      )}
    </Box>
  );
};

export default MyVehicles;
