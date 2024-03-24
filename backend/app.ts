import express, { Request, Response } from 'express';
import sequelize from './config/sequelize';
import router from './routes';
import bodyParser from 'body-parser';
import session from "express-session";
import cookieParser from "cookie-parser";

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

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

// adds userId to session for typescript 
declare module 'express-session' {
  interface SessionData {
    userId: string;
  }
}

const logger = (req: Request, res: Response, next: () => void) => {
  console.log("url:", req.url);
  next();
};

app.use(logger);

//add routes
app.use("/api", router)

// Synchronize Sequelize models with the database
sequelize.sync({ force: true }).then(() => {
    console.log('Database synced');
}).catch(err => {
console.error('Error syncing database:', err);
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});


