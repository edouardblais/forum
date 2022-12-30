import { Request, Response, NextFunction } from "express";
import * as bcrypt from "bcryptjs";
import * as passport from "passport";
import User from "../models/user";

exports.log_register_get = (req: Request, res: Response) => {
  res.render("signup");
};

exports.log_register_post = (req: Request, res: Response, next: NextFunction) => {
    bcrypt.hash(req.body.password, 10, (err: Error, hashedPassword: string) => {
        if (err) { 
            return next(err);
        }
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
          }).save((err: Error) => {
            if (err) { 
              return next(err);
            }
            res.redirect("/");
          });
      });
};

exports.log_signin_get = (req: Request, res: Response) => {
    res.render("signin");
};

exports.log_signin_post = (req: Request, res: Response) => {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/"
    });
};

exports.log_signout_get = (req: Request, res: Response, next: NextFunction) => {
    req.logout(function (err: Error) {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
};
