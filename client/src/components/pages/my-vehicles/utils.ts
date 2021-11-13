import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  vehiclesWrapper: {
    backgroundColor: "#f4f6ff",
    minHeight: "100vh",
    padding: "0 10vw",
    ["@media (max-width:1024px)"]: {
      padding: 0,
    },
  },
  topPanel: {
    display: "flex",
    justifyContent: "space-between",
    margin: "1rem",
  },
  carContainer: {
    display: "flex",
  },
  title: {
    color: "#127681",
  },
  noVehicles: {
    color: "#127681",
    width: "100%",
  },
  loading: {
    margin: "10rem auto",
  },
}));

export { useStyles };
