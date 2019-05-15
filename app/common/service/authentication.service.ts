import {UserDocument, User} from '../schema/User';
import {Error} from '../errors/errors';

export class AuthenticationService {
  constructor() { }
  async authenticate(username, password) {
    const user: UserDocument = await User.findOne({username: username, password: password});
    if (user) {
      return user;
    } else {
      throw Error.INVALID_LOGIN;
    }
  }
}