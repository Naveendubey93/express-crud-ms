import { env } from './environment/env';
import { Application } from 'express';
import express from 'express';
import mongoose from 'mongoose';

/**
 * Priimary class that constructs all of the Express Server
 */

export class App {
  public app: Application;

  /**
   * @param port {number} Port Application listens on
   * @param middleware {Array} Array of middlewares to be applied to app
   * @param routes Array of express routes (express.Router object) for application routes
   * @param apiPaths Base path Array for the api endpoint will be prepend to all routes
   * @param staticPath path to folder for public file express will make available
   */

  constructor(
    private port: number,
    middleware: Array<any>,
    routes: Array<express.Router>,
    private apiPath: string = env().apiPath ? env().apiPath : '/api',
    private staticPath: string = env().staticPath ? env().staticPath : 'public',
  ) {

  //* cretae a new express app
    this.app = express();
    this.middleware(middleware);
    this.routes(routes);
    this.assets(this.staticPath);
  }
  /**
   * @param mware array of middleware to be loaded into express app
   */
  private middleware(mware: any[]) {
    mware.forEach((m) => {
      this.app.use(m);
    });
  }

  public appMiddleware(middleware: any) {
    this.app.use(middleware);
  }

  /**
   * Attaches routes objects to app, appending routes to `apipath`
   * @param routes Array of routes objects to attach to be attached to the app
   */
  
  private routes(routes: Array<express.Router>) {
    routes.forEach((r) => {
      this.app.use(`${this.app}`, r);
    })
  }

  /**
   * Enables express to save up static assets
  */

  private assets(path: string) {
    this.app.use(express.static(path))
  }

  /**
   * Creates a connection to a MongoDB instance using mongoose
   * @param uri MongoDB connection URI
   */

  public mongoDB(uri: string) {
    const connect = () => {
        console.log("Connected to MongoDB instance",uri)

      mongoose.connect(uri, {
        //  useNewUrlParser: true, 
        //  useUnifiedTopology: true
      }).then(() => {
        console.log("Connected successfully")
        return;
      }).catch((error) => {
        console.error("DATABASE CONNECTION FAILED \n", error)
      }); 
    }
    connect();
    mongoose.connection.on("disconnected", connect);
  }

  /**
   *Start the Express server 
  */
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App Listening  on ${this.port}`);
    });
  }
}

