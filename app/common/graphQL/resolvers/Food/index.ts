import Food from '../../../schema/Food';
import {ErrorMessage} from '../../../errors/errors';
import {UtilsService} from '../../../service/utils.service';

export default {
  Query: {
    food: async (parent, { _id }, context, info) => {
      return await Food.findOne({ _id }).exec();
    },
    foods: async (parent, args, context, info) => {
      const foods = await Food.find({})
        .populate('servings')
        .exec();
      
      return foods;
    },
    foodsByName: async (parent, { name }, context, info) => {
      const foods = await Food.find({name: {$regex : `.*${name}.*`}})
        .populate('servings')
        .exec();
      
      return foods;
    },
  },
  Mutation: {
    createFood: async (parent, { food }, context, info) => {
      console.log(food);
      const newFood = await new Food(food);
      console.log(newFood);
      return new Promise((resolve, reject) => {
        newFood.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    updateFood: async (parent, { _id, food }, context, info) => {
      return new Promise((resolve, reject) => {
        Food.findByIdAndUpdate(_id, { $set: { ...food } }, { new: true }).exec(
          (err, res) => {
            err ? reject(err) : resolve(res);
          }
        );
      });
    },
    deleteFood: async (parent, { _id }, context, info) => {
      return new Promise((resolve, reject) => {
        Food.findByIdAndDelete(_id).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  },
  Serving: {
    cals : async ({ carbs, fats, protein }, args, context, info) => {
      return await UtilsService.calcCalories(carbs, fats, protein);
    }
  }
};