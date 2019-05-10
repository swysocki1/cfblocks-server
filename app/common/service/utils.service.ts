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
  static MEASUREMENTS = ['Teaspoons', 'Tablespoons', 'Fluid Ounces', 'Cups', 'Pints', 'Quarts', 'Gallons', 'Ounces', 'Pounds', 'Grams', 'Kilograms', "Liters"];
}