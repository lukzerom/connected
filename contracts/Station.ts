import { UserType } from "./User";

type StationType = {
  _id: string;
  user: UserType;
  name: string;
  country: string;
  city: string;
  street: string;
  streetNumber: string;
  longitude: string;
  latitude: string;
  ratings: Array<string>;
  plugin: string;
  price: number;
  picture: string;
  additives: Array<string>;
  isReserved: boolean;
  isOccupied: boolean;
  date: number;
};

export { StationType };
