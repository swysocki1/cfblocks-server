import * as mongoose from 'mongoose';
import { ObjectID } from 'mongodb';
import {Document, Model, model, Schema} from 'mongoose';
import {FoodCalcService} from '../service/food-calc.service';
import {Food} from './Food';

ObjectID.prototype.valueOf = function() {
  return this.toString();
};

export class IRecipeItem {
  food: string;
  amount: number;
  constructor(item :{
    food: string,
    amount: number
  }) {
    this.food = item.food;
    this.amount = item.amount;
  }
}

export class IRecipe {
  name: string;
  description: string;
  img: string;
  instructions: string;
  ingredients: IRecipeItem[];
  amount: number;
  measurement: string;
  creator: string;
  owners: string[];
  constructor(data: {
    name: string,
    description: string,
    img: string,
    instructions: string,
    ingredients: IRecipeItem[],
    amount: number,
    measurement: string,
    creator: string,
    owners: string[]
  }) {
    this.name = data.name;
    this.description = data.description;
    this.img = data.img;
    this.instructions = data.instructions;
    this.ingredients = [];
    if (data.ingredients) {
      data.ingredients.forEach(ingrediant => {
        this.ingredients.push(new IRecipeItem(ingrediant));
      });
    }
    this.amount = data.amount;
    this.measurement = data.measurement;
    this.creator = data.creator;
    this.owners = data.owners;
  }
  
  /* any method would be defined here*/
  // foo(): string {
  //   return this.name.uppercase() // whatever
  // }
}

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
  description: {
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
RecipeSchema.virtual('carbs').get(function() {
  console.log('carbs: ', FoodCalcService.getCarbsFromIngredients(this.ingredients));
  return FoodCalcService.getCarbsFromIngredients(this.ingredients);
});
RecipeSchema.virtual('fats').get(function() {
  return FoodCalcService.getFatsFromIngredients(this.ingredients);
});
RecipeSchema.virtual('protein').get(function() {
  return FoodCalcService.getProteinFromIngredients(this.ingredients);
});
RecipeSchema.virtual('calories').get(function() {
  // return FoodCalcService.getCaloriesFromIngredients(this.ingredients);
  return FoodCalcService.calcCalories(this.carbs, this.fats, this.protein);
});

export interface RecipeDocument extends IRecipe, Document { }
export const Recipe: Model<RecipeDocument> = model<RecipeDocument>("Recipe", RecipeSchema, "Food");