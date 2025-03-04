import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST() {
  // Clear the auth token cookie
  cookies().delete("auth-token")

  // Return success response
  return NextResponse.json({ success: true })
}

