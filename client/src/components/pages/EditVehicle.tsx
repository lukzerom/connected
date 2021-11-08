import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import EditIcon from "@material-ui/icons/Edit";
import React, { ChangeEvent, FunctionComponent, useState } from "react";
import { useHistory } from "react-router-dom";
import { useEffectOnce } from "react-use";
import { AlertType, useAlert } from "../../context/alert/AlertContext";
import { useAuth } from "../../context/auth/AuthContext";
import { useCars } from "../../context/cars/CarContext";
import { chargerIcon } from "../layout/utils";

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

const AddVehicle: FunctionComponent = () => {
  const classes = useStyles();

  const { setAlert } = useAlert();

  const { updateCar, editedCar } = useCars();

  const history = useHistory();

  const { loadUser } = useAuth();

  useEffectOnce(() => {
    loadUser();
  });

  const [state, setState] = useState({
    brand: editedCar?.brand || "",
    model: editedCar?.model || "",
    registration: editedCar?.registration || "",
    plugin: "",
    plugins: editedCar?.plugins || [],
    errors: false,
  });

  const { brand, model, registration, plugins, errors, plugin } = state;

  const onChange = (e: ChangeEvent<any>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!brand || !model || !registration || plugins?.length <= 0) {
      setState({ ...state, errors: true });
      return setAlert("Please provide required informations", AlertType.ERROR);
    }

    const car = {
      id: editedCar?._id,
      brand,
      model,
      registration,
      plugins,
      errors,
    };

    updateCar(car);

    history.push("/my-vehicles");
    setState({
      brand: "",
      model: "",
      registration: "",
      plugins: [],
      plugin: "",
      errors: false,
    });
  };

  const handlePushPlugin = () => {
    if (!plugin) {
      return;
    }
    if (plugins.length >= 2) {
      return setAlert(
        "Your vehicle can have maximum 2 plugins",
        AlertType.ERROR
      );
    }

    let pluginsPush = plugins;
    pluginsPush.push(plugin);
    setState({ ...state, plugins: pluginsPush, plugin: "" });
  };

  const handleClearPlugins = () => {
    setState({ ...state, plugins: [] });
  };

  return (
    <Box className={classes.stationsWrapper}>
      <Grid container justify="center">
        <Grid item xs={6}>
          <Grid container justify="center">
            <Paper className={classes.paper}>
              <Grid item xs={10} className={classes.inner}>
                <Box className={classes.inputs}>
                  <Typography variant="h6">
                    Provide your vehicle details
                  </Typography>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    startIcon={<EditIcon />}
                  >
                    Save changes
                  </Button>
                </Box>
                <Divider className={classes.divider} />
                <Box className={classes.inputs}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Brand"
                    name="brand"
                    value={brand}
                    onChange={onChange}
                    variant="outlined"
                    error={errors && !brand}
                  />
                  <TextField
                    required
                    error={errors && !model}
                    id="outlined-required"
                    label="Model"
                    name="model"
                    value={model}
                    onChange={onChange}
                    variant="outlined"
                  />
                </Box>
                <Box className={classes.inputs}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel required id="plugin-type">
                      Plugin
                    </InputLabel>
                    <Select
                      error={errors && plugins.length <= 0}
                      labelId="plugin-type"
                      id="plugin-type"
                      label="Plugin"
                      name="plugin"
                      value={plugin}
                      onChange={onChange}
                      className={classes.select}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="American_Standard">
                        American Standard
                      </MenuItem>
                      <MenuItem value="Euro_Standard">Euro Standard</MenuItem>
                      <MenuItem value="CHAdeMO">CHAdeMO</MenuItem>
                      <MenuItem value="DB_T">DB T</MenuItem>
                      <MenuItem value="GB_T_DC">GB T DC</MenuItem>
                      <MenuItem value="Tesla_Supercharger">
                        Tesla Supercharger
                      </MenuItem>
                      <MenuItem value="Type1_CSS_Combo1">
                        Type1 CSS Combo1
                      </MenuItem>
                      <MenuItem value="Type1_J1772">Type1 J1772</MenuItem>
                      <MenuItem value="Type2_css_combo2">
                        Type2 css combo2
                      </MenuItem>
                      <MenuItem value="Type2_Mennekes">Type2 Mennekes</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    required
                    error={errors && !registration}
                    id="outlined-required"
                    label="Registration number"
                    name="registration"
                    value={registration}
                    onChange={onChange}
                    variant="outlined"
                  />
                </Box>
                <Box className={classes.buttons}>
                  <Button
                    color="primary"
                    component="span"
                    variant="contained"
                    startIcon={<AddToPhotosIcon />}
                    onClick={handlePushPlugin}
                  >
                    Add plugin
                  </Button>
                  <Button
                    color="secondary"
                    component="span"
                    variant="contained"
                    onClick={handleClearPlugins}
                  >
                    Clear plugins
                  </Button>
                </Box>
                <Divider className={classes.divider} />
                <Box
                  className={classes.miniPluginWrapper}
                  justifyContent="center"
                >
                  {plugins.map((plugin: string, i: number) => {
                    return (
                      <Box
                        className={classes.miniPlugin}
                        key={`${editedCar?._id}_${i}`}
                      >
                        {chargerIcon(plugin)}
                      </Box>
                    );
                  })}
                </Box>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddVehicle;
