import * as mongoose from 'mongoose';
import { ObjectID } from 'mongodb';
import {Document} from 'mongoose';
import {UtilsService} from '../service/utils.service';

const Schema = mongoose.Schema;

ObjectID.prototype.valueOf = function() {
  return this.toString();
};

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
});

export default mongoose.model("Food", FoodSchema);