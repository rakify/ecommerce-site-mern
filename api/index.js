const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");

//connect to db
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGOOSE IS SUCCESSFULLY CONNECTED!");
  })
  .catch((err) => {
    console.log(err);
  });

//middlewares
//we should use them before routes
app.use(cors());
app.use(express.json());

//routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`BACKEND SERVER IS RUNNING ON ${PORT}`);
});
