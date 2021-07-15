import { Request, Response, Router } from "express";
import { validationResult } from "express-validator";
import Moment from "moment";
import { extendMoment } from "moment-range";
import { ReservationType } from "../contracts/Reservation";
import { auth } from "../middleware/auth";
import { Car } from "../models/Car";
import { Reservation } from "../models/Reservation";
import { Station } from "../models/Station";
import { User } from "../models/User";

const moment = extendMoment(Moment as any);
const router = Router();

// @route GET api/reservations/asdriver
// @desc Get all user reservations as driver
// @access Private

router.get("/asdriver", auth, async (req: Request, res: Response) => {
  try {
    const reservations = await Reservation.find({
      user: req.body.user.id,
    }).sort({
      date: -1,
    });
    res.json(reservations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route GET api/reservations/ascharger
// @desc Get all user reservations as charger owner
// @access Private

router.get("/ascharger", auth, async (req: Request, res: Response) => {
  try {
    const reservations = await Reservation.find({
      owner: req.body.user.id,
    }).sort({
      date: -1,
    });
    res.json(reservations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route POST api/reservations/:id
// @desc Book a station
// @access Private

router.post("/:id", [auth], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { timeStampFrom, timeStampTo, carId } = req.body;

  let station = await Station.findById(req.params.id);
  let car = await Car.findById(carId);

  let stationReservations = await Station.find({
    station: station._id,
  });

  //Calculate user range

  const userRange = moment.range(moment(timeStampFrom), moment(timeStampTo));

  //Get user

  const user = await User.findById(req.body.user.id).select("-password");

  //Make sure that dates are not overlapping

  stationReservations.forEach((reservation: ReservationType) => {
    let bookingTimeStampFrom = moment(new Date(reservation.timeStampFrom));
    let bookingTimeStampTo = moment(new Date(reservation.timeStampTo));
    const strangerRange = moment.range(
      bookingTimeStampFrom,
      bookingTimeStampTo
    );

    if (userRange.overlaps(strangerRange)) {
      return res.status(400).json({
        msg: "This time is already reserved",
      });
    }
  });

  //Make sure user does not book his own station
  if (station.user.toString() === req.body.user.id) {
    return res.status(400).json({
      msg: "Can't book your station",
    });
  }

  //Calculate how many euros will be needed to transaction

  let fullPrice = userRange.diff("hours") * station.price;

  //Get owner of station
  const owner = await User.findById(station.user).select("-password");

  try {
    const newReservation = new Reservation({
      timeStampFrom,
      timeStampTo,
      owner,
      carName: `${car.brand} ${car.model}`,
      carRegistration: car.registration,
      fullPrice,
      user: req.body.user.id,
      station: station._id,
      stationName: station.name,
      stationCountry: station.country,
      stationCity: station.city,
      stationStreet: `${station.street} ${station.streetNumber}`,
      ownerPhone: owner.phone,
      ownerName: owner.name,
      userPhone: user.phone,
      userName: user.name,
    });

    const reservation = await newReservation.save();

    res.json(reservation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error ");
  }
});

// @route DELETE api/reservations/:id
// @desc Delete reservation
// @access Private

router.delete("/:id", auth, async (req: Request, res: Response) => {
  try {
    let reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        msg: "Reservation not found",
      });
    }

    //Make sure user booked reservation

    if (reservation.user.toString() !== req.body.user.id) {
      return res.status(401).json({
        msg: "Not authorized",
      });
    }
    await Reservation.findByIdAndRemove(req.params.id);

    res.json({
      msg: "Station removed",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error ");
  }
});

router.put("/:id", auth, async (req, res) => {
  const { isOwnerAccepted, isOwnerRejected } = req.body;

  const reservationFields: Partial<ReservationType> = {};

  if (isOwnerAccepted) reservationFields.isOwnerAccepted = true;
  if (isOwnerRejected) reservationFields.isOwnerRejected = true;

  try {
    let reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        msg: "Reservation not found",
      });
    }

    //Make sure this reservation is edited by owner of station

    if (reservation.owner.toString() !== req.body.user.id) {
      return res.status(401).json({
        msg: "Not authorized",
      });
    }

    reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      {
        $set: reservationFields,
      },
      {
        new: true,
      }
    );
    res.json(reservation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error ");
  }
});

export default router;
