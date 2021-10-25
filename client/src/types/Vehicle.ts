export type VehicleType = {
  _id?: string;
  id?: string;
  model: string;
  registration: string;
  plugin?: string;
  plugins: Array<string>;
  errors: boolean;
  brand: string;
};
