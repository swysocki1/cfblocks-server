import * as mongoose from 'mongoose';
import { ObjectID } from 'mongodb';
import {Document, Model, model, Schema} from 'mongoose';
import {UtilsService} from '../service/utils.service';
import {FoodCalcService} from '../service/food-calc.service';

ObjectID.prototype.valueOf = function() {
  return this.toString();
};
export class IFood {
  name: string;
  description?: string;
  img?: string;
  carbs: number;
  fats: number;
  protein: number;
  amount: number;
  measurement: string;
  creator: string;
  owners: string[] = [] as string[];
  constructor(data: {
    name: string,
    description?: string,
    img?: string,
    carbs: number,
    fats: number,
    protein: number,
    amount: number,
    measurement: string,
    creator: string,
    owners: string[]
  }) {
    this.name = data.name;
    this.description = data.description;
    this.img = data.img;
    this.carbs = data.carbs;
    this.fats = data.fats;
    this.protein = data.protein;
    this.amount = data.amount;
    this.measurement = data.measurement;
    this.creator = data.measurement;
    this.owners = data.owners;
  }
  
  /* any method would be defined here*/
  // foo(): string {
  //   return this.name.uppercase() // whatever
  // }
}

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  img: {
    type: String
  },
  carbs: {
    type: Number,
    required: true
  },
  fats: {
    type: Number,
    required: true
  },
  protein: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  measurement: {
    type: String,
    enum: process.env.MEASUREMENTS
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  owners: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    required: true
  }
}, {
  toObject: {virtuals: true},
  toJSON: {virtuals: true}
});
schema.virtual('calories').get(function() {
  return FoodCalcService.calcCalories(this.carbs, this.fats, this.protein);
});

export interface FoodDocument extends IFood, Document { }
export const Food: Model<FoodDocument> = model<FoodDocument>("Food", schema, "Food");