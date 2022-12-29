import { Request, Response, NextFunction } from "express";

exports.user_detail = (req: Request, res: Response) => {
  res.send(`NOT IMPLEMENTED: user detail: ${req.params.id}`);
};

exports.user_create_get = (req: Request, res: Response) => {
  res.send("NOT IMPLEMENTED: user create GET");
};

exports.user_create_post = (req: Request, res: Response) => {
  res.send("NOT IMPLEMENTED: user create POST");
};

exports.user_delete_get = (req: Request, res: Response) => {
  res.send("NOT IMPLEMENTED: user delete GET");
};

exports.user_delete_post = (req: Request, res: Response) => {
  res.send("NOT IMPLEMENTED: user delete POST");
};
