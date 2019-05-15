import {Controller} from './controller';
import {AuthenticationService} from '../common/service/authentication.service';
import {ErrorHandler} from '../common/service/errorHandler.service';

export class AuthenticationController extends Controller {
  auth: AuthenticationService;
  constructor(app, errorHandler: ErrorHandler) {
    super(app, errorHandler, '/authenticate');
    this.auth = new AuthenticationService();
  }
  loadRoutes() {
    this.router.post('/', async (req, res, next) => {
      try {
        const user = await this.auth.authenticate(req.body.username, req.body.password);
        res.json(user);
      } catch(error) {
        this.errorHandler.catchAllError(error, req, res, next);
      }
    });
  }
}