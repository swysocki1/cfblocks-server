import Recipe from '../../../schema/Recipe';
import {ErrorMessage} from '../../../errors/errors';
import {UtilsService} from '../../../service/utils.service';
import Food from '../../../schema/Food';

export default {
  Query: {
    recipe: async (parent, { _id }, context, info) => {
      return await Recipe.findOne({ _id })
        .populate('ingredients.food')
        .exec();
    },
    recipes: async (parent, args, context, info) => {
      const recipes = await Recipe.find({})
        .populate('ingredients.food')
        .exec();
      
      return recipes;
    },
    recipesByName: async (parent, { name }, context, info) => {
      const recipes = await Recipe.find({name: {$regex : `.*${name}.*`}})
        .populate('ingredients.food')
        .exec();
      
      return recipes;
    },
  },
  Mutation: {
    createRecipe: async (parent, { recipe }, context, info) => {
      const newRecipe = await new Recipe(recipe);
      const savedRecipe = await newRecipe.save();
      const query = await Recipe.findOne({ _id: savedRecipe._id })
        .populate('ingredients.food')
        .exec();
      // console.log(query);
      return query;
    },
    updateRecipe: async (parent, { _id, recipe }, context, info) => {
      const updatedRecipe = await Recipe.findByIdAndUpdate(_id, { $set: { ...recipe } }, { new: true }).exec();
      return await Recipe.findOne({ _id: updatedRecipe._id })
        .populate('ingredients.food')
        .exec();
    },
    deleteRecipe: async (parent, { _id }, context, info) => {
      return await Recipe.findByIdAndDelete(_id).exec();
    }
  },
  Recipe: {
    carbs : async ({ ingredients }, args, context, info) => {
      console.log(ingredients);
      return UtilsService.getCarbsFromIngredients(ingredients);
    },
    fats : async ({ ingredients }, args, context, info) => {
      return UtilsService.getFatsFromIngredients(ingredients);
    },
    protein : async ({ ingredients }, args, context, info) => {
      return UtilsService.getProteinFromIngredients(ingredients);
    },
    cals : async ({ ingredients }, args, context, info) => {
      return UtilsService.calcCalories(
        UtilsService.getCarbsFromIngredients(ingredients),
        UtilsService.getFatsFromIngredients(ingredients),
        UtilsService.getProteinFromIngredients(ingredients)
      );
    }
  }
};