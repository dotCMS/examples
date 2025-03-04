import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import LogoutButton from "@/components/logout-button"

export default function Dashboard() {
  // Check if user is authenticated
  const token = cookies().get("auth-token")

  if (!token) {
    console.log("Dashboard page: No token, redirecting to login")
    redirect("/")
  }

  console.log("Dashboard page: Rendering dashboard")

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Dashboard</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-center mb-6">Welcome to your protected dashboard! You are authenticated.</p>
          <div className="flex justify-center">
            <LogoutButton />
          </div>
        </div>
      </div>
    </main>
  )
}

