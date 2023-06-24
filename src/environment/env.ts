// import { exit } from "process";
const { exit } = require("process");

import { IEnv } from "../interfaces/IEnv";
// export { IEnv } from "../interfaces/IEnv";
// import {config as configDotenv} from 'dotenv'
// config();
import dotenv from 'dotenv';
dotenv.config();

export const env: () => IEnv = () => {
  if (process.env.ENVIRONMENT === "dev") {
    
    let { ENV } = require("./dev");
    return ENV;
  } else if (process.env.ENVIRONMENT === "production") {
    let env = require("./prod");
    return env;
  } else {
    console.log(
      `Error. shell variable ENVIRONMENT not set. Acceptable values are 'dev' | 'production'`
    );
    exit(1);
  }
};