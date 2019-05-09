export default `
  type User {
    _id: String!
    username: String!
    firstName: String!
    lastName: String!
    email: String!
    age: Int!
  }
  type Query {
    user(_id: ID!): User!
    users: [User!]!
    usersByUsername(username: String!): [User!]!
  }
  type Mutation {
    authenticate(login: LoginInput!): User!
    createUser(user: CreateUserInput!): User!
    updateUser(_id: String!, user: UpdateUserInput!): User!
    deleteUser(_id: String!): User!
  }
  input LoginInput {
    username: String!
    password: String!
  }
  input CreateUserInput {
    username: String!
    password: String!
    firstName: String!
    lastName: String!
    email: String!
    age: Int
  }
  
  input UpdateUserInput {
    username: String
    password: String
    firstName: String
    lastName: String
    email: String
    age: Int
  }
`;