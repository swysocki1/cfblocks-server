export default `
  type Food {
    _id: String!
    name: String!
    description: String
    img: String
    servings: [Serving]!
  }
  type Serving {
    _id: String!
    carbs: Float!
    fats: Float!
    protein: Float!
    cals: Float!
    amount: Float!
    measurement: String!
  }
  type Query {
    food(_id: ID!): Food!
    foods: [Food!]!
    foodsByName(name: String!): [Food!]!
  }
  type Mutation {
    createFood(food: CreateFoodInput!): Food!
    updateFood(_id: String!, food: UpdateFoodInput!): Food!
    deleteFood(_id: String!): Food!
  }
  input CreateFoodInput {
    name: String!
    description: String
    img: String
    servings: [CreateServingInput]!
  }
  input UpdateFoodInput {
    name: String!
    description: String
    img: String
    servings: [UpdateServingInput]!
  }
  input CreateServingInput {
    carbs: Float!
    fats: Float!
    protein: Float!
    amount: Float!
    measurement: String!
  }
  input UpdateServingInput {
    carbs: Float!
    fats: Float!
    protein: Float!
    cals: Float!
    amount: Float!
    measurement: String!
  }
`;