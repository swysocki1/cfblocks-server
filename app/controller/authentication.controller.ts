import { Controller } from "./controller";
import { AuthenticationService } from "../common/service/authentication.service";
import { ErrorHandler } from "../common/service/errorHandler.service";

export class AuthenticationController extends Controller {
  auth: AuthenticationService = new AuthenticationService();
  constructor(app, errorHandler: ErrorHandler) {
    super(app, errorHandler, "/authenticate");
  }
  loadRoutes() {
    this.router.post("/login", async (req, res, next) => {
      try {
        const user = await this.auth.authenticate(
          req.body.username,
          req.body.password
        );
        res.json(user);
      } catch (error) {
        this.errorHandler.catchAllError(error, req, res, next);
      }
    });
    this.router.post("/signup", async (req, res, next) => {
      try {
        const user = await this.auth.signup(req.body);
        res.json(user);
      } catch (error) {
        this.errorHandler.catchAllError(error, req, res, next);
      }
    });
  }
}
