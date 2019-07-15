import { Controller } from "./controller";
import { MealService } from "../common/service/meal.service";
import { ErrorHandler } from "../common/service/errorHandler.service";
import { Error } from "../common/errors/errors";
import { MealDocument } from "../common/schema/Meal";

export class MealController extends Controller {
  meal: MealService;
  constructor(app, errorHandler: ErrorHandler) {
    super(app, errorHandler, "/meal");
    this.meal = new MealService();
  }
  loadRoutes() {
    this.router.get("/id/:id", async (req, res, next) => {
      try {
        const meal = await this.meal.getMealById(req.params.id);
        if (meal) {
          res.json(meal);
        } else this.errorHandler.catchAllError(Error.NOT_FOUND, req, res, next);
      } catch (error) {
        this.errorHandler.catchAllError(error, req, res, next);
      }
    });
    this.router.get("/by/user/:user", async (req, res, next) => {
      try {
        const meal = await this.meal.getMeals(req.params.user, null, null);
        if (meal) {
          res.json(meal);
        } else this.errorHandler.catchAllError(Error.NOT_FOUND, req, res, next);
      } catch (error) {
        this.errorHandler.catchAllError(error, req, res, next);
      }
    });
    this.router.post("/create", async (req, res, next) => {
      try {
        const meal = await this.meal.create(req.body);
        res.json(meal);
      } catch (error) {
        this.errorHandler.catchAllError(error, req, res, next);
      }
    });
    this.router.post("/update", async (req, res, next) => {
      try {
        const meal = await this.meal.update(req.body as MealDocument);
        res.json(meal);
      } catch (error) {
        this.errorHandler.catchAllError(error, req, res, next);
      }
    });
    this.router.get("/delete/:id", async (req, res, next) => {
      try {
        const meal = await this.meal.delete(req.params.id);
        res.json(meal);
      } catch (error) {
        this.errorHandler.catchAllError(error, req, res, next);
      }
    });
  }
}
