// GitHub API utilities for interacting with issues in the platform's own repo
const GITHUB_API_BASE = "https://api.github.com"

// Platform's own repository configuration
const PLATFORM_OWNER = process.env.GITHUB_PLATFORM_OWNER || "Bountr"
const PLATFORM_REPO = process.env.GITHUB_PLATFORM_REPO || "Bountr"

export class GitHubAPI {
  constructor(token) {
    this.token = token
  }

  async request(endpoint, options = {}) {
    const url = `${GITHUB_API_BASE}${endpoint}`
    const response = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    return response.json()
  }

  // Get bounty issues from the platform's own repository
  async getBountyIssues() {
    return this.request(`/repos/${PLATFORM_OWNER}/${PLATFORM_REPO}/issues?labels=bounty&state=open`)
  }

  // Create a new bounty issue in the platform's repository
  async createBountyIssue(bountyData) {
    const issueBody = `
${bountyData.description}

## Target Repository
**Repository**: [${bountyData.targetRepository}](https://github.com/${bountyData.targetRepository})

## Bounty Information
- **Amount**: $${bountyData.amount}
- **Category**: ${bountyData.category}
- **Priority**: ${bountyData.priority}

## Acceptance Criteria
${bountyData.acceptanceCriteria}

## How to Apply
1. Comment on this issue with your application
2. Include your estimated timeline and approach
3. Wait for the bounty poster to review and approve
4. Submit your work as a PR to the target repository
5. Link back to this issue when submitting your PR

---
*This bounty is for work on [${bountyData.targetRepository}](https://github.com/${bountyData.targetRepository}). All applications and discussion happen here in this issue on Bountr.*
    `.trim()

    return this.request(`/repos/${PLATFORM_OWNER}/${PLATFORM_REPO}/issues`, {
      method: "POST",
      body: JSON.stringify({
        title: `[BOUNTY] ${bountyData.title}`,
        body: issueBody,
        labels: ["bounty", bountyData.category, bountyData.priority, ...bountyData.labels],
      }),
    })
  }

  // Get issue comments (applications) from platform repository
  async getIssueComments(issueNumber) {
    return this.request(`/repos/${PLATFORM_OWNER}/${PLATFORM_REPO}/issues/${issueNumber}/comments`)
  }

  // Add comment to issue (application) in platform repository
  async addIssueComment(issueNumber, comment) {
    return this.request(`/repos/${PLATFORM_OWNER}/${PLATFORM_REPO}/issues/${issueNumber}/comments`, {
      method: "POST",
      body: JSON.stringify({ body: comment }),
    })
  }

  // Get user's repositories (for reference only, not for writing)
  async getUserRepos() {
    return this.request("/user/repos?type=all&sort=updated&per_page=100")
  }

  // Validate that a repository exists (read-only check)
  async validateRepository(owner, repo) {
    try {
      await this.request(`/repos/${owner}/${repo}`)
      return true
    } catch (error) {
      return false
    }
  }
}

// Utility functions for parsing bounty data from GitHub issues
export function parseBountyFromIssue(issue) {
  const bountyMatch = issue.body.match(/\*\*Amount\*\*:\s*\$(\d+)/)
  const categoryMatch = issue.body.match(/\*\*Category\*\*:\s*(.+)/)
  const priorityMatch = issue.body.match(/\*\*Priority\*\*:\s*(.+)/)
  const targetRepoMatch = issue.body.match(/\*\*Repository\*\*:\s*\[([^\]]+)\]/)

  return {
    id: issue.number,
    title: issue.title.replace(/^\[BOUNTY\]\s*/, ""), // Remove bounty prefix
    description: issue.body,
    amount: bountyMatch ? Number.parseInt(bountyMatch[1]) : 0,
    category: categoryMatch ? categoryMatch[1].trim() : "general",
    priority: priorityMatch ? priorityMatch[1].trim() : "medium",
    targetRepository: targetRepoMatch ? targetRepoMatch[1] : "unknown/repo",
    status: issue.state === "open" ? "open" : "closed",
    author: issue.user.login,
    authorAvatar: issue.user.avatar_url,
    createdAt: new Date(issue.created_at).toLocaleDateString(),
    updatedAt: new Date(issue.updated_at).toLocaleDateString(),
    labels: issue.labels.map((label) => label.name).filter((name) => name !== "bounty"),
    applicants: issue.comments,
    issueUrl: issue.html_url,
  }
}
