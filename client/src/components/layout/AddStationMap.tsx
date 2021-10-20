import { makeStyles } from "@material-ui/core/styles";
import L from "leaflet";
import React, { useContext, useEffect } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import bolt from "../../assets/bolt.svg";
import StationContext from "../../context/stations/stationContext";

const useStyles = makeStyles((theme) => ({
  map: { width: "100%", height: "100%" },
}));

const myIcon = L.icon({
  iconUrl: bolt,
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [-3, -76],
});

const AddStationMap = () => {
  const stationContext = useContext(StationContext);
  const classes = useStyles();

  useEffect(() => {
    //eslint-disable-next-line
  }, []);

  const { markerPosition, setMarkerPosition } = stationContext;

  const onDragend = (e: L.DragEndEvent) => {
    setMarkerPosition([e.target.getLatLng().lat, e.target.getLatLng().lng]);
  };

  return (
    <Map center={markerPosition} zoom={18} className={classes.map}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      <Marker
        draggable={true}
        onDragend={onDragend}
        position={markerPosition}
        icon={myIcon}
      ></Marker>
    </Map>
  );
};

export default AddStationMap;
