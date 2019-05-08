import {Server} from './server';
require('dotenv').config();

export class App {
  private port = process.env.PORT || 4201;
    constructor() {
      new Server().app.listen(this.port, () =>
        console.log(`Server is listening on port ${this.port}.`)
      );
    }
}
new App();