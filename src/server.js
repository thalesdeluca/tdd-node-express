const express = require("express");
const cors = require("cors")

require('dotenv').config();
const controllers = require("./controllers");

const app = express();

app.use(cors());

Object.values(controllers).forEach((Controller) => {
  const controller = new Controller();
  app.use(controller.router);
})

app.listen(process.env.NODE_ENV || 5000, () => {
  console.log(`Server is running on port ${process.env.NODE_ENV || 5000}`)
})

