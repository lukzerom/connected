import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import React, {
  ChangeEvent,
  FunctionComponent,
  useContext,
  useEffect,
} from "react";
import CarContext from "../../context/cars/carContext";
import ReservationContext from "../../context/reservations/reservationContext";
import { VehicleType } from "../../types/Vehicle";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CarSelect: FunctionComponent = () => {
  const classes = useStyles();
  const carContext = useContext(CarContext);
  const reservationContext = useContext(ReservationContext);
  const { getCars, cars } = carContext;
  const { setReservationCar, carId } = reservationContext;

  useEffect(() => {
    getCars();
  }, []);

  const handleChange = (e: ChangeEvent<any>) => {
    setReservationCar(e.target.value);
  };

  return (
    <FormControl className={classes.formControl} variant="outlined">
      <InputLabel id="car-select">Pick car</InputLabel>
      <Select
        labelId="car-select"
        id="car-label-select"
        onChange={handleChange}
        value={carId}
      >
        {cars.map((car: VehicleType) => {
          return (
            <MenuItem value={car._id} key={String(car._id)}>
              {car.brand} {car.model}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default CarSelect;
