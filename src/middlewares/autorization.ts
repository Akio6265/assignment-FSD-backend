import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getLog } from "../../prisma/modules/get";
const SECRET = process.env.TOKEN_SECRET || "";
dotenv.config();

 function authorization (req:any, res:Response, next:NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
const message= "Unauthorized";
if (!token) return res.status(401).json({message});
jwt.verify(token, SECRET, async (err:any, userData:any) => {
  if (err) return res.status(403).json({ message });
  const userAgent = req.headers["user-agent"];
  const payload = {
    userId: userData.id,
    userAgent,
  };
  const existingLog = await getLog(payload);
  if(existingLog?.active === false) {
    return res.status(403).json({ message });
  }
    req.userData = userData;
    next();
  });
}
 
export default authorization;