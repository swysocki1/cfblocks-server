export class IFood {
  name: string;
  description?: string;
  img?: string;
  amount: number;
  measurement: string;
  creator: string;
  owners: string[] = [] as string[];
  tags: string[] = [] as string[];
  constructor(data: any) {
    this.name = data.name;
    this.description = data.description;
    this.img = data.img;
    this.amount = data.amount;
    this.measurement = data.measurement;
    this.creator = data.measurement;
    this.owners = data.owners;
  }

  /* any method would be defined here*/
  // foo(): string {
  //   return this.name.uppercase() // whatever
  // }
}
export class IRawFood extends IFood {
  carbs: number;
  fats: number;
  protein: number;
  type: string;
  constructor(data: any) {
    super(data);
    this.carbs = data.carbs;
    this.fats = data.fats;
    this.protein = data.protein;
    this.type = data.type;
  }

  /* any method would be defined here*/
  // foo(): string {
  //   return this.name.uppercase() // whatever
  // }
}

export class IRecipe extends IFood {
  instructions: string;
  ingredients: IRecipeItem[];
  type: string;
  constructor(data: any) {
    super(data);
    this.instructions = data.instructions;
    this.ingredients = [];
    if (data.ingredients) {
      data.ingredients.forEach(ingrediant => {
        this.ingredients.push(new IRecipeItem(ingrediant));
      });
    }
    this.type = data.type;
  }

  /* any method would be defined here*/
  // foo(): string {
  //   return this.name.uppercase() // whatever
  // }
}

export class IRecipeItem {
  food: string;
  amount: number;
  constructor(item: { food: string; amount: number }) {
    this.food = item.food;
    this.amount = item.amount;
  }
}
