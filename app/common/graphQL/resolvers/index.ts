import { mergeResolvers } from "merge-graphql-schemas";

import User from './User/';
import Food from './Food/';

const resolvers = [User, Food];

export default mergeResolvers(resolvers);