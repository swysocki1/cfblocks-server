import {UserDAO} from '../DAO/user.dao';
import {User} from '../model/user.model';

export class AuthenticationService {
  userDAO: UserDAO;
  constructor(userDAO: UserDAO) {
    this.userDAO = userDAO;
  }
  async authenticate(username: string, password: string): Promise<User> {
    const users = await this.userDAO.getUsersByUsername(username);
    const user = users.find(u => u.password === password) as User;
    if (user) {
      return user;
    } else {
      throw new Error('INVALID LOGIN');
    }
  }
  // getUserById(user, res) {
  //   if (user) {
  //     this.userDAO.getUserById(user, (err, result) => {
  //       res(err, result);
  //     });
  //   } else res('User Id Not Provided');
  // }
  // createUser(user, res) {
  //   if (user) {
  //     const missingFields = [];
  //     if (!user.username) {
  //       missingFields.add('Username');
  //     }
  //     if (!user.password) {
  //       missingFields.add('Password');
  //     }
  //     if (!user.email) {
  //       missingFields.add('Email');
  //     }
  //     if (missingFields.length > 0) {
  //       res(`No ${missingFields.join(', ')} Provided`)
  //     } else {
  //       this.userDAO.getUsersByUsername(user.username, (getUserErr, users) => {
  //         if (getUserErr) res(getUserErr);
  //         else {
  //           if (users && users.length > 0) {
  //             res('Username Already Exists');
  //           } else {
  //             this.userDAO.createUser(user, (createUserError, userObj) => {
  //               if (createUserError) res(createUserError);
  //               else {
  //                 res(null, userObj);
  //               }
  //             });
  //           }
  //         }
  //       });
  //     }
  //   } else {
  //     res('User Body is Empty');
  //   }
  // }
  // updateUser(user, res) {
  //   if (user) {
  //     if (user.id) {
  //       this.userDAO.updateUser(user, (updateUserErr, updateUserRes) => {
  //         if (updateUserErr) res(updateUserErr);
  //         else {
  //           console.log('Update User Response', updateUserRes);
  //           this.userDAO.getUserById(user.id, (getUserErr, getUserRes) => {
  //             res(getUserErr, getUserRes);
  //           });
  //         }
  //       });
  //     } else {
  //       this.createUser(user, res);
  //     }
  //   } else res('No User Provided');
  // }
  // upsertUser(user, res) {
  //   if (user) {
  //     if (user.id) {
  //       this.userDAO.upsertUser(user, (updateUserErr, updateUserRes) => {
  //         if (updateUserErr) res(updateUserErr);
  //         else {
  //           console.log('Update User Response', updateUserRes);
  //           this.userDAO.getUserById(user.id, (getUserErr, getUserRes) => {
  //             res(getUserErr, getUserRes);
  //           });
  //         }
  //       });
  //     } else {
  //       this.createUser(user, res);
  //     }
  //   } else res('No User Provided');
  // }
  // deleteUser(user, res) {
  //   if (user) {
  //     if (user.id) {
  //       this.userDAO.deleteUser(user, (deleteUserErr, deleteUserRes) => {
  //         res(deleteUserErr, deleteUserRes);
  //       });
  //     } else {
  //       this.createUser(user, res);
  //     }
  //   } else res('No User Provided');
  // }
  // userExists(user) {
  //   return new Promise((resolve, reject) => {
  //     if (user && user.id) {
  //       this.userDAO.getUserById(user.id, (err, queryRes) => {
  //         if (err) reject(err);
  //         else if (!queryRes) reject('User Does Not Exist!');
  //         else resolve(queryRes);
  //       });
  //     } else {
  //       resolve();
  //     }
  //   });
  // }
}