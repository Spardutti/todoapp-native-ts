import { TaskModel } from "../models/TaskModel";
import { Request, Response, NextFunction } from "express";

exports.addTask = async (req: Request, res: Response, next: NextFunction) => {
  res.json("Hello");
};
