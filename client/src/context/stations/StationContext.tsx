import React, {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useState,
} from "react";
import { axios } from "../../axios";
import { Nullable } from "../../types";
import { Station } from "../../types/Station";
import { AlertType, useAlert } from "../alert/AlertContext";

const initialState = {
  stations: [],
  stationMapModal: { latitude: 0, longitude: 0 },
  avaiableStations: [],
  error: null,
  position: [50.270873, 16.25341],
  zoom: 5,
  pickedStation: null,
  userstations: [],
  markerPosition: { lat: 50.270873, lng: 16.25341 },
  editStation: null,
  loading: true,
  pictureUrl: "",
  plugin: "",
};

type StationContextType = {
  getAvailableStations: (from?: number, to?: number) => void;
  getStations: () => void;
  getStation: (id: string) => void;
  setEditStation: (station: Station) => void;
  updateStation: (station: Station) => void;
  deleteStation: (id: string) => void;
  addStation: (station: Station) => void;
  setMarkerPosition: (markerPosition: Array<number>) => void;
  getUserStations: () => void;
  setStation: (station: Station) => void;
  setPosition: (position: Array<number>) => void;
  setZoom: (zoom: number) => void;
  getLatLang: (adress: string) => void;
};

type StationProviderType = {
  children: ReactNode;
};

type StationStateType = {
  stations: Array<Station>;
  stationMapModal: { latitude: number; longitude: number };
  avaiableStations: Array<Station>;
  position: Array<number>;
  zoom: number;
  pickedStation: Nullable<Station>;
  userstations: Array<Station>;
  markerPosition: { lat: number; lng: number };
  editStation: Nullable<Station>;
  loading: boolean;
  pictureUrl: string;
  plugin: string;
};

const StationContext = createContext(
  {} as StationContextType & StationStateType
);

export const useStations = () => {
  return useContext(StationContext);
};

const StationProvider: FunctionComponent<StationProviderType> = ({
  children,
}) => {
  const [state, setState] = useState<StationStateType>(initialState);
  const { setAlert } = useAlert();

  const getStations = async () => {
    axios
      .get("/api/stations")
      .then((response) => {
        setState({ ...state, stations: response.data, loading: false });
      })
      .catch((error) => {
        setAlert(error.msg, AlertType.ERROR);
        setState({ ...state, loading: false });
      });
  };
  //Get station
  const getStation = async (id: string) => {
    axios
      .get(`/api/stations/${id}`)
      .then((response) => {
        setState({ ...state, stationMapModal: response.data, loading: false });
      })
      .catch((error) => {
        setAlert(error.msg, AlertType.ERROR);
        setState({ ...state, loading: false });
      });
  };

  //Get available stations in picked time range
  const getAvailableStations = async (from?: number, to?: number) => {
    if (from === null) from = new Date().setMinutes(0);
    if (to === null) to = new Date().setMinutes(0);

    axios
      .get(`/api/stations/availablestations/${from}/${to}`)
      .then((response) => {
        setState({ ...state, avaiableStations: response.data, loading: false });
      })
      .catch((error) => {
        setAlert(error.response.data.msg, AlertType.ERROR);
        setState({ ...state, loading: false });
      });
  };

  //Get choosen adress latlang
  const getLatLang = async (adress: string) => {
    axios
      .get(`/api/stations/getlatlang/${adress}`)
      .then((response) => {
        setState({
          ...state,
          markerPosition: { lat: response.data.lat, lng: response.data.lng },
          loading: false,
        });
      })
      .catch((error) => {
        setAlert(error.response.data.msg, AlertType.ERROR);
        setState({ ...state, loading: false });
      });
  };

  //Get choosen station
  const setEditStation = (station: Station) => {
    setState({ ...state, editStation: station });
  };

  //Set map position
  const setPosition = (position: Array<number>) => {
    setState({ ...state, position });
  };

  //Setting zoom to manage map
  const setZoom = (zoom: number) => {
    setState({ ...state, zoom });
  };

  //Setting picked station to state
  const setStation = (station: Station) => {
    setState({ ...state, pickedStation: station });
  };

  //Get user stations
  const getUserStations = async () => {
    axios
      .get("/api/stations/userstations")
      .then((response) => {
        setState({ ...state, userstations: response.data, loading: false });
      })
      .catch((error) => {
        setAlert(error.response.data.msg, AlertType.ERROR);
        setState({ ...state, loading: false });
      });
  };

  //Set marker position
  const setMarkerPosition = (markerPosition: Array<number>) => {
    setState({
      ...state,
      markerPosition: { lat: markerPosition[0], lng: markerPosition[1] },
      loading: false,
    });
  };

  //Add station
  const addStation = async (station: Station) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post("/api/stations", station, config)
      .then((response) => {
        setState({
          ...state,
          userstations: [response.data, ...state.userstations],
          loading: false,
        });
        setAlert("Station added! ", AlertType.SUCCESS);
      })
      .catch((error) => {
        setAlert(error.response.data.msg, AlertType.ERROR);
        setState({ ...state, loading: false });
      });
  };

  //Update station
  const updateStation = async (station: Station) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .put(`/api/stations/${station.id}`, station, config)
      .then((response) => {
        setState({
          ...state,
          userstations: [...state.userstations],
          loading: false,
        });
        setAlert("Station edited! ", AlertType.SUCCESS);
      })
      .catch((error) => {
        setAlert(error.response.data.msg, AlertType.ERROR);
        setState({ ...state, loading: false });
      });
  };

  //Delete station

  const deleteStation = async (id: string) => {
    axios
      .delete(`/api/stations/${id}`)
      .then((response) => {
        setState({
          ...state,
          userstations: state.userstations.filter(
            (station) => station._id !== id
          ),
        });
        setAlert("Station deleted! ", AlertType.SUCCESS);
      })
      .catch((error) => {
        setAlert(error.response.data.msg, AlertType.ERROR);
        setState({ ...state, loading: false });
      });
  };

  return (
    <StationContext.Provider
      value={{
        stations: state.stations,
        stationMapModal: state.stationMapModal,
        avaiableStations: state.avaiableStations,
        position: state.position,
        zoom: state.zoom,
        pickedStation: state.pickedStation,
        userstations: state.userstations,
        markerPosition: state.markerPosition,
        editStation: state.editStation,
        loading: state.loading,
        pictureUrl: state.pictureUrl,
        plugin: state.plugin,
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
      {children}
    </StationContext.Provider>
  );
};

export { StationProvider };
