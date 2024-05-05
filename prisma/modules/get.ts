import prisma from "../script";



async function errorHandling(error: any) {
  console.error(error);
  await prisma.$disconnect();
}
export async function getUserByUsername(name: string) {
  const user = await prisma.user
    .findUnique({
      where: {
        username: name,
      },
    })
    .catch(errorHandling);
  if (!user) {
    return null;
  }
  return user;
}
export async function getUserByUserid(id: string) {
  const user = await prisma.user
    .findUnique({
      where: {
        userId: id,
      },
    })
    .catch(errorHandling);
      if (!user) {
        return null;
      }
  return user;
}
export async function getUserLogs(id: string) {
  const logs = await prisma.logs
    .findMany({
      where: {
        userId: id,
      },
      select: {
        userAgent: true,
        active: true,
        updateAt: true,
        logId:true
      }
    })
    .catch(errorHandling);
  if (!logs) {
    return null;
  }
  return logs;
}

export async function getLog(data:any) {
  const { userId, userAgent } = data;
  const existingLog = await prisma.logs
    .findFirst({
      where: {
        userId,
        userAgent,
      },
    })
    .catch(errorHandling);;
  if (!existingLog) return null;
  return existingLog;
}
export async function getAllLogsWithUsers():Promise<any> {
  const existingLog = await prisma.user
    .findMany({
      include: {
        logs: {
          select: {
            logId: true,
            userAgent: true,
            active: true,
            updateAt: true,
          },
        },
      }
    })
    .catch(errorHandling);
  if (!existingLog) return null;
  return existingLog;
}
