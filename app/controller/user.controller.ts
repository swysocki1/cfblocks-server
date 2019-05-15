import {Controller} from './controller';
import {UserService} from '../common/service/user.service';
import {ErrorHandler} from '../common/service/errorHandler.service';
import {Error} from '../common/errors/errors';
import {UserDocument} from '../common/schema/User';

export class UserController extends Controller {
  user: UserService;
  constructor(app, errorHandler: ErrorHandler) {
    super(app, errorHandler, '/user');
    this.user = new UserService();
  }
  loadRoutes() {
    this.router.get('/:id', async (req, res, next) => {
      try {
        const user = await this.user.getUserById(req.params.id);
        if (user) {
          res.json(user)
        } else this.errorHandler.catchAllError(Error.NOT_FOUND, req, res, next);
      } catch(error) {
        this.errorHandler.catchAllError(error, req, res, next);
      }
    });
    this.router.post('/create', async (req, res, next) => {
      try {
        const user = await this.user.create(req.body);
        res.json(user);
      } catch(error) {
        this.errorHandler.catchAllError(error, req, res, next);
      }
    });
    this.router.post('/update', async (req, res, next) => {
      try {
        const user = await this.user.update(req.body as UserDocument);
        res.json(user);
      } catch(error) {
        this.errorHandler.catchAllError(error, req, res, next);
      }
    });
    this.router.get('/delete/:id', async (req, res, next) => {
      try {
        const user = await this.user.delete(req.params.id);
        res.json(user);
      } catch(error) {
        this.errorHandler.catchAllError(error, req, res, next);
      }
    });
  }
}