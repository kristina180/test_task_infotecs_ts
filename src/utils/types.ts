// for FilterUser

type TGender = "male" | "female" | "not_selected";
type TAge = "not_selected" | "0_19" | "20_29" | "30_39" | "40+";
type TPhoneCode = `+${number}` | "not_selected";

export interface IFilters {
  name: string;
  age: TAge;
  gender: TGender;
  city: string;
  phone_code: TPhoneCode;
}

// for TableContent

export type TSortWay = "without" | "up" | "down";
export type TOption = "without" | keyof IUser;

export interface ISort {
  sortWay: TSortWay;
  option: TOption;
}

// for store

type TCoord = {
  lat: number;
  lng: number;
};

type TAddress = {
  country: string;
  city: string;
  state: string;
  address: string;
  coordinates?: TCoord;
  postalCode?: string;
  stateCode?: string;
};

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: "male" | "female";
  email: string;
  phone: string;
  address: TAddress;
  weight: number;
  height: number;
  image: string;
}
