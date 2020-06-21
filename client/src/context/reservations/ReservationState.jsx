import React, { useReducer } from "react";
import axios from "axios";
import ReservationContext from "./reservationContext";
import reservationnReducer from "./reservationReducer";
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

const ReservationState = (props) => {
  const initialState = {
    userReservationsAsDriver: [],
    userReservationsAsStation: [],
    isModalOpen: true,
    isMapModalOpen: false,
    carId: "",
    isReservationModalOpen: false,
    dateFrom: new Date().setMinutes(0),
    dateTo: new Date().setMinutes(0),
    error: null,
    success: null,
    loadingUserStations: true,
    loadingUserTrips: true,
  };

  const [state, dispatch] = useReducer(reservationnReducer, initialState);

  const {
    userReservationsAsDriver,
    userReservationsAsStation,
    isModalOpen,
    isReservationModalOpen,
    carId,
    isMapModalOpen,
    error,
    success,
    loadingUserStations,
    loadingUserTrips,
  } = state;

  const getUserReservationsAsDriver = async () => {
    try {
      const res = await axios.get("/api/reservations/asdriver");
      dispatch({ type: GET_RESERVATIONS_AS_DRIVER, payload: res.data });
    } catch (err) {
      dispatch({ type: RESERVATION_ERROR, payload: err.res.msg });
    }
  };

  const getUserReservationsAsStation = async () => {
    try {
      const res = await axios.get("/api/reservations/ascharger");
      dispatch({ type: GET_RESERVATIONS_AS_CHARGER, payload: res.data });
    } catch (err) {
      dispatch({ type: RESERVATION_ERROR, payload: err.res.msg });
    }
  };

  const addReservation = async (reservation) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        `/api/reservations/${reservation.id}`,
        reservation,
        config
      );
      dispatch({ type: ADD_RESERVATION, payload: res.data });
    } catch (err) {
      dispatch({ type: RESERVATION_ERROR, payload: err.response.data.msg });
    }
  };

  const deleteReservation = async (id) => {
    try {
      await axios.delete(`/api/reservations/${id}`);
      dispatch({ type: DELETE_RESERVATION, payload: id });
    } catch (err) {
      dispatch({ type: RESERVATION_ERROR, payload: err.res.msg });
    }
  };

  const confirmReservation = async (reservation) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(
        `/api/reservations/${reservation._id}`,
        reservation,
        config
      );
      dispatch({ type: CONFIRM_RESERVATION, payload: res.data });
    } catch (err) {
      dispatch({ type: RESERVATION_ERROR, payload: err.res.msg });
    }
  };

  const rejectReservation = async (reservation) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(
        `/api/reservations/${reservation._id}`,
        reservation,
        config
      );
      dispatch({ type: REJECT_RESERVATION, payload: res.data });
    } catch (err) {
      dispatch({ type: RESERVATION_ERROR, payload: err.res.msg });
    }
  };

  const setDateFrom = (dateFrom) => {
    dispatch({
      type: SET_DATE_FROM,
      payload: dateFrom,
    });
  };

  const setError = (error) => {
    dispatch({
      type: SET_ERROR,
      payload: error,
    });
  };

  const setDateTo = (dateTo) => {
    dispatch({
      type: SET_DATE_TO,
      payload: dateTo,
    });
  };

  const toggleModal = (isModalOpen) => {
    dispatch({
      type: TOGGLE_MODAL,
      payload: isModalOpen,
    });
  };

  const toggleMapModal = (isMapModalOpen) => {
    dispatch({
      type: TOGGLE_MAP_MODAL,
      payload: isMapModalOpen,
    });
  };

  const toggleReservationModal = (isReservationModalOpen) => {
    dispatch({
      type: TOGGLE_RESERVATION_MODAL,
      payload: isReservationModalOpen,
    });
  };

  const setReservationCar = (carId) => {
    dispatch({
      type: SET_RESERVATION_CAR,
      payload: carId,
    });
  };

  const setSuccess = (success) => {
    dispatch({
      type: SET_SUCCESS,
      payload: success,
    });
  };

  return (
    <ReservationContext.Provider
      value={{
        dateFrom: state.dateFrom,
        dateTo: state.dateTo,
        isModalOpen,
        isReservationModalOpen,
        userReservationsAsDriver,
        userReservationsAsStation,
        carId,
        isMapModalOpen,
        error,
        success,
        loadingUserStations,
        loadingUserTrips,
        getUserReservationsAsDriver,
        getUserReservationsAsStation,
        addReservation,
        deleteReservation,
        toggleModal,
        toggleReservationModal,
        confirmReservation,
        rejectReservation,
        setDateFrom,
        setDateTo,
        setReservationCar,
        toggleMapModal,
        setError,
        setSuccess,
      }}
    >
      {props.children}
    </ReservationContext.Provider>
  );
};

export default ReservationState;
