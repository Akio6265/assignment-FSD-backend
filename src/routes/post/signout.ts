import { Router, Response } from "express";
import authorization from "../../middlewares/autorization";
import { deactiveDevice } from "../../../prisma/modules/uptade";
import { io } from "../../index";
const signout = Router();

export default signout.post("/", authorization ,async (req,res)=>{
const {data:{log}} =  req.body;
 const Deactivatedlog = await deactiveDevice(log.logId);
 if(!Deactivatedlog) {
   return res.status(400)
}
 io.emit("userSignOut",{message:"user logout from a device"});
 res.status(200).json({ message: "log out successful", data: {userAgent:Deactivatedlog.userAgent} });
});