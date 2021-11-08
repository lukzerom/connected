import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AlertType, useAlert } from "../../../context/alert/AlertContext";
import { useAuth } from "../../../context/auth/AuthContext";
import { useStyles } from "./utils";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const classes = useStyles();
  const { setAlert } = useAlert();
  const history = useHistory();
  const { login, error, clearErrors, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }

    if (error === "Invalid credentials") {
      setAlert(error, AlertType.ERROR);
      clearErrors();
    }
  }, [error, isAuthenticated, history, clearErrors, setAlert]);

  const { email, password } = user;

  const onChange = (e: ChangeEvent<any>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: ChangeEvent<any>) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setAlert("Please set all fields", AlertType.ERROR);
    } else {
      login({
        email,
        password,
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onChange}
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Login;
