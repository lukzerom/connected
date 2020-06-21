import {
  GET_RESERVATIONS_AS_DRIVER,
  GET_RESERVATIONS_AS_CHARGER,
  ADD_RESERVATION,
  DELETE_RESERVATION,
  CONFIRM_RESERVATION,
  REJECT_RESERVATION,
  SET_DATE_FROM,
  SET_DATE_TO,
  TOGGLE_MODAL,
  TOGGLE_RESERVATION_MODAL,
  RESERVATION_ERROR,
  SET_RESERVATION_CAR,
  TOGGLE_MAP_MODAL,
  SET_ERROR,
  SET_SUCCESS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_RESERVATIONS_AS_CHARGER:
      return {
        ...state,
        userReservationsAsStation: action.payload,
        loadingUserStations: false,
      };
    case GET_RESERVATIONS_AS_DRIVER:
      return {
        ...state,
        userReservationsAsDriver: action.payload,
        loadingUserTrips: false,
      };
    case TOGGLE_MODAL:
      return { ...state, isModalOpen: action.payload, loading: false };

    case TOGGLE_RESERVATION_MODAL:
      return {
        ...state,
        isReservationModalOpen: action.payload,
        loading: false,
      };

    case TOGGLE_MAP_MODAL:
      return {
        ...state,
        isMapModalOpen: action.payload,
        loading: false,
      };

    case SET_DATE_FROM:
      return { ...state, dateFrom: action.payload, loading: false };
    case SET_DATE_TO:
      return { ...state, dateTo: action.payload, loading: false };
    case SET_RESERVATION_CAR:
      return { ...state, carId: action.payload, loading: false };

    case ADD_RESERVATION:
      return {
        ...state,
        reservationsAsDriver: [
          ...state.userReservationsAsDriver,
          action.payload,
        ],
        success: true,
        loading: false,
      };

    case CONFIRM_RESERVATION:
      return {
        ...state,
        userReservationsAsStation: state.userReservationsAsStation.map(
          (reservation) =>
            reservation._id === action.payload._id
              ? action.payload
              : reservation
        ),
        loading: false,
      };

    case REJECT_RESERVATION:
      return {
        ...state,
        userReservationsAsStation: state.userReservationsAsStation.map(
          (reservation) =>
            reservation._id === action.payload._id
              ? action.payload
              : reservation
        ),
        loading: false,
      };

    case RESERVATION_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case SET_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };

    case DELETE_RESERVATION:
      return {
        ...state,
        userReservationsAsDriver: state.userReservationsAsDriver.filter(
          (reservation) => reservation._id !== action.payload
        ),
        loading: false,
      };
    default:
      return state;
  }
};
