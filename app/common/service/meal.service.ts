import {Meal, MealDocument} from '../schema/Meal';
import {Error,ErrorObject} from '../errors/errors';

export class MealService {
  constructor() { }
  async getMealById(_id: string): Promise<MealDocument> {
    if (_id) {
      return await Meal.findById(_id).exec() as MealDocument;
    } else return null;
  }
  async getMeals(user?: string, startDate?: Date, endDate?: Date): Promise<MealDocument[]> {
    let query = Meal.find();
    if (user) {
      query = query.find({eatenBy: user});
    }
    if (startDate) {
      query = query.find({eatenDate: {$gte: startDate}});
    }
    if (endDate) {
      query = query.find({eatenDate: {$lte: endDate}});
    }
    return await query.exec();
  }
  async create(meal: any): Promise<MealDocument> {
    if (meal) {
      if (meal.food || meal.recipe) {
        const mealExists: boolean = await this.mealExists(meal);
        if (!mealExists) {
          const newMeal = await new Meal(meal);
          return await Meal.create(newMeal) as MealDocument;
        }
        throw Error.MEAL_ALREADY_EXISTS;
      } else throw Error.INVALID_MEAL;
    } else return null;
  }
  async update(meal: MealDocument): Promise<MealDocument> {
    if (meal) {
      if (meal.food || meal.recipe) {
        return await Meal.findByIdAndUpdate(meal._id, {$set: {...meal}}, {new: true}).exec() as MealDocument;
      } else throw Error.INVALID_MEAL;
    } else return null;
  }
  async delete(_id: string): Promise<MealDocument> {
    if (_id) {
      return await Meal.findByIdAndDelete(_id).exec() as MealDocument;
    } else return null;
  }
  async mealExists(meal: MealDocument): Promise<boolean> {
    if (meal) {
      const mealFound = await this.getMealById(meal._id);
      return !!mealFound;
    } else return false;
  }
}