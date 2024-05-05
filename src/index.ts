
import express, { Express, Request, Response, NextFunction} from "express";
import signup from "./routes/post/signup";
import login from "./routes/post/login";
import dashboard from "./routes/get/dashboard";
import cors from "cors"
import dotenv from "dotenv";
import signout from "./routes/post/signout";
import qrImage from "./routes/get/qrImage";
import TFA from "./routes/post/TFA";
import { Server } from "socket.io";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin:"*"
}));

app.use("/signup", signup);
app.use("/signout", signout);
app.use("/login", login);
app.use("/dashboard", dashboard);
app.use("/qrImage", qrImage);
app.use("/TFA", TFA);
app.get("/", (req: Request, res: Response) => {
  res.json(
    {message:"Welcome to the api service for assignment given by Mobilicis India Private Limited"}
  );
});

const expressServer = app.listen(port, () => {
  console.log(`[server]: Server is running`);
});

const io = new Server(expressServer, {
  cors: {
    origin: "*",
  },
});
export { io };