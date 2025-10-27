import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export interface AuthPayload {
  userId: string;
  email: string;
  isAdmin?: boolean;
}


export function verifyAuthToken(req: NextRequest): AuthPayload | null {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as AuthPayload;
    return payload;
  } catch {
    return null;
  }
}
