export type Station = {
  name: string;
  country: string;
  city: string;
  streetName: string;
  streetNumber: string;
  pictureUrl: string;
  longitude: number;
  latitude: number;
  price: number;
  plugin: string;
  extras: Array<string>;
  drive: boolean;
  bed: boolean;
  bike: boolean;
  coffee: boolean;
  bus: boolean;
  errors?: boolean;
};
