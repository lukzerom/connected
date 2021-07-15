import { UserType } from "./User";

type CarType = {
  user: UserType;
  brand: string;
  registration: string;
  model: string;
  plugins: Array<string>;
  date: number;
};

export { CarType };
