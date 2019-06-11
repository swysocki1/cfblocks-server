import { UserDocument, User } from "../schema/User";
import { Error } from "../errors/errors";
import { EncryptSerice } from "./encrypt.serice";
import { UserService } from "./user.service";

export class AuthenticationService {
  crypto: EncryptSerice = new EncryptSerice();
  userService: UserService = new UserService();
  constructor() {}
  async authenticate(username, password) {
    let user: UserDocument = await User.findOne({ username: username });
    if (user) {
      const decryptPassword = this.crypto.decrypt(user.password);
      if (decryptPassword === password) {
        user = user.toObject();
        delete user.password;
        return user;
      } else throw Error.INVALID_LOGIN;
    } else throw Error.USERNAME_NOT_FOUND;
  }
  async signup(newUser) {
    if (newUser && newUser.password) {
      newUser.password = this.crypto.encrypt(newUser.password);
      let user = await this.userService.create(newUser);
      user = user.toObject();
      delete user.password;
      return user;
    } else throw Error.USER_MISSING_REQUIRED_FIELDS;
  }
}
