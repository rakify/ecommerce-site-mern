const router = require("express").Router();
const User = require("../models/User");
const cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  req.body.password = cryptojs.AES.encrypt(
    req.body.password,
    process.env.pass_secret
  ).toString();
  try {
    //creating new user
    const newUser = new User(req.body);
    //saving user and response
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("Wrong credentials!");
    const validPassword = cryptojs.AES.decrypt(
      user.password,
      process.env.pass_secret
    ).toString(cryptojs.enc.Utf8);
    console.log(validPassword);

    validPassword !== req.body.password &&
      res.status(401).json("Wrong credentials!");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.jwt_secret,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;

    res
      .status(200)
      .cookie("jwt", accessToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 1 * 3600000),
      })
      .json({ ...others });
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGOUT
router.get("/logout", (req, res) => {
  res.status(200).clearCookie("jwt").json({ logout: true });
});

module.exports = router;
