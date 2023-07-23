import "./Connection";
import { imagekit } from "./ImageKit/config";
import { deleteCookie } from "cookies-next";
import nodemailer from "nodemailer";
import { User } from "./Model/UserSchema";
import { Photo } from "./Model/PhotoSchema";
import { Album } from "./Model/AlbumSchema";
import { generateKey } from "@/utils/GenerateKey";
import { verifyToken } from "@/utils/VerifyToken";
import { GetPhotos } from "@/utils/GetPhotos";

export class Authentication {
  
  async SignUp(res, value) {
    try {
      let newUser = new User(value);
      await newUser.save();
      return res.status(200).json({ message: "Account created successfully" });
    } catch (err) {
      console.log(err);
      if (err.code === 11000) {
        return res.status(409).json({ message: "The account already exists" });
      } else {
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  async SignIn(req, res, value) {
    try {
      let user = await this.verifyEmail(
        res,
        value.email,
        "The account doesn't exist"
      );
      let passwordCompared = await user.comparePassword(value.password);
      if (!passwordCompared)
        return res.status(404).json({ message: "The account doesn't exist" });

      await user.GenerateToken(req, res);
      return res.status(200).json({ message: "Welcome :)" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getUser(id) {
    let user = await User.findById(id);
    return user;
  }

  async LogOut(req, res) {
    try {
      deleteCookie("SECRET", {
        req,
        res,
        httpOnly: true,
        expires: new Date(Date.now() + 12 * 60 * 60 * 1000),
        sameSite: "strict",
        secure: !(process.env.MODE === "dev"),
      });
      return res.status(200).json({ message: "Bye :)" });
    } catch (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async deleteAccount(req, res, token) {
    let idsIk = [];
    try {
      let id = await verifyToken(token);
      let user = await this.getUser(id);
      if (user.photos.length === 0 && user.avatar.filesIds.length === 0) {
        await Album.deleteMany({ _id: { $in: user.albums }, owner: user._id });
        await User.findByIdAndDelete(user._id);
        return this.LogOut(req, res);
      }

      let photos = await GetPhotos(user.photos, user._id);
      let IkIds = photos.map(photo => photo.IkId[0]);
      idsIk = idsIk.concat(IkIds, user.avatar.filesIds);

      await imagekit.bulkDeleteFiles(idsIk)
      await Album.deleteMany({_id:{$in: user.albums}, owner: user._id})
      await Photo.deleteMany({_id:{$in: user.photos}, owner: user._id})
      await User.findByIdAndDelete(user._id)

      return this.LogOut(req, res);
  
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async ResetPassword(res, email) {
    try {
      let user = await this.verifyEmail(res, email, "Failed to send email");
      let { key, Token } = await generateKey();
      user.TokenJWTResetPassword = Token;
      await user.save();
      let transport = await nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
          user: "andresarrieta2323@gmail.com",
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      await transport.sendMail(
        {
          from: "andresarrieta2323@gmail.com",
          to: email,
          subject: "!Hello¡ I'm ArrietA",
          text: `Here is your key :) : ${key}
          If you did not request a password reset you can ignore this email.
          `,
        },
        (err) => {
          if (err)
            return res
              .status(500)
              .json({ message: "Failed to send email", err });
          return res
            .status(200)
            .json({ email, message: "we send you a key in your email" });
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async changePassword(req, res, data) {
    try {
      let { Token, newPassword } = data;
      let userId = await verifyToken(Token);
      let user = await this.getUser(userId);
      user.password = newPassword;
      user.TokenJWTResetPassword = null;
      deleteCookie("RESET", {
        req,
        res,
        httpOnly: true,
        expires: new Date(Date.now() + 5 * 60 * 1000),
        sameSite: "strict",
        secure: !(process.env.MODE === "dev"),
      });
      await user.save();
      return res
        .status(200)
        .json({ message: "Your password was successfully changed" });
    } catch (err) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  async verifyEmail(res, email, msg) {
    try {
      let user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: msg });
      return user;
    } catch (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
