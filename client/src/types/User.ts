export type UserType = {
  name: string;
  surname: string;
  email: string;
  password: string;
  ratingAsDriver?: Array<string>;
  ratingAsStation?: Array<string>;
  electrons?: number;
  phone: string;
};
