const express = require("express");
const { connectMongoDB } = require("./connection");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const cookieParser = require("cookie-parser");

const path = require("path");
const URL = require("./models/url");
const { restrictTo, checkForAuthentication } = require("./middlewares/auth");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkForAuthentication);
// app.use(express.json())

// CONNECTION

connectMongoDB("mongodb://127.0.0.1:27017/url_shortener")
  .then(() => {
    console.log("MONGODB CONNECTED!");
  })
  .catch((err) => {
    console.log(`ERROR: Setting up MONOG ${err}`);
  });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// ROUTES

app.use("/", staticRoute);
app.use("/url", restrictTo(["NORMAL"]), urlRoute);
app.use("/user", userRoute);

// app.get("/", (req, res) => {
//   res.render("home");
// });

app.listen(9999, (req, res) => {
  console.log("Server is up on PORT:9999");
});
