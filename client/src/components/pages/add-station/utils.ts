import { makeStyles } from "@material-ui/core/styles";

const defaultStation = {
  name: "",
  country: "",
  city: "",
  street: "",
  streetNumber: "",
  pictureUrl: "",
  longitude: 0,
  latitude: 0,
  price: 0,
  plugin: "",
  extras: [],
  drive: false,
  bed: false,
  bike: false,
  coffee: false,
  bus: false,
  errors: false,
};

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
    width: "10rem",
  },
  button: {
    width: "50%",
  },
}));

export { defaultStation, useStyles };
