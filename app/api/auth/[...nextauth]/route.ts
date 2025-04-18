import NextAuth from "next-auth";
import { authOptions } from "./authOption";

const handler = NextAuth(authOptions);

export async function GET(request: Request, context: any) {
  return handler(request, context);
}

export async function POST(request: Request, context: any) {
  return handler(request, context);
}
