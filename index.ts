// server/index.js
import 'dotenv/config'
import express from "express";
import session from 'express-session';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import routeAuth from "./src/server/routes/routeAuth.js";
import routeURL from './src/server/routes/routeURL.js';

const { connect } = mongoose;

const PORT = process.env.PORT || 3001;
async function run() {

  if (mongoose.connection.readyState === 0) {
    await connect(process.env.MONGO_URI!)
    console.log("connected to mongo")
  }

}

await run();

const app = express();

const sess: any = {
  name: 'user_session',
  saveUninitialized: true,
  resave: false,
  secret: process.env.SECRET ?? 'did you know that this secret is a secret secret and is actually one of the secrets of all time i think that this secret is quite secret because it is secret',
  cookie: {
    samesite: "lax",
    maxAge: 60000000
  }
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess));
app.use(express.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true, parameterLimit: 20000000 }));
app.use(bodyParser.json());
app.use("/api/auth/", routeAuth);
app.use("/", routeURL);
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});