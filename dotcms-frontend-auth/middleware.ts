import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the path of the request
  const path = request.nextUrl.pathname

  // Define which paths are protected
  const isProtectedPath = path.startsWith("/dashboard")

  // Get the token from the cookies
  const token = request.cookies.get("auth-token")?.value

  console.log(`Middleware: Path=${path}, Token=${token ? "exists" : "missing"}`)

  // If the path is protected and there's no token, redirect to login
  if (isProtectedPath && !token) {
    console.log("Middleware: Redirecting to login page")
    return NextResponse.redirect(new URL("/", request.url))
  }

  // If the path is login and there's a token, redirect to dashboard
  if (path === "/" && token) {
    console.log("Middleware: Redirecting to dashboard")
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: ["/", "/dashboard/:path*"],
}

