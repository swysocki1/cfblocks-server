import * as mongoose from "mongoose";
import { ObjectID } from "mongodb";
import { Document, Model, model, Schema } from "mongoose";
import { UtilsService } from "../service/utils.service";
import { FoodCalcService } from "../service/food-calc.service";
import { IRawFood, IRecipe } from "../interface/food";

export interface FoodDocument extends IRawFood, IRecipe, Document {}

ObjectID.prototype.valueOf = function() {
  return this.toString();
};

const baseOptions = {
  discriminatorKey: "type", // our discriminator key, could be anything
  collection: "Food", // the name of our collection
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: { createdAt: "created", updatedAt: "lastUpdated" }
};

// Our Base schema: these properties will be shared with our "real" schemas
const FoodBase = mongoose.model(
  "Food",
  new mongoose.Schema(
    {
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
        ref: "User",
        required: true
      },
      owners: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        required: true
      }
    },
    baseOptions
  )
);

export const Food: Model<FoodDocument> = model<FoodDocument>("Food");

// module.exports = model<FoodDocument>("Food");

const rawFoodSchema = new mongoose.Schema(
  {
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
    }
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: { createdAt: "created", updatedAt: "lastUpdated" }
  }
);
rawFoodSchema.virtual("calories").get(function() {
  return FoodCalcService.calcCalories(this.carbs, this.fats, this.protein);
});

export const RawFood: Model<FoodDocument> = FoodBase.discriminator<
  FoodDocument
>("RawFood", rawFoodSchema);

const RecipeItemSchema = new Schema({
  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Food",
    required: true
  },
  amount: {
    type: Number,
    min: 0,
    required: true
  }
});

const recipeSchema = new mongoose.Schema(
  {
    instructions: {
      type: String
    },
    ingredients: {
      type: [RecipeItemSchema]
    }
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: { createdAt: "created", updatedAt: "lastUpdated" }
  }
);
recipeSchema.virtual("calories").get(function() {
  return FoodCalcService.calcCalories(this.carbs, this.fats, this.protein);
});
recipeSchema.virtual("fats").get(function() {
  return FoodCalcService.getFatsFromIngredients(this.ingredients);
});
recipeSchema.virtual("protein").get(function() {
  return FoodCalcService.getProteinFromIngredients(this.ingredients);
});
recipeSchema.virtual("calories").get(function() {
  return FoodCalcService.calcCalories(this.carbs, this.fats, this.protein);
});
export const Recipe: Model<FoodDocument> = FoodBase.discriminator<FoodDocument>(
  "Recipe",
  recipeSchema
);
