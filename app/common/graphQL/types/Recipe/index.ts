export default `
  type Recipe {
    _id: String!
    name: String!
    img: String
    instructions: String
    ingredients: [RecipeItem]!
    carbs: Float!
    fats: Float!
    protein: Float!
    cals: Float!
    creator: String!
    owners: [String]!
  }
  type RecipeItem {
    _id: String!
    food: Food!
    amount: Float!
  }
  type Query {
    recipe(_id: ID!): Recipe!
    recipes: [Recipe!]!
    recipesByName(name: String!): [Recipe!]!
  }
  type Mutation {
    createRecipe(recipe: CreateRecipeInput!): Recipe!
    updateRecipe(_id: String!, recipe: UpdateRecipeInput!): Recipe!
    deleteRecipe(_id: String!): Food!
    addIngredient(_id: String!, food: IngredientInput!): Recipe!
    removeIngredient(recipe_id: String!, ingredient_id: String!): Recipe!
  }
  input CreateRecipeInput {
    name: String!
    img: String
    instructions: String
    ingredients: [IngredientInput]!
    creator: String!
    owners: [String]!
  }
  input UpdateRecipeInput {
    name: String!
    img: String
    instructions: String
    ingredients: [IngredientInput!]!
    creator: String!
    owners: [String]!
  }
  input IngredientInput {
    food: String!
    amount: Float!
  }
`;