import {Controller} from './controller';
import {FoodService} from '../common/service/food.service';
import {ErrorHandler} from '../common/service/errorHandler.service';
import {Error} from '../common/errors/errors';
import {FoodDocument} from '../common/schema/Food';

export class FoodController extends Controller {
  food: FoodService;
  constructor(app, errorHandler: ErrorHandler) {
    super(app, errorHandler, '/food');
    this.food = new FoodService();
  }
  loadRoutes() {
    this.router.get('/id/:id', async (req, res, next) => {
      try {
        const food = await this.food.getFoodById(req.params.id);
        if (food) {
          res.json(food)
        } else this.errorHandler.catchAllError(Error.NOT_FOUND, req, res, next);
      } catch(error) {
        this.errorHandler.catchAllError(error, req, res, next);
      }
    });
    this.router.get('/list/name', async (req, res, next) => {
      try {
        const foods = await this.food.getFoodLikeName('');
        if (foods) {
          res.json(foods)
        } else this.errorHandler.catchAllError(Error.NOT_FOUND, req, res, next);
      } catch(error) {
        this.errorHandler.catchAllError(error, req, res, next);
      }
    });
    this.router.get('/list/name/:name', async (req, res, next) => {
      try {
        const foods = await this.food.getFoodLikeName(req.params.name);
        if (foods) {
          res.json(foods)
        } else this.errorHandler.catchAllError(Error.NOT_FOUND, req, res, next);
      } catch(error) {
        this.errorHandler.catchAllError(error, req, res, next);
      }
    });
    this.router.post('/create', async (req, res, next) => {
      try {
        const food = await this.food.create(req.body);
        res.json(food);
      } catch(error) {
        this.errorHandler.catchAllError(error, req, res, next);
      }
    });
    this.router.post('/update', async (req, res, next) => {
      try {
        const food = await this.food.update(req.body as FoodDocument);
        res.json(food);
      } catch(error) {
        this.errorHandler.catchAllError(error, req, res, next);
      }
    });
    this.router.get('/delete/:id', async (req, res, next) => {
      try {
        const food = await this.food.delete(req.params.id);
        res.json(food);
      } catch(error) {
        this.errorHandler.catchAllError(error, req, res, next);
      }
    });
  }
}