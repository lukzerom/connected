import React, { FunctionComponent, useEffect } from "react";
import { useAuth } from "../../context/auth/AuthContext";
import { useStations } from "../../context/stations/StationContext";

const Dashboard: FunctionComponent = () => {
  const { getUserStations } = useStations();

  const { user } = useAuth();

  useEffect(() => {
    getUserStations();
  }, [getUserStations]);

  return (
    <div>
      <h1>Witaj przybyszu {user && user.name}</h1>
    </div>
  );
};

export default Dashboard;
