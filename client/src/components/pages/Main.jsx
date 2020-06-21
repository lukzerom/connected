import React from "react";
import ChargerMap from "../layout/Map";
import car from "../../assets/car.svg";
import Typography from "@material-ui/core/Typography";

const Main = () => {
  return (
    <div>
      <section className="main">
        <div className="half">
          <img src={car} alt="" className="car" />
        </div>
        <div className="half">
          <Typography variant="h3" gutterBottom color="primary">
            Connected...
          </Typography>
          <Typography variant="h4" gutterBottom className="yellow">
            Better way of charging{" "}
            <span role="img" aria-label="Thunder Emoi">
              ⚡
            </span>
          </Typography>
          <Typography variant="body1" gutterBottom className="blue">
            Connected is a web platform for electric car users and private
            chargers owners.
          </Typography>
          <br />
          <Typography variant="body1" className="blue">
            if you own an electric car and plan a route to places where there
            are no public charging stations? Or are you tired of looking for a
            available station? Register, add a car and find stations for your
            journey!.
          </Typography>
          <br />
          <Typography variant="body1" className="blue">
            If you do not have an electric car but would like join the community
            and earn some extra money, register and add a station (by the way,
            the neighbors will think you are driving a tesla).
          </Typography>
          <br />
          <Typography variant="body1" className="blue">
            Meet the drivers, EV fans and build better charging community
            together with us!.
          </Typography>
        </div>
      </section>
      <ChargerMap />
    </div>
  );
};

export default Main;
