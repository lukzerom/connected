import React, { useReducer } from "react";
import axios from "axios";
import StationContext from "./stationContext";
import stationReducer from "./stationReducer";
import {
  GET_ALL_STATIONS,
  GET_STATION,
  STATION_ERROR,
  SET_POSITION,
  SET_MAP_ZOOM,
  SET_CURRENT_STATION,
  GET_USER_STATIONS,
  SET_MARKER_POSITION,
  ADD_STATION,
  SET_EDIT_STATION,
  EDIT_STATION,
  DELETE_STATION,
  GET_AVAIABLE_STATIONS,
  GET_LATLANG,
} from "../types";

const StationState = (props) => {
  const initialState = {
    stations: null,
    stationMapModal: { latitude: 0, longitude: 0 },
    avaiableStations: null,
    error: null,
    position: [50.270873, 16.25341],
    zoom: 5,
    pickedStation: null,
    userstations: [],
    markerPosition: { lat: 50.270873, lng: 16.25341 },
    editStation: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(stationReducer, initialState);

  //Get stations
  const getStations = async () => {
    try {
      const res = await axios.get("/api/stations");
      dispatch({ type: GET_ALL_STATIONS, payload: res.data });
    } catch (err) {
      dispatch({ type: STATION_ERROR, payload: err.res.msg });
    }
  };

  //Get station
  const getStation = async (id) => {
    try {
      const res = await axios.get(`/api/stations/${id}`);
      dispatch({ type: GET_STATION, payload: res.data });
    } catch (err) {
      dispatch({ type: STATION_ERROR, payload: err.res.msg });
    }
  };

  //Get available stations in picked time range
  const getAvailableStations = async (from, to) => {
    if (from === null) from = new Date().setMinutes(0);
    if (to === null) to = new Date().setMinutes(0);
    try {
      const res = await axios.get(
        `/api/stations/availablestations/${from}/${to}`
      );
      dispatch({ type: GET_AVAIABLE_STATIONS, payload: res.data });
    } catch (err) {
      dispatch({ type: STATION_ERROR, payload: err.res.msg });
    }
  };

  //Get choosen adress latlang
  const getLatLang = async (adress) => {
    try {
      const res = await axios.get(`/api/stations/getlatlang/${adress}`);

      dispatch({ type: GET_LATLANG, payload: res.data });
    } catch (err) {
      dispatch({ type: STATION_ERROR, payload: err.res.msg });
    }
  };

  //Get choosen station
  const setEditStation = (stat) => {
    dispatch({
      type: SET_EDIT_STATION,
      payload: stat,
    });
  };

  //Set map position
  const setPosition = (position) => {
    dispatch({
      type: SET_POSITION,
      payload: position,
    });
  };

  //Setting zoom to manage map
  const setZoom = (zoom) => {
    dispatch({
      type: SET_MAP_ZOOM,
      payload: zoom,
    });
  };

  //Setting picked station to state
  const setStation = (station) => {
    dispatch({
      type: SET_CURRENT_STATION,
      payload: station,
    });
  };

  //Get user stations
  const getUserStations = async () => {
    try {
      const res = await axios.get("/api/stations/userstations");
      dispatch({ type: GET_USER_STATIONS, payload: res.data });
    } catch (err) {
      dispatch({ type: STATION_ERROR, payload: err.res.msg });
    }
  };

  //Set marker position
  const setMarkerPosition = (markerPosition) => {
    dispatch({
      type: SET_MARKER_POSITION,
      payload: markerPosition,
    });
  };

  //Add station
  const addStation = async (station) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/stations", station, config);
      dispatch({ type: ADD_STATION, payload: res.data });
    } catch (err) {
      dispatch({ type: STATION_ERROR, payload: err.msg });
    }
  };

  //Update station
  const updateStation = async (station) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(
        `/api/stations/${station.id}`,
        station,
        config
      );
      dispatch({ type: EDIT_STATION, payload: res.data });
    } catch (err) {
      dispatch({ type: STATION_ERROR, payload: err.res.msg });
    }
  };

  //Delete station
  const deleteStation = async (id) => {
    try {
      await axios.delete(`/api/stations/${id}`);
      dispatch({ type: DELETE_STATION, payload: id });
    } catch (err) {
      dispatch({ type: STATION_ERROR, payload: err.res.msg });
    }
  };

  return (
    <StationContext.Provider
      value={{
        stations: state.stations,
        stationMapModal: state.stationMapModal,
        loading: state.loading,
        position: state.position,
        zoom: state.zoom,
        error: state.error,
        station: state.station,
        userstations: state.userstations,
        markerPosition: state.markerPosition,
        editStation: state.editStation,
        avaiableStations: state.avaiableStations,
        getAvailableStations,
        getStations: getStations,
        getStation: getStation,
        setEditStation: setEditStation,
        updateStation: updateStation,
        deleteStation: deleteStation,
        addStation: addStation,
        setMarkerPosition: setMarkerPosition,
        getUserStations: getUserStations,
        setStation: setStation,
        setPosition: setPosition,
        setZoom: setZoom,
        getLatLang,
      }}
    >
      {props.children}
    </StationContext.Provider>
  );
};

export default StationState;
