import { SignJWT, jwtVerify } from "jose";

import { env } from "../config/env.js";

const secret = new TextEncoder().encode(env.JWT_SECRET);

export const generateAccessToken = async (userId: number) => {
  return new SignJWT({
    sub: userId.toString(),
  })
    .setProtectedHeader({
      alg: "HS256",
      typ: "JWT",
    })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);
};

export const verifyAccessToken = async (token: string) => {
  const { payload } = await jwtVerify(token, secret);

  return payload;
};