import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // Protect the admin area; the `authorized` callback enforces the rule.
  matcher: ["/admin/:path*"],
};
