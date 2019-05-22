import {Food, FoodDocument} from '../schema/Food';
import {Error} from '../errors/errors';

export class FoodService {
  constructor() { }
  static measurements = ['', 'Teaspoons', 'Tablespoons', 'Fluid Ounces', 'Cups', 'Pints', 'Quarts', 'Gallons', 'Ounces', 'Pounds', 'Grams', 'Kilograms', "Liters"];
  async getFoodById(_id: string): Promise<FoodDocument> {
    if (_id) {
      return await Food.findById(_id).exec() as FoodDocument;
    } else return null;
  }
  async getFoodByName(food: string): Promise<FoodDocument> {
    if (food) {
      return await Food.findOne({food: food}).exec() as FoodDocument;
    } else return null;
  }
  async create(food: any): Promise<FoodDocument> {
    if (food) {
      const foodExists: boolean = await this.foodExists(food);
      if (!foodExists) {
        if (FoodService.measurements.some((measurement) => measurement === food.measurement)) {
          const newFood = await new Food(food);
          return await Food.create(newFood) as FoodDocument;
        } else throw Error.INVALID_MEASUREMENT;
      } throw Error.FOOD_ALREADY_EXISTS;
    } else return null;
  }
  async update(food: FoodDocument): Promise<FoodDocument> {
    if (food) {
      return await Food.findByIdAndUpdate(food._id, { $set: { ...food } }, { new: true }).exec() as FoodDocument;
    } else return null;
  }
  async delete(_id: string): Promise<FoodDocument> {
    if (_id) {
      return await Food.findByIdAndDelete(_id).exec() as FoodDocument;
    } else return null;
  }
  async foodExists(food: FoodDocument): Promise<boolean> {
    const responses: any[] = await Promise.all([this.getFoodByName(food.name)]);
    let exists = false;
    responses.forEach(response => { exists = response ? true : exists; });
    return exists;
  }
}