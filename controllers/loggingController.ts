import { Request, Response, NextFunction } from "express";
import * as bcrypt from "bcryptjs";
import * as passport from "passport";
import { body, validationResult } from 'express-validator';
import User from "../models/user";

import * as async from 'async';
import user from "../models/user";

exports.log_register_get = (req: Request, res: Response) => {
  res.render("signup");
};

exports.log_register_post = [

  body("username", "Username required").trim().isLength({ min: 1 }).escape(),
  
  body('email', 'Email required').isEmail().normalizeEmail(),
  
  body('password', 'Password of minimally 8 characters required').trim().isLength({ min: 8 }).escape(),

  body('confirmpassword', 'Password must be the same as above').custom((value, { req }) => value === req.body.password),
  
  (req: Request, res: Response, next: NextFunction) => {

    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("signup", {errors: errors.array()})

    } else {
      // Hashing password
      bcrypt.hash(req.body.password, 10, (err: Error, hashedPassword: string) => {
        if (err) { 
            return next(err);
        }
        // creating user
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            member_since: Date.now(),
            admin: false,
        })

        async.parallel(
          {
            // Check if user with same email already exists
            useremail(callback: any) {
              User.findOne({email:user.email}).exec(callback);
            },
            // Check if User with same username already exists.
            username(callback: any) {
              User.findOne({ name: user.username}).exec(callback);
            }
          },
            (err: Error, results: any ) => {
              if (err) {
                return next(err);
              }
              if (results.useremail) {
                // username already exists.
                res.render("signup", {errors: ['A user with the same email already exists!']});
              } else if (results.username) {
                 // username already exists.
                 res.render("signup", {errors: ['A user with the same username already exists!']});
              } else {
                user.save((err: Error) => {
                  if (err) { 
                    return next(err);
                  }
                res.redirect("/");
              })};
        })
      })
    }
  }
];

exports.log_signin_get = (req: Request, res: Response) => {
    res.render("signin");
};

exports.log_signin_post = (req: Request, res: Response) => {
    passport.authenticate("local", {
      failureRedirect: "/",
      successMessage: "/"
    })
};

exports.log_signout_get = (req: Request, res: Response, next: NextFunction) => {
    req.logout(function (err: Error) {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
};
