// routeslarimiz kelib ulanadi.
import express from "express";
import { config } from "dotenv";
import routes from "./routes/index.mjs";
import { connect } from "mongoose";
import { error_handler } from "./middlewares/error.mjs";
import cors from "cors";
config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);
app.use(error_handler);

app.listen(process.env.SERVER_PORT, async () => {
  await connect(process.env.MONGODB_ATLAS_URL);

  //   const conn_res = await connect(process.env.MONGODB_ATLAS_URL);
  //   console.log(conn_res); // atas bn connect bulgani tekshirish
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});
