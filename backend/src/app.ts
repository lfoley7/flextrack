import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from 'cors';
import { MikroORM, RequestContext }from '@mikro-orm/sqlite';
import { initORM } from './db.js';
import { registerUserRoutes } from './routes/users.js';

export async function bootstrap(port = 5000) {
  const db = await initORM();
  const app = express();

  //register middleware
  //body parser for parsing request data
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  // allow localhost:3000 cross origin requests
  app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
  }));

  // add cookies for managing session state and persistent login  
  app.use(cookieParser("v6h23871rvh78123r801t71trv7"));
  app.use(
    session({
      secret: "v6h23871rvh78123r801t71trv7",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: false,
        maxAge: 1000 * 30 * 24 * 60 * 60,
      },
    })
  );

  const logger = (req: Request, res: Response, next: () => void) => {
    console.log("url:", req.url);
    next();
  };
  
  app.use(logger);

  // register request context hook
  app.use((req, res, next) => {
    RequestContext.create(db.em, next);
  });

  // shut down the connection when closing the app
  process.on('exit', async function() {
    await db.orm.close();
  });

  //add routes
  const router = express.Router();
  const userRouter = await registerUserRoutes(express.Router())
  router.use('/user',userRouter);

  app.use("/api", router)

  

  const url = app.listen({ port });

  return { app, url };
}








