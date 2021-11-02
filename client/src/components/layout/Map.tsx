import L from "leaflet";
import React, { FunctionComponent, useEffect } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import bolt from "../../assets/bolt.svg";
import { useStations } from "../../context/stations/StationContext";
import { Station } from "../../types/Station";

const myIcon = L.icon({
  iconUrl: bolt,
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [-3, -76],
});

const ChargerMap: FunctionComponent = () => {
  const { stations, getStations } = useStations();

  useEffect(() => {
    getStations();
  }, [getStations]);

  return (
    <div className="map-container">
      <Map center={[50.270873, 16.25341]} zoom={5} scrollWheelZoom={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {stations !== null
          ? stations.map((station: Station) => {
              return (
                <Marker
                  key={station._id}
                  position={[station.latitude, station.longitude]}
                  icon={myIcon}
                >
                  <Popup>
                    <h2>{station.name}</h2>
                  </Popup>
                </Marker>
              );
            })
          : null}
      </Map>
    </div>
  );
};

export default ChargerMap;
