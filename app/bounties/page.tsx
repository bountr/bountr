import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GitBranch, Search, DollarSign, Clock, User } from "lucide-react"

export default function BountiesPage() {
  // Mock data - in real app, this would come from GitHub Issues API
  const bounties = [
    {
      id: 1,
      title: "Add Dark Mode Support",
      description:
        "Looking for someone to implement dark mode toggle with theme persistence across the entire application",
      amount: 500,
      status: "open",
      targetRepository: "facebook/react",
      author: "johndoe",
      createdAt: "2 days ago",
      labels: ["enhancement", "ui/ux"],
      applicants: 3,
    },
    {
      id: 2,
      title: "API Rate Limiting Implementation",
      description: "Implement rate limiting middleware for Express.js API endpoints with Redis backend",
      amount: 250,
      status: "open",
      targetRepository: "expressjs/express",
      author: "janesmith",
      createdAt: "1 week ago",
      labels: ["backend", "security"],
      applicants: 1,
    },
    {
      id: 3,
      title: "Mobile Responsive Dashboard Fix",
      description: "Fix mobile layout issues on the dashboard component, ensure proper responsive behavior",
      amount: 150,
      status: "in-progress",
      targetRepository: "twitter/bootstrap",
      author: "devteam",
      createdAt: "3 days ago",
      labels: ["bug", "mobile", "css"],
      applicants: 5,
      assignee: "mobileDev123",
    },
    {
      id: 4,
      title: "Database Migration Tool",
      description: "Create a CLI tool for database schema migrations with rollback support",
      amount: 800,
      status: "open",
      targetRepository: "golang-migrate/migrate",
      author: "dbadmin",
      createdAt: "5 days ago",
      labels: ["cli", "database", "tooling"],
      applicants: 2,
    },
    {
      id: 5,
      title: "OAuth2 Integration",
      description: "Add OAuth2 authentication support for Google, GitHub, and Microsoft providers",
      amount: 600,
      status: "open",
      targetRepository: "panva/node-openid-client",
      author: "securityteam",
      createdAt: "1 day ago",
      labels: ["authentication", "oauth", "security"],
      applicants: 7,
    },
    {
      id: 6,
      title: "Performance Optimization",
      description: "Optimize React component rendering and reduce bundle size by 30%",
      amount: 400,
      status: "completed",
      targetRepository: "facebook/react",
      author: "perfteam",
      createdAt: "2 weeks ago",
      labels: ["performance", "react", "optimization"],
      applicants: 4,
      assignee: "reactExpert",
      completedBy: "reactExpert",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "open":
        return "Open"
      case "in-progress":
        return "In Progress"
      case "completed":
        return "Completed"
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <GitBranch className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Bountr</h1>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/bounties" className="text-blue-600 font-medium">
              Browse Bounties
            </Link>
            <Link href="/create" className="text-gray-600 hover:text-gray-900 transition-colors">
              Post Bounty
            </Link>
            <Button variant="outline" size="sm">
              Sign in with GitHub
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Browse Bounties</h1>
          <p className="text-gray-600 text-lg">
            Discover open bounties and start earning by contributing to open source projects
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg border p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search bounties..." className="pl-10" />
              </div>
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="highest">Highest Bounty</SelectItem>
                <SelectItem value="lowest">Lowest Bounty</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-600">Open Bounties</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {bounties.filter((b) => b.status === "open").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-600">In Progress</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {bounties.filter((b) => b.status === "in-progress").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-600">Completed</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {bounties.filter((b) => b.status === "completed").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-gray-600">Total Value</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ${bounties.reduce((sum, b) => sum + b.amount, 0).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Bounties List */}
        <div className="space-y-4">
          {bounties.map((bounty) => (
            <Card key={bounty.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-800 font-semibold">
                        ${bounty.amount}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(bounty.status)}>
                        {getStatusText(bounty.status)}
                      </Badge>
                      {bounty.labels.map((label) => (
                        <Badge key={label} variant="secondary" className="text-xs">
                          {label}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="text-xl mb-2">
                      <Link href={`/bounties/${bounty.id}`} className="hover:text-blue-600 transition-colors">
                        {bounty.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-base">{bounty.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <GitBranch className="h-4 w-4" />
                      <span>Target: {bounty.targetRepository}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{bounty.author}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{bounty.createdAt}</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    {bounty.status === "in-progress" && bounty.assignee && (
                      <span className="text-blue-600 font-medium">Assigned to {bounty.assignee}</span>
                    )}
                    {bounty.status === "completed" && bounty.completedBy && (
                      <span className="text-green-600 font-medium">Completed by {bounty.completedBy}</span>
                    )}
                    <span className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>
                        {bounty.applicants} applicant{bounty.applicants !== 1 ? "s" : ""}
                      </span>
                    </span>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/bounties/${bounty.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Load More Bounties
          </Button>
        </div>
      </div>
    </div>
  )
}
