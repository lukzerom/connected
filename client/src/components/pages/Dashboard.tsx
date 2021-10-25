import React, { FunctionComponent, useContext, useEffect } from "react";
import { useAuth } from "../../context/auth/AuthContext";
import StationContext from "../../context/stations/stationContext";

const Dashboard: FunctionComponent = () => {
  const stationContext = useContext(StationContext);
  const { getUserStations } = stationContext;

  const { loadUser, user } = useAuth();

  useEffect(() => {
    loadUser();
    getUserStations();
  }, [loadUser, getUserStations]);

  return (
    <div>
      <h1>Witaj przybyszu {user && user.name}</h1>
    </div>
  );
};

export default Dashboard;
