import { IconButton, Menu, MenuItem } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/Menu";
import NearMeIcon from "@material-ui/icons/NearMe";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { useEffectOnce, useWindowSize } from "react-use";
import { useAuth } from "../../context/auth/AuthContext";
import { routes } from "../../Routes";

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
  const [mobile, setMobile] = useState(false);
  const [opened, setOpened] = useState(false);

  const anchorEl = useRef(null);

  const onLogout = () => {
    logout();
  };

  const { isAuthenticated, loadUser, logout } = useAuth();

  useEffectOnce(() => {
    if (localStorage.token) loadUser();
  });

  const { width, height } = useWindowSize();

  const handleClose = useCallback(() => {
    setOpened(false);
  }, []);

  const handleOpen = useCallback(() => {
    setOpened(true);
  }, []);

  useEffect(() => {
    if (width <= 1025) {
      console.log(width);
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, [width]);

  const navLinks = useMemo(
    () =>
      routes.map((route) => {
        return isAuthenticated
          ? !route.public && route.label && (
              <Link
                to={route.path}
                onClick={handleClose}
                style={{
                  textDecoration: "none",
                  color: mobile ? "#10375c" : "white",
                }}
              >
                <MenuItem>{route.label}</MenuItem>
              </Link>
            )
          : route.public && route.label && (
              <Link
                to={route.path}
                onClick={handleClose}
                style={{
                  textDecoration: "none",
                  color: mobile ? "#10375c" : "white",
                }}
              >
                <MenuItem>{route.label}</MenuItem>
              </Link>
            );
      }),
    [handleClose, isAuthenticated, mobile]
  );
  console.log(isAuthenticated);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <NearMeIcon /> Connected
            </Link>
          </Typography>
          {mobile ? (
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl.current}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              onClose={handleClose}
              open={opened}
            >
              {navLinks}
              {isAuthenticated && (
                <Button onClick={onLogout} color="inherit">
                  <ExitToAppIcon />
                  Logout
                </Button>
              )}
            </Menu>
          ) : (
            <div style={{ display: "flex" }}>
              {navLinks}
              {isAuthenticated && (
                <Button onClick={onLogout} color="inherit">
                  <ExitToAppIcon />
                  Logout
                </Button>
              )}{" "}
            </div>
          )}
          {mobile && (
            <IconButton
              aria-owns={"menu-appbar"}
              aria-haspopup="true"
              onClick={handleOpen}
              ref={anchorEl}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Nav;
