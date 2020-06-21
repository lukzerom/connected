import {
  GET_ALL_STATIONS,
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
  GET_STATION,
  GET_LATLANG,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_STATIONS:
      return { ...state, stations: action.payload, loading: false };
    case GET_STATION:
      return { ...state, stationMapModal: action.payload, loading: false };
    case GET_AVAIABLE_STATIONS:
      return { ...state, avaiableStations: action.payload, loading: false };
    case SET_POSITION:
      return { ...state, position: action.payload, loading: false };
    case SET_MAP_ZOOM:
      return { ...state, zoom: action.payload, loading: false };
    case SET_CURRENT_STATION:
      return { ...state, station: action.payload, loading: false };
    case GET_USER_STATIONS:
      return { ...state, userstations: action.payload, loading: false };
    case SET_MARKER_POSITION:
      return {
        ...state,
        markerPosition: { lat: action.payload[0], lng: action.payload[1] },
        loading: false,
      };

    case GET_LATLANG:
      return {
        ...state,
        markerPosition: { lat: action.payload.lat, lng: action.payload.lng },
        loading: false,
      };

    case SET_EDIT_STATION:
      return { ...state, editStation: action.payload, loading: false };

    case ADD_STATION:
      return {
        ...state,
        userstations: [action.payload, ...state.userstations],
        loading: false,
      };

    case EDIT_STATION:
      return {
        ...state,
        userstations: [...state.userstations],
        loading: false,
      };

    case STATION_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_STATION:
      return {
        ...state,
        userstations: state.userstations.filter(
          (station) => station._id !== action.payload
        ),
        loading: false,
      };

    default:
      return state;
  }
};
