import prisma from "../script";

interface USER {
  username: string;
  password: string;
  salt: string;
  log: Logs
}
interface Logs {
  ipAddress: string;
  userAgent: string;
}
async function errorHandling(error: any) {
  console.error(error);
  await prisma.$disconnect();
}

export async function createUser(data:USER) {
    const {username, password,salt,log:{ipAddress,userAgent}} = data;
 const user = await prisma.user
   .create({
     data: {
       username,
       password,
       salt,
       logs: {
         create: {
           ipAddress,
           userAgent,
           active:true,
         },
       },
     },
   })
   .catch(errorHandling);
   if(!user) return null;
   return user;
}

export async function createLog(data:any) {
  const { userId, ipAddress, userAgent } = data;
 const log = await prisma.logs
   .create({
     data: {
       userId: userId,
       ipAddress,
       userAgent,
       active: true,
     },
   })
   .catch(errorHandling);;
  if(!log) return null;
  return log;
}