import { Request, Response, NextFunction } from "express";

exports.post_create_get = (req: Request, res: Response) => {
    res.send("NOT IMPLEMENTED: post create GET");
};

exports.post_create_post = (req: Request, res: Response) => {
    res.send("NOT IMPLEMENTED: post create POST");
};

exports.post_delete_get = (req: Request, res: Response) => {
    res.send("NOT IMPLEMENTED: post delete GET");
};

exports.post_delete_post = (req: Request, res: Response) => {
    res.send("NOT IMPLEMENTED: post delete POST");
};

exports.post_detail = (req: Request, res: Response) => {
    res.send(`Not implemented: post detail: ${req.params.id}`)
}