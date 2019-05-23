import * as mongoose from 'mongoose';
import { ObjectID } from 'mongodb';
import {Document, Model, model, Schema} from 'mongoose';
import {FoodCalcService} from '../service/food-calc.service';

ObjectID.prototype.valueOf = function() {
  return this.toString();
};

export class IMeal {
  eatenBy: string;
  eatenDate: Date = new Date();
  food?: string;
  recipe?: string;
  eatenAmount: number;
  constructor(meal: {
    eatenBy: string,
    eatenDate: Date,
    food?: string,
    recipe?: string,
    eatenAmount: number
  }) {
    this.eatenBy = meal.eatenBy;
    this.eatenDate = meal.eatenDate;
    this.food = meal.food;
    this.recipe = meal.recipe;
    this.eatenAmount = meal.eatenAmount;
  }
}

const MealSchema = new Schema({
  eatenBy: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    required: true
  },
  eatenDate: {
    type: Date,
    required: true
  },
  food: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Food'
  },
  recipe: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Recipe'
  },
  eatenAmount: {
    type: Number
  }
});

export interface MealDocument extends IMeal, Document { }
export const Meal: Model<MealDocument> = model<MealDocument>("Meal", MealSchema);