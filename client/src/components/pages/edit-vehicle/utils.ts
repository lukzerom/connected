import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  stationsWrapper: {
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    width: "100%",
  },
  topPanel: {
    display: "flex",
    justifyContent: "space-between",
    margin: "1rem",
  },

  paper: {
    marginTop: "2rem",
    width: "100%",
    height: "90vh",
    display: "flex",
    justifyContent: "space-around",
  },
  inner: {
    padding: "1rem",
  },
  divider: {
    margin: "1rem 0",
  },
  inputs: {
    display: "flex",
    justifyContent: "space-between",
    margin: "1rem 0",
  },
  formControl: {
    width: "50%",
  },
  select: {
    width: "12rem",
  },
  button: {
    width: "50%",
  },
  miniPluginWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  miniPlugin: {
    height: "3rem",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const initialVehicle = {
  brand: "",
  model: "",
  registration: "",
  plugins: [],
  plugin: "",
  errors: false,
};

export { useStyles, initialVehicle };
