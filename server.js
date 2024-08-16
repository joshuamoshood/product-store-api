const express = require("express");
const path = require("path");

//load the environment variables from .env
require("dotenv").config();
const bodyParser = require("body-parser");
const connectDB = require("./db/connect");
const cookieParcer = require("cookie-parser");
const cors = require("cors");

const register_login_router = require("./routes/auth");
const productRoutes = require("./routes/products");

const app = express();
app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cookieParcer());

// Set template engine to pug
app.set("view engine", "pug");

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", register_login_router);
//app.use(refreshToken);
// Use routes from products.js
app.use("/products", productRoutes);

// redirect to /products
app.get("/", (req, res) => {
  res.status(200).send(
      "product store api"
  );
});

// 404
app.use((req, res) => {
  res.status(404).send("404 - Page Not Found");
});

let appPort = process.env.APP_PORT || 3001
// Start the server
const main = async () => {
  app.listen(appPort, () => console.log(`Server listening on port ${appPort}`));
  await connectDB();
};
main();
