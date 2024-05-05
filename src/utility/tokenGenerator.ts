import dotenv from "dotenv";

dotenv.config();

import jwt from "jsonwebtoken";

interface Payload {
  name: string;
  id: string;
}

export default function tokenGenerator(payload: Payload) {
  try {
    const SECRET = process.env.TOKEN_SECRET || "";
    const ACCESS_TOKEN = jwt.sign(payload, SECRET, { expiresIn: "1w" });
    return {
      ACCESS_TOKEN
    };
  } catch (err) {
    console.error(err);
    return { err };
  }
}
