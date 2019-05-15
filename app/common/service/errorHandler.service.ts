import {ErrorObject} from '../errors/errors';

export class ErrorHandler {
  constructor() {}
  catchAllError(error: ErrorObject, req, res, next) {
    console.error(error);
    if (!error.code)
      error.code = 500;
    if (!error.message)
      error.message = 'Something Mysterious Happened?';
    error.status = 'error';
    res.status(error.code);
    res.json(error);
  }
  // disconnectMysql() {
  //   return Promise.all(this.mysqlList.map(mysql => {
  //     return new Promise((resolve, reject) => {
  //       mysql.disconnect((message, error) => {
  //         if (error) reject(error);
  //         else resolve(message);
  //       });
  //     });
  //   }));
  // }
}