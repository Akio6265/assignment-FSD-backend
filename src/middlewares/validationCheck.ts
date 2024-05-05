import { Response, Request, NextFunction } from "express";
import { stringChecker } from "../utility/stringChecker";

export function validationCheck(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {
    data: { username, password },
  } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide username and password" });
  }
  //stringChecker(string) will return true if string contains any forbidden symbol or forbidden string else it will return false
  if (stringChecker(username)) {
    res.status(400).json({ message: "Try other username" });
  } else if (stringChecker(password)) {
    res.status(400).json({ message: "Try other password" });
  } else {
    next();
  }
}
