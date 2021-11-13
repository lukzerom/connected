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
import { initialStation, useStyles } from "./utils";

const EditStation: FunctionComponent = () => {
  const [state, setState] = useState<Station>(initialStation);
  const [mapDialogOpen, setMapDialogOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const classes = useStyles();

  const { width } = useWindowSize();

  const { setAlert } = useAlert();
  const {
    getUserStations,
    markerPosition,
    setMarkerPosition,
    editStation,
    updateStation,
    getLatLang,
  } = useStations();

  useEffectOnce(() => {
    getUserStations();
  });

  const history = useHistory();

  useEffectOnce(() => {
    if (editStation) {
      setState({
        id: editStation._id,
        name: editStation.name,
        country: editStation.country,
        city: editStation.city,
        street: editStation.street,
        streetNumber: editStation.streetNumber,
        pictureUrl: editStation.picture,
        longitude: editStation.longitude,
        latitude: editStation.latitude,
        price: editStation.price,
        plugin: editStation.plugin,
        extras: [],
        drive: editStation.extras?.includes("Drive"),
        bed: editStation.extras?.includes("Bed"),
        bike: editStation.extras?.includes("Bike"),
        coffee: editStation.extras?.includes("Coffee"),
        bus: editStation.extras?.includes("Bus"),
        errors: false,
      });
    }
  });

  useEffectOnce(() => {
    if (editStation?.latitude && editStation?.longitude) {
      setMarkerPosition([editStation?.latitude, editStation?.longitude]);
    }
  });

  const {
    id,
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

  const onExtrasChange = (e: ChangeEvent<any>) => {
    setState({
      ...state,
      [e.target.name]: e.target.checked,
    });
  };

  const getLatLangLocal = async () => {
    const adress = `${street}+${streetNumber}+${city}+${country}`;
    const cleanAdress = utf8.encode(adress.replace("/", "+"));

    getLatLang(cleanAdress);
  };

  const handleSubmit = () => {
    let extras = [];

    if (drive) extras.push("Drive");
    if (bed) extras.push("Bed");
    if (bike) extras.push("Bike");
    if (coffee) extras.push("Coffee");
    if (bus) extras.push("Bus");

    if (!name || !country || !city || !street || !streetNumber || !plugin) {
      setState({ ...state, errors: true });
      return setAlert("Please provide required informations", AlertType.ERROR);
    }

    const station = {
      id,
      name,
      country,
      city,
      street,
      streetNumber,
      picture: pictureUrl,
      price,
      plugin,
      latitude: markerPosition.lat,
      longitude: markerPosition.lng,
      additives: extras,
    };

    updateStation(station);

    history.push("/my-stations");

    setState({
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
    });
  };

  useEffect(() => {
    if (width <= 1025) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, [width]);

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
                  >
                    Save details
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

export default EditStation;
