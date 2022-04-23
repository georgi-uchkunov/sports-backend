import express from "express";
import database from "./database/database.js";
import routes from "./routes/index.js";
import path from "path";

import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes.forEach((route) => {
  app[route.method](route.path, route.handler);
});

const dbConnectionString = process.env.DB_URL || "";
const PORT = process.env.PORT || 8080;

database
  .connect(dbConnectionString)
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(
    app.listen(PORT, () => {
      console.log("Server is running on port " + PORT);
    })
  );
