import Food from '../schema/Food';

export class UtilsService {
  static calcCalories(carbs: number, fats: number, protein: number) {
    return this.carbsToCals(carbs) + this.fatsToCals(fats) + this.proteinToCals(protein);
  }
  static carbsToCals(carbs: number) {
    if (carbs) {
      return carbs * 4;
    } else return 0;
  }
  static fatsToCals(fats: number) {
    if (fats) {
      return fats * 9;
    } else return 0;
  }
  static proteinToCals(protein: number) {
    if (protein) {
      return protein * 4;
    } else return 0;
  }
  
  static getCarbsFromIngredients(ingredients) {
    let carbs = 0;
    ingredients.forEach(ingredient => {
      carbs += (ingredient.amount / ingredient.food.amount) * ingredient.food.carbs;
    });
    return carbs;
  }
  static getFatsFromIngredients(ingredients) {
    let fats = 0;
    ingredients.forEach(ingredient => {
      fats += (ingredient.amount / ingredient.food.amount) * ingredient.food.fats;
    });
    return fats;
  }
  static getProteinFromIngredients(ingredients) {
    let protein = 0;
    ingredients.forEach(ingredient => {
      protein += (ingredient.amount / ingredient.food.amount) * ingredient.food.protein;
    });
    return protein;
  }
  static MEASUREMENTS = ['', 'Teaspoons', 'Tablespoons', 'Fluid Ounces', 'Cups', 'Pints', 'Quarts', 'Gallons', 'Ounces', 'Pounds', 'Grams', 'Kilograms', "Liters"];
}