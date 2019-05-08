import {Controller} from './controller';
import {ErrorHandler} from '../common/service/error-handler.service';
import {AuthenticationService} from '../common/service/authentication.service';
export class AuthenticationController extends Controller {
  private authentication;
  constructor(app, errorHandler: ErrorHandler, authentication: AuthenticationService) {
    super(app, errorHandler, '/authenticate');
    this.authentication = authentication;
  }
  loadRoutes() {
    this.router.post('/', async (req, res) => {
      try {
        const user = await this.authentication.authenticate(req.body.username, req.body.password);
        delete user.password;
        res.json(user);
      } catch(error) {
        this.errorHandler.catchAllError(error, req, res);
      }
    });
    // this.router.post('/', (req, res) => {
    //   try {
    //     console.log('authenticate');
    //     this.authentication.authenticate(req.body.username, req.body.password, (authErr, authRes) => {
    //       if (authRes) delete authRes.password;
    //       if (authErr) {
    //         if (authErr === 'INVALID LOGIN')
    //           this.errorHandler.invalidLogin(authErr, req, res);
    //         else
    //           this.errorHandler.internalServerError(authErr, req, res);
    //       } else {
    //         res.json(authRes);
    //       }
    //     });
    //   } catch(error) {
    //     this.errorHandler.catchAllError(error, req, res);
    //   }
    // });
  }
}