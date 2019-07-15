import * as express from "express";
import { ErrorHandler } from "../common/service/errorHandler.service";
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('../swagger.json');

export class Controller {
  errorHandler;
  router;
  constructor(app, errorHandler: ErrorHandler, route?: string) {
    this.errorHandler = errorHandler;
    this.router = express.Router();
    this.loadRoutes();
    route = route ? route : "/";
    console.log("Loading Route " + route);
    app.use(`${route}`, this.router);
    // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {explorer : true}));
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", process.env.CORS);
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authentication"
      );
      next();
    });
  }
  loadRoutes() {
    this.router.get("/ping", (req, res) => {
      console.log("ping");
      res.json({ message: "success" });
    });
  }
}
