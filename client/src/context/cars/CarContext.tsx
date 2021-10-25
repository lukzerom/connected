import axios from "axios";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { Nullable } from "../../types";
import { VehicleType } from "../../types/Vehicle";

const initialState = {
  cars: [],
  editedCar: null,
  oneCar: null,
  loading: true,
};

type CarStateType = {
  cars: Array<VehicleType>;
  editedCar: Nullable<VehicleType>;
  oneCar: Nullable<string>;
  loading: boolean;
};

type CarProviderType = {
  children: ReactNode;
};

type CarContextType = {
  getCars: () => void;
  setCar: (car: VehicleType) => void;
  updateCar: (car: VehicleType) => void;
  deleteCar: (id: string) => void;
  addCar: (car: VehicleType) => void;
  getCar: (id: string) => void;
};

const CarContext = createContext({} as CarContextType & CarStateType);

export const useCars = () => {
  return useContext(CarContext);
};

const CarProvider = ({ children }: CarProviderType) => {
  const [state, setState] = useState<CarStateType>(initialState);

  const getCars = useCallback(() => {
    axios.get("/api/cars").then((response) => {
      setState({ ...state, cars: response.data.payload, loading: false });
    });
  }, [state]);

  const setCar = useCallback(
    (car: VehicleType) => {
      setState({ ...state, editedCar: car, loading: false });
    },
    [state]
  );

  const updateCar = useCallback(
    (car: VehicleType) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      axios.put(`/api/cars/${car.id}`, car, config).then(() => {
        setState({ ...state, cars: [...state.cars], loading: false });
      });
    },
    [state]
  );

  const deleteCar = useCallback(
    (id: string) => {
      axios.delete(`/api/cars/${id}`).then((response) => {
        setState({
          ...state,
          cars: state.cars.filter((car) => car._id !== response.data.payload),
          loading: false,
        });
      });
    },
    [state]
  );

  const addCar = useCallback(
    (car: VehicleType) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      axios.post("/api/cars", car, config).then((response) => {
        setState({ ...state, cars: [response.data.payload, ...state.cars] });
      });
    },
    [state]
  );

  const getCar = useCallback(
    (id: string) => {
      axios.get(`/api/cars/${id}`).then((response) => {
        setState({ ...state, oneCar: response.data.payload, loading: false });
      });
    },
    [state]
  );

  return (
    <CarContext.Provider
      value={{
        getCars,
        setCar,
        updateCar,
        deleteCar,
        addCar,
        getCar,
        oneCar: state.oneCar,
        cars: state.cars,
        editedCar: state.editedCar,
        loading: state.loading,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};

export { CarProvider };
