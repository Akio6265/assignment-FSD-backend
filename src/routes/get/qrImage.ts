import { Router, Response } from "express";
import qrCode from "qrcode";
import { authenticator } from "otplib";
import authorization from "../../middlewares/autorization";
import {  tfaTempSecretUpdate } from "../../../prisma/modules/uptade";

const qrCodeRoute = Router();

export default qrCodeRoute.get('/', authorization ,async (req:any,res:Response)=>{
    const { name:username } = req.userData;
try{

const secret = authenticator.generateSecret();
const uri = authenticator.keyuri(username, "Assignment_1", secret);
const image = await qrCode.toDataURL(uri);
await tfaTempSecretUpdate(username, secret).catch((e) => {
  throw new Error(e);
});
return res.json({data:{image}});
}catch(err){
    res.status(401).json({message:'failed to generate qrcode'})
}
});