import User from '../../../schema/User';
import {ErrorMessage} from '../../../errors/errors';

export default {
  Query: {
    user: async (parent, { _id }, context, info) => {
      return await User.findOne({ _id }).exec();
    },
    users: async (parent, args, context, info) => {
      const users = await User.find({})
        .populate()
        .exec();
      
      return users.map(u => ({
        _id: u._id.toString(),
        firstName: u.firstName,
        lastName: u.lastName,
        username: u.username,
        email: u.email,
        age: u.age
      }));
    },
    usersByUsername: async (parent, { username }, context, info) => {
      const users = await User.find({username: {$regex : `.*${username}.*`}})
        .populate()
        .exec();
  
      return users.map(u => ({
        _id: u._id.toString(),
        firstName: u.firstName,
        lastName: u.lastName,
        username: u.username,
        email: u.email,
        age: u.age
      }));
    },
  },
  Mutation: {
    authenticate: async (parent, { login }, context, info) => {
      console.log(login);
      const user = await User.findOne({username: login.username, password: login.password}).exec();
      console.log(user);
      if (user)
        return user;
      else throw new Error(ErrorMessage.INVALID_LOGIN);
    },
    createUser: async (parent, { username, password, firstName, lastName, email, age }, context, info) => {
      
      const newUser = await new User({
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email,
        age: age
      });
      
      return new Promise((resolve, reject) => {
        newUser.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    updateUser: async (parent, { _id, user }, context, info) => {
      return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(_id, { $set: { ...user } }, { new: true }).exec(
          (err, res) => {
            err ? reject(err) : resolve(res);
          }
        );
      });
    },
    deleteUser: async (parent, { _id }, context, info) => {
      return new Promise((resolve, reject) => {
        User.findByIdAndDelete(_id).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  }
};