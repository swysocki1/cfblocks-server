import {Recipe, RecipeDocument} from '../schema/Recipe';
import {Error} from '../errors/errors';
import {FoodCalcService} from './food-calc.service';
import {FoodService} from './food.service';

export class RecipeService {
  constructor() { }
  async getRecipeById(_id: string): Promise<RecipeDocument> {
    if (_id) {
      return await Recipe.findById(_id).populate('ingredients.food').exec() as RecipeDocument;
    } else return null;
  }
  async getRecipeByName(recipe: string): Promise<RecipeDocument> {
    if (recipe) {
      return await Recipe.findOne({recipe: recipe}).populate('ingredients.food').exec() as RecipeDocument;
    } else return null;
  }
  async create(recipe: any): Promise<RecipeDocument> {
    if (recipe) {
      const recipeExists: boolean = await this.recipeExists(recipe);
      if (!recipeExists) {
        const newRecipe = await new Recipe(recipe);
        const createRecipe = await Recipe.create(newRecipe) as RecipeDocument;
        return await this.getRecipeById(createRecipe._id);
      } throw Error.FOOD_ALREADY_EXISTS;
    } else return null;
  }
  async update(recipe: RecipeDocument): Promise<RecipeDocument> {
    if (recipe) {
      return await Recipe.findByIdAndUpdate(recipe._id, { $set: { ...recipe } }, { new: true }).populate('ingredients.food').exec() as RecipeDocument;
    } else return null;
  }
  async delete(_id: string): Promise<RecipeDocument> {
    if (_id) {
      return await Recipe.findByIdAndDelete(_id).populate('ingredients.food').exec() as RecipeDocument;
    } else return null;
  }
  async recipeExists(recipe: RecipeDocument): Promise<boolean> {
    const responses: any[] = await Promise.all([this.getRecipeByName(recipe.name)]);
    let exists = false;
    responses.forEach(response => { exists = response ? true : exists; });
    return exists;
  }
}