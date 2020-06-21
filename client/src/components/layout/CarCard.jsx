import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CarContext from "../../context/cars/carContext";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import ChargerIcon from "./ChargerIcon";
import { Link } from "react-router-dom";

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
    flexDirection: "column",
    justifyContent: "space-between",
  },
  filler: {
    flexGrow: 1,
  },
  button: {
    width: "100%",
  },
});

const CarCard = ({ car }) => {
  const classes = useStyles();
  const carContext = useContext(CarContext);

  const { deleteCar, setCar, getCars } = carContext;

  const handleDelete = (id) => {
    deleteCar(id);
  };

  const handleEdit = (car) => {
    setCar(car);
    getCars();
  };

  return (
    <>
      <Grid item xs={5}>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Grid container className={classes.row}>
              <Grid item xs={4}>
                <DriveEtaIcon className={classes.icon} />
              </Grid>
              <Box>
                <Typography className={classes.title}>{car.brand}</Typography>
                <Typography color="textSecondary" variant="caption">
                  {car.model}
                </Typography>
              </Box>
            </Grid>
            <Divider className={classes.divider} />
            <Grid className={classes.row}>
              <Box className={classes.register}>
                <Typography variant="h2" align="center">
                  {car.registration}
                </Typography>
              </Box>
            </Grid>
            <Divider className={classes.divider} />
            <Grid container className={classes.footer}>
              {car.plugins.map((plugin, index) => {
                return (
                  <Box
                    className={classes.pluginIcon}
                    key={`${car.id}_${index}`}
                  >
                    <ChargerIcon plugin={plugin} />
                  </Box>
                );
              })}

              <Box className={classes.buttons}>
                <Link to="/edit-vehicle" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    className={classes.button}
                    onClick={() => handleEdit(car)}
                  >
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="contained"
                  size="small"
                  color="secondary"
                  className={classes.button}
                  onClick={() => handleDelete(car._id)}
                >
                  Delete
                </Button>
              </Box>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Box className={classes.filler}></Box>
    </>
  );
};

export default CarCard;
