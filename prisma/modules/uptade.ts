import prisma from "../script";

async function errorHandling(error: any) {
  console.error(error);
  await prisma.$disconnect();
}
export async function deactiveDevice(logid:string) {
  const log = await prisma.logs
    .update({
      where: {
        logId: logid,
      },
      data: {
        active: false,
      },
    })
    .catch(errorHandling);;
    if(!log){
        return null;
    }else{
        return log;
    }
};
export async function tfaTempSecretUpdate(username:string,code:string) {
  await prisma.user
    .update({
      where: {
        username,
      },
      data: {
        twoFactorAuth_secret_temp: code
      },
    })
    .catch(errorHandling);;
}
export async function tfaSecretUpdate(username: string, code: string) {
  await prisma.user
    .update({
      where: {
        username,
      },
      data: {
        twoFactorAuth_secret: code,
        twoFactorAuth: true,
      },
    })
    .catch(errorHandling);;
}
export async function activeDevice(logid:string){
    await prisma.logs
      .update({
        where: {
          logId: logid,
        },
        data: {
          active: true,
          updateAt: new Date(),
        },
      })
      .catch(errorHandling);;
  return true
}