import { Request, Response, NextFunction } from "express";
import * as bcrypt from "bcryptjs";
import * as passport from "passport";
import { body, validationResult } from 'express-validator';
import User from "../models/user";
import Comment from "../models/comment";
import { formatDistanceToNow, parseJSON, format }from 'date-fns'

import * as async from 'async';
const LocalStrategy = require("passport-local").Strategy;

// Passport functions for authentification controllers

passport.use(
  new LocalStrategy(function verify(username: any, password: any, cb: any) {
    User.findOne({ username: username }, (err: Error, user: any) => {
      if (err) { 
        return cb(err);
      }
      if (!user) {
        return cb(null, false, { message: "Incorrect username" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // passwords match! log user in
          return cb(null, user)
        } else {
          // passwords do not match!
          return cb(null, false, { message: "Incorrect password" })
        }
      })
    });
  })
);

passport.serializeUser(function(user: any, cb) {
  process.nextTick(function() {
    cb(null, user);
  });
});

passport.deserializeUser(function(user:any, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

// home controller

exports.index = (req: Request, res: Response) => {
  Comment.find({})
    .sort({_id: -1})
    .populate("user")
    .exec(function(err:Error, comments_list: any, next: NextFunction) {
      if (err) {
        return next(err);
      }
      const updated_comments_list = comments_list.map((comment:any) => {
        const newdate = formatDistanceToNow(parseJSON(comment.date));
        const newjoineddate = format(parseJSON(comment.user.member_since), 'PPP')
        return comment = {
          comment: comment.comment,
          _id: comment._id,
          date: newdate,
          user: {
            username: comment.user.username,
            member_since: newjoineddate,
          }
        };
      })
      res.render("index", {
        error: err,
        comments: updated_comments_list,
        user: res.locals.currentUser,
      });
    }
  )
};

// authentification controllers

exports.log_register_get = (req: Request, res: Response) => {
  res.render("signup");
};

exports.log_register_post = [

  body("username", "Username required").trim().isLength({ min: 1 }).escape(),
  
  body('email', 'Email required').isEmail().normalizeEmail(),
  
  body('password', 'Password of minimally 8 characters required').trim().isLength({ min: 8 }).escape(),

  body('confirmpassword', 'Passwords are not identical').custom((value, { req }) => value === req.body.password),
  
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
              User.findOne({ username: user.username}).exec(callback);
            }
          },
            (err: Error, results: any ) => {
              if (err) {
                return next(err);
              }
              if (results.useremail) {
                // useremail already exists.
                res.render("signup", {errors: [{msg:'A user with the same email already exists!'}]});
              } else if (results.username) {
                 // username already exists.
                 res.render("signup", {errors: [{msg:'A user with the same username already exists!'}]});
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

exports.log_signin_post = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', 
      function(err, user, info) {
        if (err) { return next(err) }
        if (!user) {
          return res.render('signin', { error: info.message })
        }
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          return res.redirect('/');
        })
      })(req, res, next);
};

exports.log_signout_get = (req: Request, res: Response, next: NextFunction) => {
    req.logout(function (err: Error) {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
};
