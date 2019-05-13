export default `
  type Food {
    _id: String!
    name: String!
    description: String
    img: String
    carbs: Float!
    fats: Float!
    protein: Float!
    cals: Float!
    amount: Float!
    measurement: String!
    creator: String!
    owners: [String]!
  }
  type Query {
    food(_id: ID!): Food!
    foods: [Food!]!
    foodsByName(name: String!): [Food!]!
    measurements: [String!]!
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
    carbs: Float!
    fats: Float!
    protein: Float!
    amount: Float!
    measurement: String!
    creator: String!
    owners: [String]!
  }
  input UpdateFoodInput {
    name: String!
    description: String
    img: String
    carbs: Float!
    fats: Float!
    protein: Float!
    amount: Float!
    measurement: String!
    creator: String!
    owners: [String]!
  }
`;