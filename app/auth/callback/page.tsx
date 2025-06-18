"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { GitHubAuth } from "@/lib/auth-client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function AuthCallbackPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [error, setError] = useState<string>("")
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const auth = new GitHubAuth(process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || "")
        const session = await auth.handleCallback()

        if (session) {
          auth.setSession(session)
          setStatus("success")

          // Redirect to home page after successful auth
          setTimeout(() => {
            router.push("/")
          }, 2000)
        } else {
          throw new Error("Failed to authenticate")
        }
      } catch (err) {
        setStatus("error")
        setError(err instanceof Error ? err.message : "Authentication failed")
      }
    }

    handleCallback()
  }, [router])

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            {status === "loading" && "Authenticating..."}
            {status === "success" && "Authentication Successful!"}
            {status === "error" && "Authentication Failed"}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          {status === "loading" && (
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Connecting to GitHub...</span>
            </div>
          )}

          {status === "success" && (
            <div className="text-green-600">
              <p>Successfully authenticated with GitHub!</p>
              <p className="text-sm text-gray-500 mt-2">Redirecting you back to Bountr...</p>
            </div>
          )}

          {status === "error" && (
            <div className="text-red-600">
              <p>Failed to authenticate with GitHub.</p>
              <p className="text-sm text-gray-500 mt-2">{error}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
