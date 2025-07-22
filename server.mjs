import express from "express";
import { config } from "dotenv";
import routes from "./routes/index.mjs";
import { connect } from "mongoose";
import { error_handler } from "./middlewares/error.mjs";
import cors from "cors";
import bodyParser from "body-parser";
import smtp from "./routes/smtp/index.mjs";
import "./config/passport.js";
import session from "express-session";
import passport from "passport";
config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);
app.use(error_handler);
app.use("/api/contact", smtp);

app.listen(process.env.SERVER_PORT, async () => {
  await connect(process.env.MONGODB_ATLAS_URL);

  // const conn_res = await connect(process.env.MONGODB_ATLAS_URL);
  // console.log(conn_res); // atas bn connect bulgani tekshirish
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
  console.log("Google client ID in passport:", process.env.GOOGLE_CLIENT_ID);
  console.log(
    "Google client SECRET in passport:",
    process.env.GOOGLE_CLIENT_SECRET
  );
});
