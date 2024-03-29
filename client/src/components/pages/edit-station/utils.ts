import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  stationsWrapper: {
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    width: "100%",
    ["@media (max-width:1024px)"]: {
      padding: 0,
    },
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
    ["@media (max-width:1024px)"]: {
      height: "auto",
    },
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
    ["@media (max-width:1024px)"]: {
      flexDirection: "column",
    },
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

const initialStation = {
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
};

export { useStyles, initialStation };
