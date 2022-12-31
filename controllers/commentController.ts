import { Request, Response, NextFunction } from "express";
import { body, validationResult } from 'express-validator';
import Comment from "../models/comment";

exports.comment_create_post = [
    body("comment", "Please enter a comment").trim().isLength({ min: 1 }).escape(),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render("/", {errors: errors.array()})
        } else {
            const comment = new Comment({
                comment: req.body.comment,
                date: Date.now(),
                user: res.locals.currentUser,
            });
            comment.save((err: Error) => {
                if (err) {
                    return next(err);
                }
                res.redirect('/')
            });
        }
    }
];

exports.comment_delete_post = (req: Request, res: Response) => {
    res.send("NOT IMPLEMENTED: comment delete POST");
};

exports.comment_update_post = (req: Request, res: Response) => {
    res.send("NOT IMPLEMENTED: comment update POST");
};
