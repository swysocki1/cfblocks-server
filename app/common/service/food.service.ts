import { Food, RawFood, Recipe, FoodDocument } from "../schema/Food";
import { Error } from "../errors/errors";
import { FoodCalcService } from "./food-calc.service";
// import { RecipeDocument } from "../schema/Recipe";

export class FoodService {
  constructor() {}
  static measurements = [
    "",
    "Teaspoons",
    "Tablespoons",
    "Fluid Ounces",
    "Cups",
    "Pints",
    "Quarts",
    "Gallons",
    "Ounces",
    "Pounds",
    "Grams",
    "Kilograms",
    "Liters"
  ];
  async getFoodById(_id: string): Promise<FoodDocument> {
    if (_id) {
      return (await Food.findById(_id).exec()) as FoodDocument;
    } else return null;
  }
  async getAll(): Promise<FoodDocument[]> {
    console.log("query all food");
    return (await Food.find()
      .populate("ingredients.food")
      .exec()) as FoodDocument[];
    // return await Food.findById(_id).exec() as FoodDocument;
  }
  async getFoodByName(name: string): Promise<FoodDocument> {
    if (name) {
      return (await Food.findOne({ name: name })
        .populate("ingredients.food")
        .exec()) as FoodDocument;
    } else return null;
  }
  async getFoodLikeName(name: string): Promise<FoodDocument[]> {
    if (name) {
      // return await Food.find({}).populate('ingredients.food').exec() as FoodDocument[];
      return (await Food.find({ name: new RegExp(name) })
        .populate("ingredients.food")
        .exec()) as FoodDocument[];
    } else return null;
  }
  async create(food: any): Promise<FoodDocument> {
    if (food) {
      const foodExists: boolean = await this.foodExists(food);
      if (!foodExists) {
        if (
          FoodService.measurements.some(
            measurement => measurement === food.measurement
          )
        ) {
          if (food.ingredients && food.ingredients.length > 0) {
            // Create New Recipe
            const newFood = await new Recipe(food);
            return (await Recipe.create(newFood)) as FoodDocument;
          } else {
            //Create New Food
            const newFood = await new RawFood(food);
            return (await RawFood.create(newFood)) as FoodDocument;
          }
        } else throw Error.INVALID_MEASUREMENT;
      }
      throw Error.FOOD_ALREADY_EXISTS;
    } else return null;
  }
  async update(food: FoodDocument): Promise<FoodDocument> {
    if (food) {
      return (await Food.findByIdAndUpdate(
        food._id,
        { $set: { ...food } },
        { new: true }
      ).exec()) as FoodDocument;
    } else return null;
  }
  async delete(_id: string): Promise<FoodDocument> {
    if (_id) {
      return (await Food.findByIdAndDelete(_id).exec()) as FoodDocument;
    } else return null;
  }
  async foodExists(food: FoodDocument): Promise<boolean> {
    const responses: any[] = await Promise.all([this.getFoodByName(food.name)]);
    let exists = false;
    responses.forEach(response => {
      exists = response ? true : exists;
    });
    return exists;
  }
}
