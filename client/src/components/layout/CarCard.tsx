import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { useCars } from "../../context/cars/CarContext";
import { VehicleType } from "../../types/Vehicle";
import { chargerIcon } from "./utils";

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

type CarCardProps = {
  car: VehicleType;
};

const CarCard: FunctionComponent<CarCardProps> = ({ car }) => {
  const classes = useStyles();

  const { deleteCar, setCar, getCars } = useCars();

  const handleDelete = (_id?: string) => {
    if (_id) deleteCar(_id);
  };

  const handleEdit = (car: VehicleType) => {
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
              {car.plugins?.map((plugin, index) => {
                return (
                  <Box
                    className={classes.pluginIcon}
                    key={`${car.id}_${index}`}
                  >
                    {chargerIcon(plugin)}
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
                  onClick={() => handleDelete(car.id)}
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
