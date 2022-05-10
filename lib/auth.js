import { hash, compare } from "bcryptjs";

export async function hashPassword(pwd) {
  const hp = await hash(pwd, 12);
  return hp;
}

export async function verifyPassword(password, hashedPassword) {
  const data = await compare(password, hashedPassword);
  return data;
}
