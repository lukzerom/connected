import React, { useContext } from "react";
import { Map, TileLayer, Marker } from "react-leaflet";
import StationContext from "../../context/stations/stationContext";
import bolt from "../../assets/bolt.svg";
import L from "leaflet";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  map: { width: "100%", height: "100%" },
}));

const myIcon = L.icon({
  iconUrl: bolt,
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [-3, -76],
});

const ShowStationMap = () => {
  const stationContext = useContext(StationContext);
  const classes = useStyles();

  const { stationMapModal } = stationContext;

  return (
    <Grid item xs={12} className={classes.map}>
      <Map
        center={[stationMapModal.latitude, stationMapModal.longitude]}
        zoom={18}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        <Marker
          draggable={false}
          position={[stationMapModal.latitude, stationMapModal.longitude]}
          icon={myIcon}
        ></Marker>
      </Map>
    </Grid>
  );
};

export default ShowStationMap;
