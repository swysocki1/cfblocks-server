export interface IUser {
  id: string;
  createdDate: Date;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  // address: Address;
  dob: Date;
}
export class Address {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
} 