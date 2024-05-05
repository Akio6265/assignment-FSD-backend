import { Router, Response } from "express";
import tokenGenerator from "../../utility/tokenGenerator";
import { passwordVerifier } from "../../utility/passwordVerification";
import { getUserByUsername, getLog } from "../../../prisma/modules/get";
import { validationCheck } from "../../middlewares/validationCheck";
import ipAndClientGrabber from "../../middlewares/set_ip_agent";
import { createLog } from "../../../prisma/modules/create";
import { io } from "../../index";
import { authenticator } from "otplib";
import { activeDevice } from "../../../prisma/modules/uptade";
const login = Router();

login.post(
  "/",
  validationCheck,
  ipAndClientGrabber,
  async (req: any, res: Response) => {
    const {data: { username, password,code }} = req.body;
    const user = await getUserByUsername(username);
    if (!user) return res.status(400).json({ message: "User not found" });
          const passwordVerification = passwordVerifier(password, user);
          if (!passwordVerification) {
            return res.status(409).json({ message: "Invalid password" });
          }
    if(!user.admin) {
    if(!code) return res.status(400).json({ message: "Provide 2FA code" });
      const twoFactorAuth_secret = user?.twoFactorAuth_secret;
      if (!twoFactorAuth_secret) {
        return res.status(401).json({message:"No 2fa secret"});
      }
      const verified = authenticator.check(code, twoFactorAuth_secret);
      if (!verified){
        return res.status(401).json({ message: "Invalid code" });
      }
    }
    const tokens = tokenGenerator({
      name: user.username,
      id: user.userId,
    });
    if (!tokens) {
      return res.status(400).json({ message: "Try agin later" });
    }
    const { userAgent, ipAddress } = req.clientInfo;
    const payload = {
      userId: user.userId,
      userAgent
    };
    const existingLog = await getLog(payload);
    if (!existingLog) {
      const LogData = {
        userAgent,
        userId: user.userId,
        ipAddress
      };
      await createLog(LogData);
    }else{
      await activeDevice(existingLog.logId);
    }
    io.emit("userLoggedIn", { message:"New device login" });
    return res
      .status(200)
      .json({ message: `Successfully login as ${user.username}`, tokens });
  }
);
export default login;
