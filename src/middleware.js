import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const AuthRoutes = ["/login"];

export function middleware(request) {
    const { pathname } = request.nextUrl;

    const accessToken = cookies().get("accessToken")?.value;

    if (!accessToken && !AuthRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};
