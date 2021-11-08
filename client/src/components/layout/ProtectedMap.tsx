import L, { LatLngTuple, LeafletMouseEvent } from "leaflet";
import React, { useState } from "react";
import { Map, Marker, TileLayer, Viewport } from "react-leaflet";
import bolt from "../../assets/bolt.svg";
import { useStations } from "../../context/stations/StationContext";
import { Station } from "../../types/Station";

const myIcon = L.icon({
  iconUrl: bolt,
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [-3, -76],
});

let animateflag = false;

const ChargerMap = () => {
  const [zoom, setZoom] = useState<number>(5);
  const [position, setPosition] = useState<LatLngTuple>([50.711, 13.629]);

  const { setStation, avaiableStations } = useStations();

  const changePosition = (e: LeafletMouseEvent) => {
    animateflag = true;
    let pickedStation = avaiableStations.filter(
      (station: Station) => station._id === e.target.options.id
    );

    let lat = Number(pickedStation[0].latitude);
    let lng = Number(pickedStation[0].longitude);

    setPosition([lat, lng]);
    setStation(pickedStation[0]);
  };

  const viewport = {
    center: position,
    zoom: zoom,
  };

  const onViewportChanged = (viewport: Viewport): void => {
    if (viewport.zoom) setZoom(viewport.zoom);
    if (viewport.center) setPosition(viewport.center);
    animateflag = false;
  };

  return (
    <div className="map-container xs=6">
      <Map
        center={position}
        viewport={viewport}
        onViewportChanged={onViewportChanged}
        animate={animateflag}
        easeLinearity={0.35}
        attributionControl={true}
        useFlyTo={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {avaiableStations !== null
          ? avaiableStations.map((station: Station) => {
              return (
                <Marker
                  key={station._id}
                  id={station._id}
                  onClick={changePosition}
                  position={[station.latitude, station.longitude]}
                  icon={myIcon}
                ></Marker>
              );
            })
          : null}
      </Map>
    </div>
  );
};

export default ChargerMap;
