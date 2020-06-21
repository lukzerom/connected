import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  footer: {
    lineHeight: "3rem",
    width: "100%",
    backgroundColor: "#f4f6ff",
    color: "#10375c",
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
      className={classes.footer}
    >
      Created with <span style={{ textDecoration: "line-through" }}>love</span>{" "}
      electricity by Łukasz Żeromski {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Footer;
