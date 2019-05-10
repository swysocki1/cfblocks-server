import * as mongoose from 'mongoose';
import { ObjectID } from 'mongodb';
import {Document} from 'mongoose';
import {UtilsService} from '../service/utils.service';

const Schema = mongoose.Schema;

ObjectID.prototype.valueOf = function() {
  return this.toString();
};

const ServingSchema = new Schema({
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
    enum: UtilsService.MEASUREMENTS,
    required: true
  }
});

const FoodSchema = new Schema({
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
  servings: [ServingSchema]
});

export default mongoose.model("Food", FoodSchema);