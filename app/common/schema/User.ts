// import * as mongoose from 'mongoose';
import { ObjectID } from 'mongodb';
import {Document, Model, model, Schema} from 'mongoose';

ObjectID.prototype.valueOf = function() {
  return this.toString();
};

export class IUser {
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  age?: number;
  constructor(data: {
    username: string,
    password: string,
    firstName?: string,
    lastName?: string,
    email: string,
    age?: number
  }) {
    this.username = data.username;
    this.password = data.password;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.age = data.age;
  }
  
  /* any method would be defined here*/
  // foo(): string {
  //   return this.name.uppercase() // whatever
  // }
}

const schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  age: {
    type: Number
  }
});

// register each method at schema
// UserSchema.method('foo', User.prototype.foo)

export interface UserDocument extends IUser, Document { }
export const User: Model<UserDocument> = model<UserDocument>("User", schema, "User");