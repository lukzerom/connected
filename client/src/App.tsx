import MomentUtils from "@date-io/moment";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import Footer from "./components/layout/Footer";
import Nav from "./components/layout/Nav";
import { AlertProvider } from "./context/alert/AlertContext";
import { AuthProvider } from "./context/auth/AuthContext";
import { CarProvider } from "./context/cars/CarContext";
import { ReservationsProvider } from "./context/reservations/ReservationContext";
import { StationProvider } from "./context/stations/StationContext";
import mappedRoutes from "./Routes";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const theme = createTheme({
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
      <Router>
        <MuiThemeProvider theme={theme}>
          <AlertProvider>
            <AuthProvider>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <ReservationsProvider>
                  <StationProvider>
                    <CarProvider>
                      <Nav />
                      <Switch>{mappedRoutes}</Switch>
                      <Footer />
                    </CarProvider>
                  </StationProvider>
                </ReservationsProvider>
              </MuiPickersUtilsProvider>
            </AuthProvider>
          </AlertProvider>
        </MuiThemeProvider>
      </Router>
    </div>
  );
};

export default App;
