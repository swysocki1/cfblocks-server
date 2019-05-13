import { mergeResolvers } from "merge-graphql-schemas";

import User from './User/';
import Food from './Food/';
import Recipe from './Recipe/';

const resolvers = [User, Food, Recipe];

export default mergeResolvers(resolvers);