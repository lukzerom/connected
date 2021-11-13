import { makeStyles } from "@material-ui/core/styles";
import L from "leaflet";
import React, { FunctionComponent } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import bolt from "../../assets/bolt.svg";
import { useStations } from "../../context/stations/StationContext";

const useStyles = makeStyles((theme) => ({
  map: { width: "100%", height: "100%" },
}));

const myIcon = L.icon({
  iconUrl: bolt,
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [-3, -76],
});

type AddStationMapProps = {
  mobile?: boolean;
};

const AddStationMap: FunctionComponent<AddStationMapProps> = ({
  mobile = false,
}) => {
  const classes = useStyles();

  const { markerPosition, setMarkerPosition } = useStations();

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
