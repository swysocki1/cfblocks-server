export class FoodCalcService {
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
  
  static getCaloriesFromIngredients(ingredients) {
    return this.calcCalories(
      this.getCarbsFromIngredients(ingredients), this.getFatsFromIngredients(ingredients), this.getProteinFromIngredients(ingredients)
    );
  }
  static getCarbsFromIngredients(ingredients) {
    let carbs = 0;
    ingredients.forEach(ingredient => {
      console.log(typeof ingredient.food, ingredient.food);
      if (ingredient.food && ingredient.food.amount) {
        carbs += (ingredient.amount / ingredient.food.amount) * ingredient.food.carbs;
      }
    });
    return carbs;
  }
  static getFatsFromIngredients(ingredients) {
    let fats = 0;
    ingredients.forEach(ingredient => {
      if (ingredient.food && ingredient.food.amount) {
        fats += (ingredient.amount / ingredient.food.amount) * ingredient.food.fats;
      }
    });
    return fats;
  }
  static getProteinFromIngredients(ingredients) {
    let protein = 0;
    ingredients.forEach(ingredient => {
      if (ingredient.food && ingredient.food.amount) {
        protein += (ingredient.amount / ingredient.food.amount) * ingredient.food.protein;
      }
    });
    return protein;
  }
}