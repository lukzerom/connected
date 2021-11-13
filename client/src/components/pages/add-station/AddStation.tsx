import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import MapIcon from "@material-ui/icons/Map";
import React, {
  ChangeEvent,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useHistory } from "react-router-dom";
import { useEffectOnce, useWindowSize } from "react-use";
import utf8 from "utf8";
import { AlertType, useAlert } from "../../../context/alert/AlertContext";
import { useStations } from "../../../context/stations/StationContext";
import { Station } from "../../../types/Station";
import AddStationMap from "../../layout/AddStationMap";
import { defaultStation, useStyles } from "./utils";

const AddStation: FunctionComponent = () => {
  const {
    getUserStations,
    markerPosition,
    addStation,
    setMarkerPosition,
    editStation,
    updateStation,
    getLatLang,
  } = useStations();

  const [state, setState] = useState<Station>(defaultStation);
  const [mobile, setMobile] = useState(false);
  const [mapDialogOpen, setMapDialogOpen] = useState(false);

  const classes = useStyles();

  const { setAlert } = useAlert();

  const { width } = useWindowSize();

  const history = useHistory();

  useEffect(() => {
    if (width <= 1025) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, [width]);

  useEffectOnce(() => {
    getUserStations();
  });

  const {
    name,
    country,
    city,
    street,
    streetNumber,
    pictureUrl,
    price,
    plugin,
    drive,
    bed,
    bike,
    coffee,
    bus,
    errors,
  } = state;

  const onChange = (e: ChangeEvent<any>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onExtrasChange = (event: ChangeEvent<any>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const getLatLangLocal = async () => {
    const adress = `${street}+${streetNumber}+${city}+${country}`;
    const cleanAdress = utf8.encode(adress.replace("/", "+"));

    getLatLang(cleanAdress);
    if (mobile) {
      setMapDialogOpen(true);
    }
  };

  const handleSubmit = () => {
    let extras = [];

    if (drive) extras.push("Drive");
    if (bed) extras.push("Bed");
    if (bike) extras.push("Bike");
    if (coffee) extras.push("Coffee");
    if (bus) extras.push("Bus");

    if (
      !name ||
      !country ||
      !city ||
      !street ||
      !streetNumber ||
      !price ||
      !plugin
    ) {
      setState({ ...state, errors: true });
      return setAlert("Please provide required informations", AlertType.ERROR);
    }

    const station = {
      name,
      country,
      city,
      street: street,
      streetNumber,
      picture: pictureUrl,
      price,
      plugin,
      latitude: markerPosition.lat,
      longitude: markerPosition.lng,
      additives: extras,
    };

    addStation(station);

    history.push("/my-stations");
    setState(defaultStation);
  };

  const handleMapDialogClose = useCallback(() => {
    setMapDialogOpen(false);
  }, []);

  return (
    <Box className={classes.stationsWrapper}>
      <Grid container justify="center">
        <Grid item xs={12} md={12}>
          <Grid container justify="center">
            <Paper className={classes.paper}>
              <Grid item xs={12} md={5} className={classes.inner}>
                <Box className={classes.inputs}>
                  <Typography variant="h6">
                    Provide your station details
                  </Typography>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    startIcon={<AddCircleIcon />}
                  >
                    Add station
                  </Button>
                </Box>
                <Divider className={classes.divider} />
                <TextField
                  required
                  id="outlined-required"
                  label="Station name"
                  name="name"
                  value={name}
                  onChange={onChange}
                  variant="outlined"
                  fullWidth
                  error={errors && !name}
                />
                <Box className={classes.inputs}>
                  <TextField
                    required
                    error={errors && !country}
                    id="outlined-required"
                    label="Country"
                    name="country"
                    value={country}
                    onChange={onChange}
                    variant="outlined"
                    style={{
                      marginTop: "12px",
                    }}
                  />
                  <TextField
                    required
                    error={errors && !city}
                    id="outlined-required"
                    label="City"
                    name="city"
                    value={city}
                    onChange={onChange}
                    variant="outlined"
                    style={{
                      marginTop: "12px",
                    }}
                  />
                </Box>
                <Box className={classes.inputs}>
                  <TextField
                    required
                    error={errors && !street}
                    id="outlined-required"
                    label="Street Name"
                    name="street"
                    value={street}
                    onChange={onChange}
                    variant="outlined"
                    style={{
                      marginTop: "12px",
                    }}
                  />
                  <TextField
                    required
                    error={errors && !streetNumber}
                    id="outlined-required"
                    label="Street Number"
                    name="streetNumber"
                    value={streetNumber}
                    onChange={onChange}
                    variant="outlined"
                    style={{
                      marginTop: "12px",
                    }}
                  />
                </Box>
                <Box className={classes.inputs}>
                  <TextField
                    id="outlined-required"
                    label="Picture URL"
                    name="pictureUrl"
                    value={pictureUrl}
                    onChange={onChange}
                    variant="outlined"
                    style={{
                      marginTop: "12px",
                    }}
                  />
                  <TextField
                    required
                    id="outlined-required"
                    label="Price EUR / h"
                    value={price}
                    name="price"
                    onChange={onChange}
                    variant="outlined"
                    type="number"
                    style={{
                      marginTop: "12px",
                    }}
                  />
                </Box>

                <Box className={classes.inputs}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel required id="charger-type">
                      Charger
                    </InputLabel>
                    <Select
                      error={errors && !plugin}
                      labelId="charger-type"
                      id="charger-type"
                      label="Charger"
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
                  <Button
                    variant="contained"
                    onClick={getLatLangLocal}
                    startIcon={<MapIcon />}
                  >
                    Find on map
                  </Button>
                </Box>
                <Divider className={classes.divider} />
                <Typography variant="h6">Extras</Typography>
                <FormControlLabel
                  control={<Checkbox name="bike" color="primary" />}
                  label="Bike rent"
                  onChange={onExtrasChange}
                />
                <FormControlLabel
                  control={<Checkbox name="coffee" color="primary" />}
                  label="Coffee"
                  onChange={onExtrasChange}
                />
                <FormControlLabel
                  control={<Checkbox name="bed" color="primary" />}
                  label="Bed"
                  onChange={onExtrasChange}
                />
                <FormControlLabel
                  control={<Checkbox name="drive" color="primary" />}
                  label="Drive"
                  onChange={onExtrasChange}
                />
                <FormControlLabel
                  control={<Checkbox name="bus" color="primary" />}
                  label="Bus station"
                  onChange={onExtrasChange}
                />
                <Divider className={classes.divider} />
              </Grid>
              {!mobile && (
                <Grid item xs={12} md={5}>
                  <AddStationMap />
                </Grid>
              )}
              {}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      {mapDialogOpen && (
        <Dialog open={mapDialogOpen} onClose={handleMapDialogClose}>
          <DialogContent style={{ padding: 0 }}>
            <div
              style={{ width: "100vw", height: "100vh", textAlign: "center" }}
            >
              <AddStationMap />
              <Button
                variant="contained"
                color="primary"
                style={{ position: "fixed", bottom: "64px", zIndex: 10000 }}
                onClick={handleMapDialogClose}
              >
                Set A Pin
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
};

export default AddStation;
