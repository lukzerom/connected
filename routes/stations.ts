import axios from "axios";
import { Request, Response, Router } from "express";
import { check, validationResult } from "express-validator";
import Moment from "moment";
import { extendMoment } from "moment-range";
import { ReservationType } from "../contracts/Reservation";
import { StationType } from "../contracts/Station";
import { auth } from "../middleware/auth";
import { Reservation } from "../models/Reservation";
import { Station } from "../models/Station";

const router = Router();

const moment = extendMoment(Moment as any);

// @route PUT api/stations/:id
// @desc Edit station details
// @access Private

router.put("/:id", auth, async (req: Request, res: Response) => {
  const {
    name,
    country,
    city,
    street,
    streetNumber,
    longitude,
    latitude,
    plugin,
    price,
    additives,
    picture,
  } = req.body;

  const stationFields: Partial<StationType> = {};

  if (name) stationFields.name = name;
  if (country) stationFields.country = country;
  if (city) stationFields.city = city;
  if (street) stationFields.street = street;
  if (streetNumber) stationFields.streetNumber = streetNumber;
  if (longitude) stationFields.longitude = longitude;
  if (latitude) stationFields.latitude = latitude;
  if (plugin) stationFields.plugin = plugin;
  if (price) stationFields.price = price;
  if (additives) stationFields.additives = additives;
  if (picture) stationFields.picture = picture;

  try {
    let station = await Station.findById(req.params.id);

    if (!station) {
      return res.status(404).json({
        msg: "Station not found",
      });
    }

    //Make sure user owns station

    if (station.user.toString() !== req.body.user.id) {
      return res.status(401).json({
        msg: "Not authorized",
      });
    }

    station = await Station.findByIdAndUpdate(
      req.params.id,
      {
        $set: stationFields,
      },
      {
        new: true,
      }
    );
    res.json(station);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error ");
  }
});

// @route GET api/stations/userstations
// @desc Get all user statios
// @access Private

router.get("/userstations", auth, async (req: Request, res: Response) => {
  try {
    const userstations = await Station.find({
      user: req.body.user.id,
    }).sort({
      date: -1,
    });

    res.json(userstations);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// @route GET api/stations/getlatlang
// @desc Get all user statios
// @access Private

router.get("/getlatlang/:adress", auth, async (req: Request, res: Response) => {
  const { adress } = req.params;

  const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${adress}&key=${process.env.GOOGLE_API_KEY}`;

  axios
    .get(URL)
    .then((response) => {
      const geocode = response.data;
      const results = geocode.results[0];
      const latlang = results.geometry.location;

      res.json(latlang);
    })

    .catch((error) => {
      res.status(500).send(error);
    });
});

// @route GET api/stations/:id
// @desc Get choosen station
// @access Private

router.get("/:id", auth, async (req: Request, res: Response) => {
  try {
    const station = await Station.find({
      _id: req.params.id,
    });
    res.json(...station);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route GET api/stations
// @desc Get all statios
// @access Public

router.get("/", async (req: Request, res: Response) => {
  try {
    const stations = await Station.find({}).select("-user").sort({});
    res.json(stations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route GET api/stations/availablestations
// @desc Get available stations
// @access Pubilc

router.get(
  "/availablestations/:from/:to",
  async (req: Request, res: Response) => {
    const { from, to } = req.params;

    const fromDate = new Date(Number(from));
    const toDate = new Date(Number(to));

    const userRange = moment.range(moment(fromDate), moment(toDate));

    const stations = await Station.find({});
    let stationReservations = await Reservation.find({});

    //Getting all ID's of station reservations in this range of time
    let takenStationsAll = stationReservations.map(
      (reservation: ReservationType) => {
        let bookingTimeStampFrom = moment(new Date(reservation.timeStampFrom));
        let bookingTimeStampTo = moment(new Date(reservation.timeStampTo));
        let strangerRange = moment.range(
          bookingTimeStampFrom,
          bookingTimeStampTo
        );

        if (userRange.overlaps(strangerRange)) {
          return reservation.station.toString();
        } else {
          return null;
        }
      }
    );

    // Removing nulls
    takenStationsAll = takenStationsAll.filter(
      (station: StationType) => station !== null
    );

    //Removing duplicates
    let takenStations = [...new Set(takenStationsAll)];

    //Getting all stations ID
    let stationsIds = stations.map((station: StationType) => {
      return String(station._id);
    });

    //Return only available stations
    let availablestationsIds = stationsIds.map((stationId: string) => {
      if (!takenStations.includes(stationId)) {
        return stationId;
      }
    });

    //Removing undefineds
    availablestationsIds = availablestationsIds.filter((str: string) => str);

    //Finally return available stations by id
    let availablestations = availablestationsIds.map((stationId: string) => {
      return stations.find((station: StationType) => {
        if (station._id.toString() === stationId) return station;
      });
    });

    try {
      res.json(availablestations);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route POST api/stations
// @desc Add station
// @access Private

router.post(
  "/",

  auth,
  [
    check("country", "Please enter country of this station").not().isEmpty(),
    check("name", "Please enter unusual name of this station").not().isEmpty(),
    check("city", "Please enter city of this station").not().isEmpty(),
    check("longitude", "Please pick location on map with marker")
      .not()
      .isEmpty(),
    check("latitude", "Please pick location on map with marker")
      .not()
      .isEmpty(),
    check("street", "Please enter street of this station").not().isEmpty(),
    check("streetNumber", "Please add street number of this station")
      .not()
      .isEmpty(),
    check("plugin", "Please enter plugin type of this station").not().isEmpty(),
    check("price", "Please add price per full charge of car").not().isEmpty(),
  ],

  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const {
      name,
      country,
      city,
      street,
      streetNumber,
      longitude,
      latitude,
      plugin,
      price,
      additives,
      picture,
    } = req.body;

    try {
      const newStation = new Station({
        name,
        country,
        city,
        street,
        streetNumber,
        longitude,
        latitude,
        plugin,
        price,
        additives,
        picture,
        user: req.body.user.id,
      });

      const station = await newStation.save();

      res.json(station);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error ");
    }
  }
);

// @route DELETE api/stations/:id
// @desc Delete station
// @access Private

router.delete("/:id", auth, async (req, res) => {
  try {
    let station = await Station.findById(req.params.id);

    if (!station) {
      return res.status(404).json({
        msg: "Station not found",
      });
    }

    //Make sure user owns contacts

    if (station.user.toString() !== req.body.user.id) {
      return res.status(401).json({
        msg: "Not authorized",
      });
    }
    await Station.findByIdAndRemove(req.params.id);

    res.json({
      msg: "Station removed",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error ");
  }
});

export default router;
