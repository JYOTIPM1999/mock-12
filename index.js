const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./model/user.schema");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const port = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  const user = new UserModel({ name, email, password });
  await user.save();
  res.send("User created successfully");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  console.log(user, "user");
  if (!user) {
    return res.send("Invalid Cridentials");
  }
  const token = jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    "SECRET1234",
    {
      expiresIn: "10 mins",
    }
  );
  res.send({ message: "login successfull", token });
});

app.get("/getProfile/:id", async (req, res) => {
  const id = req.params;
  const user = await UserModel.findOne({ id });
  res.send(user);
});

app.post("/calculate", async (req, res) => {
  let { investment, year, interest } = req.body;
  interest = Number(interest);

  let i = 1 + interest / 100;

  let pow = Math.pow(i, year);

  let div = (pow - 1) / (interest / 100);

  let value = Math.ceil(investment * div);

  res.send({
    value,
    investment: investment * year,
    interestAmount: value - investment * year,
  });
});

mongoose
  .connect("mongodb+srv://jyoti:1234@cluster0.dptz3ei.mongodb.net/test")
  .then(() => {
    app.listen(port, () => {
      console.log("http://localhost:8080");
    });
  });
