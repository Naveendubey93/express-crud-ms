import { env } from './environment/env';
const { App } = require('./application');

// import { App } from "./application";
const { middleware } = require('./middleware');
const { routerTemplate }  = require('./routes/sample-router.js');
const port: string = env().port ?? '8080';
let dbConString;

console.log( "Starting = =================",env(),env().stage, env().port)
console.log( "Starting = =================",env().db)
try {
  dbConString = env().db.uri(
    env().db.user,
    env().db.pw,
    env().db.name,
    env().db.account,
  )
  console.log( "Starting = =================",env())

} catch (err) {
  console.log("Failed to create DB Connection string", +err);
}
const app = new App(
  port,
  middleware,
  [routerTemplate] //* Add your express router objects here
);

/**
 * Connect to MongoDB database
 */

dbConString ? app.mongoDB(dbConString) : console.log("Not started MongoDB connection");

/**
 * Laucnh!
 */
app.listen()



// import * as express from "express";
// class App {
//   public app
//   PORT = 5000
//   constructor() {
//     this.app = express();
//     this.app.listen(process.env.PORT || this.PORT, () => {
//     console.log(`App Started on ${this.PORT}`);
//   });
//   /**
//      * Start the Express app
//      */
  
  
//   //}
//   // import { Request, Response , NextFunction} from "express";
//   // this.app.use((req: Request, res: Response, next: NextFunction) => {
//   // res.header('Access-Control-Allow-Origin', '*');
//   // res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
//   // res.header('Access-Control-Allow-Headers', '*');
//   // next();
//   // });
//   // this.app.use(bodyParser.json());

//   // this.app.use(bodyParser.urlencoded({ extended: false }));
//   }
//   public listen() {
//     this.app.listen(this.PORT, () => {
//       console.log(`App Started on ${this.PORT}`);
//     });
//   }
// }
//export default new App().app;

//}