import React from "react";
import { Route } from "react-router-dom";
import AddStation from "./components/pages/add-station/AddStation";
import ChargersMap from "./components/pages/chargersmap/ChargersMap";
import Dashboard from "./components/pages/dashboard/Dashboard";
import EditStation from "./components/pages/edit-station/EditStation";
import Login from "./components/pages/login/Login";
import Main from "./components/pages/main/Main";
import MyReservations from "./components/pages/my-reservations/MyReservations";
import MyStations from "./components/pages/my-stations/MyStations";
import MyVehicles from "./components/pages/my-vehicles/MyVehicles";
import Register from "./components/pages/register/Register";
import PrivateRoute from "./components/routing/PrivateRoute";

const routes = [
  { path: "/", component: Main, public: false },
  { path: "/dashboard", component: Dashboard, public: false },
  { path: "/my-vehicles", component: MyVehicles, public: false },
  { path: "/my-stations", component: MyStations, public: false },
  { path: "/add-station", component: AddStation, public: false },
  { path: "/edit-station", component: EditStation, public: false },
  { path: "/my-reservations", component: MyReservations, public: false },
  { path: "/chargersmap", component: ChargersMap, public: false },
  { path: "/login", component: Login, public: true },
  { path: "/register", component: Register, public: true },
];

const mappedRoutes = routes.map((route) =>
  route.public ? (
    <Route
      exact
      path={route.path}
      component={route.component}
      key={route.path}
    />
  ) : (
    <PrivateRoute
      exact
      path={route.path}
      component={route.component}
      key={route.path}
    />
  )
);

export default mappedRoutes;
