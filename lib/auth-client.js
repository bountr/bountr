// Client-side GitHub OAuth authentication for static apps
export class GitHubAuth {
  constructor(clientId) {
    this.clientId = clientId
    this.redirectUri =
      typeof window !== "undefined"
        ? `${window.location.origin}${process.env.NODE_ENV === "production" ? "/Bountr" : ""}/auth/callback`
        : ""
  }

  // Redirect to GitHub OAuth
  signIn() {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      scope: "read:user user:email repo",
      state: this.generateState(),
    })

    // Store state for verification
    if (typeof window !== "undefined") {
      localStorage.setItem("github_oauth_state", params.get("state"))
      window.location.href = `https://github.com/login/oauth/authorize?${params}`
    }
  }

  // Handle OAuth callback
  async handleCallback() {
    if (typeof window === "undefined") return null

    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get("code")
    const state = urlParams.get("state")
    const storedState = localStorage.getItem("github_oauth_state")

    if (!code || !state || state !== storedState) {
      throw new Error("Invalid OAuth callback")
    }

    // Clean up stored state
    localStorage.removeItem("github_oauth_state")

    // Exchange code for token (this would need a serverless function or proxy)
    // For now, we'll simulate this - in production you'd need a backend endpoint
    console.log("OAuth code received:", code)

    // Return mock user data - replace with actual token exchange
    return {
      token: "mock_token",
      user: {
        login: "mockuser",
        name: "Mock User",
        avatar_url: "/placeholder.svg?height=40&width=40",
      },
    }
  }

  // Generate random state for OAuth security
  generateState() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  // Get stored user session
  getSession() {
    if (typeof window === "undefined") return null

    const session = localStorage.getItem("github_session")
    return session ? JSON.parse(session) : null
  }

  // Store user session
  setSession(sessionData) {
    if (typeof window !== "undefined") {
      localStorage.setItem("github_session", JSON.stringify(sessionData))
    }
  }

  // Clear user session
  signOut() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("github_session")
      localStorage.removeItem("github_oauth_state")
    }
  }
}
