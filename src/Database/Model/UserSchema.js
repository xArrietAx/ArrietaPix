import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";
import {SignJWT} from "jose";
import { setCookie } from 'cookies-next';

let UserSchema = new Schema({
  username:{
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar:{
    name: {
      type: String
    },
    id: {
      type: String
    }
  },
  albums: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Album' 
  }],
  photos: [{
      type: String,
      ref: "Photo"
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  TokenJWTResetPassword:{
    type: String,
  },
  sessionAttempts:{
    type: Number
  }
})

UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next()
  try {
    let salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
  } catch (error) {
    throw new Error("Falló el hasheo de contraseña")
  }
})

UserSchema.methods.GenerateToken = async function (req, res) {
const secretKey = new TextEncoder().encode(process.env.KEY_JWT)
  let Token = await new SignJWT({ sub: this._id }).setProtectedHeader({alg: process.env.ALG_JWT}).setExpirationTime("10m").sign(secretKey)
  setCookie('SECRET', Token, { 
    req, 
    res, 
    httpOnly: true,
    expires: new Date(Date.now() + (10 * 60 * 1000)),
    sameSite: "strict",
    secure: !(process.env.MODE === "dev")
  });
};

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
}

UserSchema.path("albums").validate(function(value) {
  return value.length <= 5;
}, 'An user only can to have a 5 albums.');


export let User = models.user || model("user", UserSchema)