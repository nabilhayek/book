import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import client from "./lib/apollo-client";
import { VALIDATE_TOKEN } from "./lib/queries";

const protectedRoutes: string[] = ["/member"];
const authRoutes: string[] = ["/login", "/register"];

export async function middleware(req: NextRequest): Promise<NextResponse | undefined> {
  const currentUser = req.cookies.get("currentUser")?.value;

  if (req.nextUrl.pathname === "/logout") {
    const res = NextResponse.redirect(new URL("/login", req.nextUrl));
    res.cookies.delete("currentUser");
    client.resetStore();

    return res;
  }

  if (!currentUser && protectedRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (currentUser) {
    if (protectedRoutes.includes(req.nextUrl.pathname)) {
      const res = await client.mutate({
        mutation: VALIDATE_TOKEN,
        variables: {
          token: JSON.parse(currentUser).access_token,
        },
      });

      if (!res.data.validateToken.valid) {
        const res = NextResponse.redirect(new URL("/login", req.nextUrl));
        res.cookies.delete("currentUser");
        client.resetStore();

        return res;
      }
    }

    if (authRoutes.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/member", req.nextUrl));
    }
  }
}

export default middleware;
