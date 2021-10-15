import MomentUtils from "@date-io/moment";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Alerts from "./components/layout/Alerts";
import Footer from "./components/layout/Footer";
import Nav from "./components/layout/Nav";
import AddStation from "./components/pages/AddStation";
import AddVehicle from "./components/pages/AddVehicle";
import ChargersMap from "./components/pages/ChargersMap";
import Dashboard from "./components/pages/Dashboard";
import EditStation from "./components/pages/EditStation";
import EditVehicle from "./components/pages/EditVehicle";
import Login from "./components/pages/Login";
import Main from "./components/pages/Main";
import MyReservations from "./components/pages/MyReservations";
import MyStations from "./components/pages/MyStations";
import MyVehicles from "./components/pages/MyVehicles";
import Register from "./components/pages/Register";
import PrivateRoute from "./components/routing/PrivateRoute";
import AlertState from "./context/alert/AlertState";
import AuthState from "./context/auth/AuthState";
import CarState from "./context/cars/CarState";
import ReservationState from "./context/reservations/ReservationState";
import StationState from "./context/stations/StationState";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#10375c",
    },
    secondary: {
      main: "#e7305b",
    },
  },
});

const App = () => {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <AuthState>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <AlertState>
              <ReservationState>
                <StationState>
                  <CarState>
                    <Router>
                      <Nav />
                      <Alerts />
                      <Switch>
                        <PrivateRoute path="/dashboard" component={Dashboard} />
                        <PrivateRoute exact path="/" component={Main} />
                        <PrivateRoute
                          path="/my-vehicles"
                          component={MyVehicles}
                        />
                        <PrivateRoute
                          path="/my-stations"
                          component={MyStations}
                        />
                        <PrivateRoute
                          path="/add-station"
                          component={AddStation}
                        />
                        <PrivateRoute
                          path="/add-vehicle"
                          component={AddVehicle}
                        />
                        <PrivateRoute
                          path="/edit-station"
                          component={EditStation}
                        />
                        <PrivateRoute
                          path="/edit-vehicle"
                          component={EditVehicle}
                        />
                        <PrivateRoute
                          path="/my-reservations"
                          component={MyReservations}
                        />
                        <PrivateRoute
                          path="/chargersmap"
                          component={ChargersMap}
                        />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                      </Switch>
                      <Footer />
                    </Router>
                  </CarState>
                </StationState>
              </ReservationState>
            </AlertState>
          </MuiPickersUtilsProvider>
        </AuthState>
      </MuiThemeProvider>
    </div>
  );
};

export default App;
