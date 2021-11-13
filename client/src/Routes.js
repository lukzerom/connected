import React from "react";
import { Route } from "react-router-dom";
import AddStation from "./components/pages/add-station/AddStation";
import ChargersMap from "./components/pages/chargersmap/ChargersMap";
import Dashboard from "./components/pages/dashboard/Dashboard";
import EditStation from "./components/pages/edit-station/EditStation";
import {
  default as AddVehicle,
  default as EditVehicle,
} from "./components/pages/edit-vehicle/EditVehicle";
import Login from "./components/pages/login/Login";
import Main from "./components/pages/main/Main";
import MyReservations from "./components/pages/my-reservations/MyReservations";
import MyStations from "./components/pages/my-stations/MyStations";
import MyVehicles from "./components/pages/my-vehicles/MyVehicles";
import Register from "./components/pages/register/Register";
import PrivateRoute from "./components/routing/PrivateRoute";

export const routes = [
  { path: "/", label: "", component: Main, public: false },
  {
    path: "/dashboard",
    label: "Dashboard",
    component: Dashboard,
    public: false,
  },
  {
    path: "/my-vehicles",
    label: "My Vehicles",
    component: MyVehicles,
    public: false,
  },
  {
    path: "/my-stations",
    label: "My Stations",
    component: MyStations,
    public: false,
  },
  {
    path: "/add-vehicle",
    label: "",
    component: AddVehicle,
    public: false,
  },
  { path: "/add-station", label: "", component: AddStation, public: false },
  { path: "/edit-station", label: "", component: EditStation, public: false },
  { path: "/edit-vehicle", label: "", component: EditVehicle, public: false },
  {
    path: "/my-reservations",
    label: "My Reservations",
    component: MyReservations,
    public: false,
  },
  {
    path: "/chargersmap",
    label: "Chargers Map",
    component: ChargersMap,
    public: false,
  },
  { path: "/login", label: "Login", component: Login, public: true },
  { path: "/register", label: "Register", component: Register, public: true },
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
