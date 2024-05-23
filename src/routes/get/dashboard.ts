import { Router, Response } from "express";
import { getAllLogsWithUsers, getUserLogs } from "../../../prisma/modules/get";
import authorization from "../../middlewares/autorization";
import dotenv from "dotenv";

dotenv.config();
const dashboard = Router();
interface User {
    username: string;
    logs: Log[];
}
interface Log {
 logId:string,
 updateAt:Date
}
dashboard.get("/", authorization, async (req: any, res: Response) => {
  const {
    userData: { id, name },
  } = req;
  //For admin
  if (name === process.env.ADMIN) {
    const users_data = await getAllLogsWithUsers();
    if (!users_data) return res.json({ message: "No logs found" });
    const logsWithUsername: Log[] = [];
    users_data.forEach((user: User) => {
      user.logs.forEach((log: Log) => {
        const logWithUsername: Log & { username: string } = {
          ...log,
          username: user.username,
        };
        logsWithUsername.push(logWithUsername);
      });
    });
    res.json({ admin: true, admin_data: logsWithUsername, userLogs: false });
    return;
  } else {
    //for regular
    const logs = await getUserLogs(id);
    if (!logs) return res.json({ message: "No logs found" });
    res.json({ userLogs: logs, name });
  }
});

export default dashboard;
