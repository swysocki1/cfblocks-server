import {User, UserDocument} from '../schema/User';
import {Error,ErrorObject} from '../errors/errors';

export class UserService {
  constructor() { }
  async getUserById(_id: string): Promise<UserDocument> {
    if (_id) {
      return await User.findById(_id).select('-password').exec() as UserDocument;
    } else return null;
  }
  async getUserByUsername(username: string): Promise<UserDocument> {
    if (username) {
      return await User.findOne({username: username}).exec() as UserDocument;
    } else return null;
  }
  async getUsersLikeUsername(username: string): Promise<UserDocument[]> {
    if (username) {
      return await User.find({username: new RegExp(username)}).exec() as UserDocument[];
      // return await User.find();
    } else return [];
  }
  async getUsers(): Promise<UserDocument[]> {
    return await User.find();
  }
  async getUserByEmail(email: string): Promise<UserDocument> {
    if (email) {
      return await User.findOne({email: email}).exec() as UserDocument;
    } else return null;
  }
  async create(user: any): Promise<UserDocument> {
    if (user) {
      const userExists: boolean = await this.userExists(user);
      if (!userExists) {
        const newUser = await new User(user);
        return await User.create(newUser) as UserDocument;
      } throw Error.USER_ALREADY_EXISTS;
    } else return null;
  }
  async update(user: UserDocument): Promise<UserDocument> {
    if (user) {
      if (user.password)
        delete user.password;
      return await User.findByIdAndUpdate(user._id, { $set: { ...user } }, { new: true }).exec() as UserDocument;
    } else return null;
  }
  async delete(_id: string): Promise<UserDocument> {
    if (_id) {
      return await User.findByIdAndDelete(_id).exec() as UserDocument;
    } else return null;
  }
  async userExists(user: UserDocument): Promise<boolean> {
    const responses: any[] = await Promise.all([this.getUserByUsername(user.username), this.getUserByEmail(user.email)]);
    let exists = false;
    responses.forEach(response => { exists = response ? true : exists; });
    return exists;
  }
}