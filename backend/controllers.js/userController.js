const mongoose = require("mongoose");
const UserSignup = require("../models/userSignupModel");
const UserLogin = require("../models/userLoginModel");

const loginUser = async (req, res) => {
  res.json({ mssg: "user logged in" });
};

const signupUser = async (req, res) => {
  res.json({ mssg: "user signed up" });
};

module.exports = { loginUser, signupUser };
