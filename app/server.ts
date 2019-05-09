// lib/app.ts
import * as express from 'express';

// const cors = require('cors');
import * as cors from 'cors';

import * as expressGraphQL from 'express-graphql';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import schema from './common/graphQL';

export class Server {
  app;
  constructor() {
    this.app = express();
    this.connectMongoDB();
    this.startServer();
  }
  startServer() {
    this.app.use(
      "/graphql",
      cors(),
      bodyParser.json(),
      expressGraphQL({
        schema,
        graphiql: true
      })
    );
    
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
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

