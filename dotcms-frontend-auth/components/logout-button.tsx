"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    })
    router.push("/")
    router.refresh()
  }

  return <Button onClick={handleLogout}>Logout</Button>
}

