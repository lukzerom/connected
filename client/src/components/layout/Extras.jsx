import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import StarsIcon from "@material-ui/icons/Stars";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  extra: {
    padding: "2px 8px",
    margin: "2px",
    borderRadius: "1rem",
    fontSize: "1rem",
    verticalAlign: "middle",
    backgroundColor: "#d1eaa3",
  },
  extraicon: {
    height: "0.8rem",
    verticalAlign: "middle",
  },
  extracaption: {
    fontSize: "0.7rem",
    verticalAlign: "middle",
  },
}));

const Extras = ({ extra }) => {
  const classes = useStyles();
  return (
    <Box className={classes.extra} justifyItems="center">
      <StarsIcon className={classes.extraicon} />
      <Typography variant="caption" className={classes.extracaption}>
        {extra}
      </Typography>
    </Box>
  );
};

export default Extras;
