// server/index.js
import 'dotenv/config'
import express from "express";
import session from 'express-session';
import bodyParser from "body-parser";
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json({limit: '200mb'}));
app.use(
    // Creates a session middleware with given options.
    session({
      name: 'user_sesh',
      saveUninitialized: false,
      resave: false,
      secret: 'big sekrit do not touch',
      cookie: {
        sameSite: "lax",
        maxAge: 60000000
      }
    })
);
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true, parameterLimit: 20000000 }));
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});