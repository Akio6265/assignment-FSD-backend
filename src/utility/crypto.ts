import crypto from "crypto";

export function hashing(password: string, salt: string) {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
}
export function salting() {
  return crypto.randomBytes(16).toString("hex");
}
