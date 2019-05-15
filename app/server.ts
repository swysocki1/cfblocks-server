// lib/app.ts
import * as express from 'express';
import * as cors from 'cors';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import {Controller} from './controller/controller';
import {AuthenticationController} from './controller/authentication.controller';
import {ErrorHandler} from './common/service/errorHandler.service';
import {UserController} from './controller/user.controller';
import {FoodController} from './controller/food.controller';

export class Server {
  app;
  errorHandler;
  constructor() {
    this.app = express();
    this.errorHandler = new ErrorHandler();
    this.connectMongoDB();
    this.startServer();
    this.loadRoutes();
  }
  startServer() {
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(express.json());
  }
  loadRoutes() {
    new Controller(this.app, this.errorHandler);
    new AuthenticationController(this.app, this.errorHandler);
    new UserController(this.app, this.errorHandler);
    new FoodController(this.app, this.errorHandler);
  }
  connectMongoDB() {
    mongoose
      .connect(
        process.env.MONGO_DB_URI,
        {
          useCreateIndex: true,
          useNewUrlParser: true
        }
      )
      .then(() => console.log("MongoDB connected"))
      .catch(err => console.log(err));
  }
}

