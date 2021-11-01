import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import React, { ChangeEvent, FunctionComponent, useEffect } from "react";
import { useCars } from "../../context/cars/CarContext";
import { useReservations } from "../../context/reservations/ReservationContext";
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

  const { getCars, cars } = useCars();
  const { setReservationCar, carId } = useReservations();

  useEffect(() => {
    getCars();
  }, [getCars]);

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
