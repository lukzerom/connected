import React, { FunctionComponent, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import StationContext from "../../context/stations/stationContext";

const Dashboard: FunctionComponent = () => {
  const authContext = useContext(AuthContext);
  const stationContext = useContext(StationContext);
  const { getUserStations } = stationContext;
  useEffect(() => {
    authContext.loadUser();
    getUserStations();
  }, []);

  const { user } = authContext;
  return (
    <div>
      <h1>Witaj przybyszu {user && user.name}</h1>
    </div>
  );
};

export default Dashboard;
