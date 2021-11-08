import axios from "axios";
import React, {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useState,
} from "react";
import { ReservationType } from "../../types/Reservation";
import { AlertType, useAlert } from "../alert/AlertContext";

type ReservationStateType = {
  userReservationsAsDriver: Array<ReservationType>;
  userReservationsAsStation: Array<ReservationType>;
  carId: string;
  loadingUserStations: boolean;
  loadingUserTrips: boolean;
  loading: boolean;
};

type ReservationProviderType = {
  children: ReactNode;
};

type ReservationContextType = {
  getUserReservationsAsDriver: () => void;
  getUserReservationsAsStation: () => void;
  addReservation: (reservation: {
    id: string;
    timeStampFrom: number;
    timeStampTo: number;
    carId: string;
  }) => void;
  deleteReservation: (id: string) => void;
  rejectReservation: (reservation: ReservationType) => void;
  confirmReservation: (reservation: ReservationType) => void;
  setReservationCar: (carId: string) => void;
};

const initialState = {
  userReservationsAsDriver: [],
  userReservationsAsStation: [],
  carId: "",
  loadingUserStations: true,
  loadingUserTrips: true,
  loading: true,
};

const ReservationContext = createContext(
  {} as ReservationContextType & ReservationStateType
);

export const useReservations = () => {
  return useContext(ReservationContext);
};

const ReservationsProvider: FunctionComponent<ReservationProviderType> = ({
  children,
}) => {
  const [state, setState] = useState<ReservationStateType>(initialState);

  const { setAlert } = useAlert();

  const getUserReservationsAsDriver = async () => {
    axios
      .get("/api/reservations/asdriver")
      .then((response) => {
        setState({
          ...state,
          userReservationsAsDriver: response.data,
          loadingUserTrips: false,
        });
      })
      .catch((error) => {
        setAlert(error.res.msg, AlertType.ERROR);
        setState({
          ...state,
          loadingUserTrips: false,
        });
      });
  };

  const getUserReservationsAsStation = async () => {
    axios
      .get("/api/reservations/ascharger")
      .then((response) => {
        setState({
          ...state,
          userReservationsAsStation: response.data,
          loadingUserStations: false,
        });
      })
      .catch((error) => {
        setAlert(error.res.msg, AlertType.ERROR);
        setState({
          ...state,
          loadingUserStations: false,
        });
      });
  };

  const addReservation = async (reservation: {
    id: string;
    timeStampFrom: number;
    timeStampTo: number;
    carId: string;
  }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post(`/api/reservations/${reservation.id}`, reservation, config)
      .then((response) => {
        if (response.data) {
          setState({
            ...state,
            userReservationsAsDriver: [
              ...state.userReservationsAsDriver,
              response.data,
            ],
            loadingUserStations: false,
          });

          setAlert("Station booked!", AlertType.SUCCESS);
        }
      })
      .catch((error) => {
        setAlert(error.res.msg, AlertType.ERROR);
        setState({
          ...state,
          loadingUserStations: false,
        });
      });
  };

  const deleteReservation = async (id: string) => {
    axios
      .delete(`/api/reservations/${id}`)
      .then((response) => {
        setState({
          ...state,
          userReservationsAsDriver: state.userReservationsAsDriver.filter(
            (reservation) => reservation._id !== response.data._id
          ),
          loadingUserStations: false,
        });
      })
      .catch((error) => {
        setAlert(error.res.msg, AlertType.ERROR);
        setState({ ...state, loading: false });
      });
  };

  const confirmReservation = async (reservation: ReservationType) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .put(`/api/reservations/${reservation._id}`, reservation, config)
      .then((response: any) => {
        setState({
          ...state,
          userReservationsAsStation: [
            ...state.userReservationsAsStation.map((reservation) =>
              reservation._id === response.data._id
                ? response.data
                : reservation
            ),
          ],
          loading: false,
        });
      })
      .catch((error) => {
        setAlert(error.res.msg, AlertType.ERROR);
        setState({ ...state });
      });
  };

  const rejectReservation = async (reservation: ReservationType) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .put(`/api/reservations/${reservation._id}`, reservation, config)
      .then((response: any) => {
        setState({
          ...state,
          userReservationsAsStation: state.userReservationsAsStation.map(
            (reservation) =>
              reservation._id === response.data._id
                ? response.data
                : reservation
          ),
        });
      })
      .catch((error) => {
        setAlert(error.res.msg, AlertType.ERROR);
        setState({ ...state, loading: false });
      });
  };

  const setReservationCar = (carId: string) => {
    setState({ ...state, carId });
  };

  return (
    <ReservationContext.Provider
      value={{
        userReservationsAsDriver: state.userReservationsAsDriver,
        userReservationsAsStation: state.userReservationsAsStation,
        carId: state.carId,
        loadingUserStations: state.loadingUserStations,
        loadingUserTrips: state.loadingUserTrips,
        loading: state.loading,
        getUserReservationsAsDriver,
        getUserReservationsAsStation,
        addReservation,
        deleteReservation,
        rejectReservation,
        setReservationCar,
        confirmReservation,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};

export { ReservationsProvider };
