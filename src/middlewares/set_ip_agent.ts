
import { Request, Response, NextFunction } from "express";
interface ClientInfo {
  ipAddress: string;
  userAgent: string;
}
export default function ipAndClientGrabber (req: Request,res: Response,next: NextFunction) {
  const ipAddress = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const userAgent = req.headers["user-agent"];
  const clientInfo: ClientInfo = {
    ipAddress: ipAddress as string,
    userAgent: userAgent as string,
  };
  (req as any).clientInfo = clientInfo;
  next();
};
