import * as mongoose from 'mongoose';
import { ObjectID } from 'mongodb';
import {Document, Schema} from 'mongoose';
import {UtilsService} from '../service/utils.service';

ObjectID.prototype.valueOf = function() {
  return this.toString();
};


const RecipeItemSchema = new Schema({
  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food',
    required: true
  },
  amount: {
    type: Number,
    min: 0,
    required: true
  }
});

const RecipeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  img: {
    type: String
  },
  instructions: {
    type: String
  },
  ingredients: {
    type: [RecipeItemSchema]
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

export default mongoose.model("Recipe", RecipeSchema);