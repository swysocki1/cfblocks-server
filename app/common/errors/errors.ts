export class ErrorObject {
  message: string;
  status: string = 'error';
  code?: number;
  constructor(error) {
    if (error) {
      this.message = error.message;
      this.code = error.code ? error.code : null;
      this.status = 'error';
    }
  }
}

export class Error {
  static USERNAME_NOT_FOUND: ErrorObject = new ErrorObject({ message: 'Username could not be found.', code: 404 });
  static INVALID_LOGIN: ErrorObject = new ErrorObject({ message: 'Username and/or Password is incorrect. Please correct and try again.', code: 403 });
  static NOT_FOUND: ErrorObject = new ErrorObject({ message: 'NOT FOUND', code: 404 });
  static USER_ALREADY_EXISTS: ErrorObject = new ErrorObject({ message: 'Username and/or Email already exists.', code: 400 });
  static FOOD_ALREADY_EXISTS: ErrorObject = new ErrorObject({ message: 'Food already exists.', code: 400 });
  static INVALID_MEASUREMENT: ErrorObject = new ErrorObject({ message: 'Measurement is invalid.', code: 400 });
  static USER_MISSING_REQUIRED_FIELDS: ErrorObject = new ErrorObject({ message: 'User Object is missing required value(s).', code: 400 });
}