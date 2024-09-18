const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const postModel = require("./todo");
dotenv.config();
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const userModel = require("./user");
const showModel = require("./show");

app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log("error"));

const port = process.env.PORT || 4000;

app.post("/", async (req, res) => {
  const body = req.body;
  try {
    const newUser = new userModel(body);
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    console.log(error);
  }
});
app.get("/", async (req, res) => {
  try {
    const allUsers = await userModel.find();
    res.json(allUsers);
  } catch (error) {
    res.json({ message: "hello world" });
  }
});
app.post("/post", async (req, res) => {
  const body = req.body;
  try {
    const newPost = new postModel(body);
    await newPost.save();
    res.json({ message: "post made successfully" });
  } catch (error) {
    console.log(error);
  }
});
app.get("/post", async (req, res) => {
  const allPost = await postModel
    .find()
    .populate({ path: "creatorId", select: "name" })
    .populate({ path: "names", select: "gender" });
  res.json(allPost);
});
app.post("/create-show", async (req, res) => {
  const newShow = new showModel(req.body);
  try {
    const savedShow = await newShow.save();
    res.json(savedShow);
  } catch (error) {
    console.log(error);
  }
});
app.put("/create-show", async (req, res) => {
  const { itemId, id } = req.body;
  try {
    const updated = await showModel.findByIdAndUpdate(
      itemId,
      { $push: { many: id } },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    console.log(error);
  }
});
app.listen(port, () => {
  console.log("listening now");
});
