import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Call dotCMS authentication API
    const response = await fetch("https://demo.dotcms.com/api/v1/authentication/api-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: email, password }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json({ message: errorData.message || "Authentication failed" }, { status: 401 })
    }

    const data = await response.json()
    
    // Create the response
    const resp = NextResponse.json({ success: true })

    // Set the cookie in the response
    resp.cookies.set({
      name: "auth-token",
      value: data.entity.token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: "strict",
    })

    return resp
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

