// import dependencies
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import logger from "morgan";
import routes from "./routes";
import cors from "cors";
import multer from "multer";

// set up dependencies
const upload = multer();
dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(express.static("public"));
app.use(logger("dev"));
app.use(cors());

// set up mongoose
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("Error connecting to database", error);
  });

// set up routes
app.use("/api/", routes);

// populate config from env
const config = {
  HOST: process.env.HOST,
  PORT: process.env.PORT,
};

// run app
app.listen(config.PORT, config.HOST, (error) => {
  if (error) console.log(error);
  else console.log(`Running API at http://${config.HOST}:${config.PORT}`);
});
