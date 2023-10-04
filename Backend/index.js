// const express = require("express");
// const mongoose = require("mongoose");
// const userModel = require("./models/User.js");

// const app = express();
// require("dotenv").config();
// app.use(express.json());

// const PORT = process.env.PORT || 8000;

// // mongoose to connect
// mongoose.connect("mongodb://127.0.0.1:27017/jmd");

// // GET API
// app.get("/", (req, res) => {
//   res.send("Get api working");
// });

// // post API
// app.post("/post", (req, res) => {
//   userModel
//     .create(req.body)
//     .then((users) => {
//       res.json(users);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });

// // put API
// app.put("/put", (req, res) => {
//   res.send("put api working");
// });

// // patch API
// app.patch("/patch", (req, res) => {
//   res.send("patch api working");
// });

// // delete API
// app.delete("/delete", (req, res) => {
//   res.send("delete api working");
// });

// // listen
// app.listen(PORT, () => {
//   console.log(`Server is running at ${PORT}`);
// });

// Testing

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const { MONGO_URL, PORT } = process.env;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);
