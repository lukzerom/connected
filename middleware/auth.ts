import config from "config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

type JwtUser = {
  id: string;
};

type JwtPayload = {
  user: JwtUser;
  iat: number;
  exp: number;
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  // Get token from header

  const token = req.header("x-auth-token");

  // Check if there is token

  if (!token) {
    return res.status(401).json({
      msg: "No token, auth denied",
    });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret")) as JwtPayload;

    req.body.user = decoded.user;

    next();
  } catch (err) {
    res.status(401).json({
      msg: "Token is not valid",
    });
  }
};
