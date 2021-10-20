export type UserType = {
  name: string;
  surname: {
    type: String;
    required: true;
  };
  email: string;
  password: string;
  ratingAsDriver: Array<string>;
  ratingAsStation: Array<string>;
  electrons: number;
  phone: string;
  date: number;
};
