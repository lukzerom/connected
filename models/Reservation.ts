import mongoose, { Schema } from "mongoose";

const ReservationShema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },

  station: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "stations",
  },

  carName: {
    type: String,
  },

  carRegistration: {
    type: String,
  },
  stationName: {
    type: String,
  },

  stationCountry: {
    type: String,
  },

  stationCity: {
    type: String,
  },

  stationStreet: {
    type: String,
  },

  ownerPhone: {
    type: String,
  },

  ownerName: {
    type: String,
  },

  userPhone: {
    type: String,
  },
  userName: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now,
  },

  timeStampFrom: {
    type: Number,
  },
  timeStampTo: {
    type: Number,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  fullPrice: {
    type: Number,
  },
  isOwnerAccepted: {
    type: Boolean,
    default: false,
  },
  isOwnerRejected: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("reservation", ReservationShema);
