const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//static signup method
userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw new Error("All fields are required");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email is invalid");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw new Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });
  return user;
};

//static login method

userSchema.statics.login = async function(email, password){
  if(!email || !password){
    throw new Error("All fields are required")
  }
  const user = await this.findOne({email})
  if(!user){
    throw new Error("Incorrect email") 
  }
  // const userPassword = await this.findOne({password})
  // console.log(userPassword)
  const match = await bcrypt.compare(password, user.password)
  if(!match){
    throw new Error("Incorrect password")
  }

  return user

}

const model = mongoose.model("User", userSchema);

module.exports = model;
