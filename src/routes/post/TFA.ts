import { Router, Response } from "express";
import authorization from "../../middlewares/autorization";
import {  getUserByUsername } from "../../../prisma/modules/get";
import { authenticator } from "otplib";
import { tfaSecretUpdate } from "../../../prisma/modules/uptade";

const TwoFacAuth = Router();


export default TwoFacAuth.post("/",authorization, async (req:any,res:Response)=>{
    try{
        const {name:username} = req.userData;
        const {data:{code}} = req.body;
        const user = await getUserByUsername(username);
        const twoFactorAuth_secret = user?.twoFactorAuth_secret_temp;
        if(!twoFactorAuth_secret) {
            throw new Error("No 2fa secret")
        };
        const verified = authenticator.check(code, twoFactorAuth_secret);
        if(!verified) return res.status(401).json({message:"Invalid code"});
        await tfaSecretUpdate(username, twoFactorAuth_secret).catch((e) => {
          throw new Error("Prisma issue");
        });
        res.json({message:"Valid code"})
    }catch(err){
res.status(401).json({ message: "failed to verify qrcode" });
    }
});

