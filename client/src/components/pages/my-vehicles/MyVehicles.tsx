import { Button, Divider, Grid, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { useEffectOnce } from "react-use";
import { useCars } from "../../../context/cars/CarContext";
import { VehicleType } from "../../../types/Vehicle";
import CarCard from "../../layout/CarCard";
import { useStyles } from "./utils";

const MyVehicles: FunctionComponent = () => {
  const classes = useStyles();

  const { getCars, cars, loading } = useCars();

  useEffectOnce(() => {
    getCars();
  });

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
            cars.map((car: VehicleType) => {
              return <CarCard key={car._id} car={car} />;
            })
          )}
        </Grid>
      )}
    </Box>
  );
};

export default MyVehicles;
