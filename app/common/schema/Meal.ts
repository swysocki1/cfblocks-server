import * as mongoose from "mongoose";
import { ObjectID } from "mongodb";
import { Document, Model, model, Schema } from "mongoose";
import { FoodCalcService } from "../service/food-calc.service";
import { IMeal } from "../interface/meal";

ObjectID.prototype.valueOf = function() {
  return this.toString();
};

const MealSchema = new Schema(
  {
    eatenBy: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: true
    },
    eatenDate: {
      type: Date,
      required: true
    },
    food: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
      required: true
    },
    eatenAmount: {
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

MealSchema.virtual("carbs").get(function() {
  return FoodCalcService.calcCarbs(this.amount, this.food);
});
MealSchema.virtual("fats").get(function() {
  return FoodCalcService.calcFats(this.amount, this.food);
});
MealSchema.virtual("protein").get(function() {
  return FoodCalcService.calcProtein(this.amount, this.food);
});
MealSchema.virtual("calories").get(function() {
  return FoodCalcService.calcCalories(this.carbs, this.fats, this.protein);
});

export interface MealDocument extends IMeal, Document {}
export const Meal: Model<MealDocument> = model<MealDocument>(
  "Meal",
  MealSchema,
  "Meal"
);
