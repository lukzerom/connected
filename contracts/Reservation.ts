import { UserType } from "./User";

type ReservationType = {
  user: UserType;
  station: string;
  carName: string;
  carRegistration: string;
  stationName: string;
  stationCountry: string;
  stationCity: string;
  stationStreet: string;
  ownerPhone: string;
  ownerName: string;
  userPhone: string;
  userName: string;
  date: number;
  timeStampFrom: number;
  timeStampTo: number;
  owner: UserType;
  fullPrice: number;
  isOwnerAccepted: boolean;
  isOwnerRejected: boolean;
};

export { ReservationType };
