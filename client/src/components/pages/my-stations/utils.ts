import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  stationsWrapper: {
    backgroundColor: "#f4f6ff",
    minHeight: "100vh",
    padding: "0 10vw",
  },
  topPanel: {
    display: "flex",
    justifyContent: "space-between",
    margin: "1rem",
  },
  title: {
    color: "#127681",
  },
  loading: {
    margin: "10rem auto",
  },
}));

export { useStyles };
