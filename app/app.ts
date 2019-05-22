// import {Server} from './server';
require('dotenv').config();
const app = require('./server');
export class App {
  private port = process.env.PORT || 4201;
    constructor() {
      app.listen(this.port, () =>
        console.log(`Server is listening on port ${this.port}.`)
      );
    }
}
new App();