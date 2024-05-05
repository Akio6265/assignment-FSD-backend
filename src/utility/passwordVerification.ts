import { hashing } from "./crypto";

interface USER {
  username: string;
  userId: string;
  password: string;
  salt: string;
}
export function passwordVerifier(EnteredPassword: string, userInfo: USER) {
  const { password, salt } = userInfo;
  const hashedPass = hashing(EnteredPassword, salt);
  return hashedPass === password;
}
