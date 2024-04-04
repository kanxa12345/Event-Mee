const express = require("express");
const userRoute = require("./routes/userRoute");
const showRoute = require("./routes/showRoute");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRoute);
app.use(showRoute);

require("dotenv").config();

const connection = require("./db/connection");
connection();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
