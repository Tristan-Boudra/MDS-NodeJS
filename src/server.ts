import express, { NextFunction, Request, Response } from "express";
import expressWs, { Application } from "express-ws";
import cookieParser from "cookie-parser";
import path from "path";
import { getLogin } from "./routes/getLogin";
import { getRoot } from "./routes/getRoot";
import { getWs } from "./routes/getWs";
import { getWsPosts } from "./routes/getWsPosts";
import { getRegister } from "./routes/getRegister";
import { getProfile } from "./routes/getProfile";
import { getLogout } from "./routes/getLogout";
import { postLogin } from "./routes/postLogin";
import { postRegister } from "./routes/postRegister";
import { authentificationMiddleware } from "./middlewares/authenticationMiddleware";
import { updateProfile } from "./routes/updateProfile";
import { deleteProfile } from "./routes/deleteProfile";

function main() {
  const app = express() as unknown as Application;
  expressWs(app);
  const sockets = new Map();

  const SECRET_KEY = 'MySecretKeyIsAwesome'

  app.use(express.urlencoded());

  // use cookie
  app.use(cookieParser(SECRET_KEY));

  // Set the engine pug
  app.set("view engine", "pug");

  getLogin(app);
  postLogin(app);
  getRegister(app);
  postRegister(app);
  
  app.use(authentificationMiddleware);

  getLogout(app);
  getProfile(app);
  updateProfile(app);
  deleteProfile(app);
  getRoot(app);
  getWs(app, sockets);
  getWsPosts(app, sockets);

  app.use(express.static(path.join(process.cwd(), "public")));

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).send("Internal error");
    next();
  });

  app.listen(3000, () => {
    console.log("Server listening on port 3000");
  });
}

main();
