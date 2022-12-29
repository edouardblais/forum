import { Request, Response, NextFunction } from "express";

exports.index = (req: Request, res: Response) => {
  res.send("NOT IMPLEMENTED: Site Home Page");
};

exports.community_list = (req: Request, res: Response) => {
  res.send("NOT IMPLEMENTED: communities list");
};

exports.community_detail = (req: Request, res: Response) => {
  res.send(`NOT IMPLEMENTED: community detail: ${req.params.id}`);
};

exports.community_create_get = (req: Request, res: Response) => {
  res.send("NOT IMPLEMENTED: community create GET");
};

exports.community_create_post = (req: Request, res: Response) => {
  res.send("NOT IMPLEMENTED: community create POST");
};

exports.community_delete_get = (req: Request, res: Response) => {
  res.send("NOT IMPLEMENTED: community delete GET");
};

exports.community_delete_post = (req: Request, res: Response) => {
  res.send("NOT IMPLEMENTED: community delete POST");
};
