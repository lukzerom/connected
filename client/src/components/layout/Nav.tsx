import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import NearMeIcon from "@material-ui/icons/NearMe";
import React, { Fragment, FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Nav: FunctionComponent = () => {
  const { isAuthenticated, logout } = useAuth();

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <Fragment>
      <Link
        style={{ textDecoration: "none", color: "white" }}
        to="/chargersmap"
      >
        <Button color="inherit">Chargers Map</Button>
      </Link>
      <Link
        style={{ textDecoration: "none", color: "white" }}
        to="/my-stations"
      >
        <Button color="inherit">My stations</Button>
      </Link>
      <Link
        style={{ textDecoration: "none", color: "white" }}
        to="/my-vehicles"
      >
        <Button color="inherit">My Vehicles</Button>
      </Link>
      <Link
        style={{ textDecoration: "none", color: "white" }}
        to="/my-reservations"
      >
        <Button color="inherit">My Reservations</Button>
      </Link>
      <Button onClick={onLogout} color="inherit">
        <ExitToAppIcon />
        Logout
      </Button>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Link style={{ textDecoration: "none", color: "white" }} to="/register">
        <Button color="inherit">Register</Button>
      </Link>
      <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
        <Button color="inherit">Login</Button>
      </Link>
    </Fragment>
  );

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <NearMeIcon /> Connected
            </Link>
          </Typography>{" "}
          {isAuthenticated ? authLinks : guestLinks}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Nav;
