import { Router } from "express";
import { Request, Response, NextFunction } from "express";

let router = Router();

/* GET home page. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.json("home");
});

export { router };
