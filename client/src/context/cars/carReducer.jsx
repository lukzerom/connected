import {
  GET_USER_CARS,
  ADD_CAR,
  EDIT_CAR,
  DELETE_CAR,
  CAR_ERROR,
  SET_CURRENT_CAR,
  GET_CAR,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_USER_CARS:
      return { ...state, cars: action.payload, loading: false };
    case GET_CAR:
      return { ...state, oneCar: action.payload, loading: false };

    case ADD_CAR:
      return {
        ...state,
        cars: [action.payload, ...state.cars],
        loading: false,
      };

    case SET_CURRENT_CAR:
      return {
        ...state,
        editedCar: action.payload,
        loading: false,
      };

    case EDIT_CAR:
      return {
        ...state,
        cars: [...state.cars],
        loading: false,
      };

    case CAR_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_CAR:
      return {
        ...state,
        cars: state.cars.filter((car) => car._id !== action.payload),
        loading: false,
      };
    default:
      return state;
  }
};
