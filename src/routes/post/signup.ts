//imports
import express, { Router, Response } from "express";
import { createUser } from "../../../prisma/modules/create";
import tokenGenerator from "../../utility/tokenGenerator";
import { getUserByUsername } from "../../../prisma/modules/get";
import { validationCheck } from "../../middlewares/validationCheck";
import ipAndClientGrabber from "../../middlewares/set_ip_agent";
import { hashing, salting } from "../../utility/crypto";
import { io } from "../..";

const signup: Router = express.Router();

signup.post(
  "/",
  validationCheck,
  ipAndClientGrabber,
  async (req: any, res: Response) => {
    const {data: { username: name, password },} = req.body;
    const userExist = await getUserByUsername(name);
    if (userExist){
      return res.status(400).json({ message: "User already exist" });
    }
    const { ipAddress, userAgent } = req.clientInfo;
    const salt: string = salting();
    const mash: string = hashing(password, salt);
    const data = {
      username: name,
      password: mash,
      salt,
      log: {
        ipAddress,
        userAgent,
      },
    };
    const userData: any = await createUser(data);
    if (!userData) {
      return res
        .status(400)
        .json({ message: "Server error, please try again later" });
    }
    const { userId, username } = userData;
    //tokenGenerator(payload) return access token as an object {ACCESS_TOKEN}
    const tokens = tokenGenerator({
      name: username,
      id: userId,
    });
      io.emit("userLoggedIn", { message: "New device login" });
    return res.json({ message: "Account created successfully", tokens });
  }
);

export default signup;
