// import {Controller} from './controller';
// import {RecipeService} from '../common/service/recipe.service';
// import {ErrorHandler} from '../common/service/errorHandler.service';
// import {Error} from '../common/errors/errors';
// import {RecipeDocument} from '../common/schema/Recipe';

// export class RecipeController extends Controller {
//   recipe: RecipeService;
//   constructor(app, errorHandler: ErrorHandler) {
//     super(app, errorHandler, '/recipe');
//     this.recipe = new RecipeService();
//   }
//   loadRoutes() {
//     this.router.get('/id/:id', async (req, res, next) => {
//       try {
//         const recipe = await this.recipe.getRecipeById(req.params.id);
//         if (recipe) {
//           res.json(recipe)
//         } else this.errorHandler.catchAllError(Error.NOT_FOUND, req, res, next);
//       } catch(error) {
//         this.errorHandler.catchAllError(error, req, res, next);
//       }
//     });
//     this.router.post('/create', async (req, res, next) => {
//       try {
//         const recipe = await this.recipe.create(req.body);
//         res.json(recipe);
//       } catch(error) {
//         this.errorHandler.catchAllError(error, req, res, next);
//       }
//     });
//     this.router.post('/update', async (req, res, next) => {
//       try {
//         const recipe = await this.recipe.update(req.body as RecipeDocument);
//         res.json(recipe);
//       } catch(error) {
//         this.errorHandler.catchAllError(error, req, res, next);
//       }
//     });
//     this.router.get('/delete/:id', async (req, res, next) => {
//       try {
//         const recipe = await this.recipe.delete(req.params.id);
//         res.json(recipe);
//       } catch(error) {
//         this.errorHandler.catchAllError(error, req, res, next);
//       }
//     });
//   }
// }
