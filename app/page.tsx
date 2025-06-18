import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GitBranch, DollarSign, Users, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GitBranch className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Bountr</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/bounties" className="text-gray-600 hover:text-gray-900 transition-colors">
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

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Turn GitHub Issues into
            <span className="text-blue-600"> Paid Opportunities</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Connect project maintainers with developers through bounty-driven development. Post feature requests with
            rewards, or claim bounties by contributing code.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-3">
              <DollarSign className="mr-2 h-5 w-5" />
              Browse Bounties
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
              <Zap className="mr-2 h-5 w-5" />
              Post a Bounty
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">How Bountr Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Post Bounties</CardTitle>
                <CardDescription>
                  Create GitHub issues with bounty rewards for features you need developed
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center border-2 hover:border-green-200 transition-colors">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Claim & Develop</CardTitle>
                <CardDescription>
                  Developers can claim bounties and submit pull requests to earn rewards
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center border-2 hover:border-purple-200 transition-colors">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <GitBranch className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>GitHub Native</CardTitle>
                <CardDescription>
                  Everything happens through GitHub issues, PRs, and comments - no external database
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Bounties Preview */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-gray-900">Recent Bounties</h3>
            <Link href="/bounties">
              <Button variant="outline">View All Bounties</Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample bounty cards */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    $500
                  </Badge>
                  <Badge variant="outline">Open</Badge>
                </div>
                <CardTitle className="text-lg">Add Dark Mode Support</CardTitle>
                <CardDescription>
                  Looking for someone to implement dark mode toggle with theme persistence
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <span>react-ui-library</span>
                  <span>•</span>
                  <span>2 days ago</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    $250
                  </Badge>
                  <Badge variant="outline">Open</Badge>
                </div>
                <CardTitle className="text-lg">API Rate Limiting</CardTitle>
                <CardDescription>Implement rate limiting middleware for Express.js API endpoints</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <span>backend-service</span>
                  <span>•</span>
                  <span>1 week ago</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    $150
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    In Progress
                  </Badge>
                </div>
                <CardTitle className="text-lg">Mobile Responsive Fix</CardTitle>
                <CardDescription>Fix mobile layout issues on the dashboard component</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <span>dashboard-app</span>
                  <span>•</span>
                  <span>3 days ago</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="container mx-auto text-center max-w-4xl">
          <h3 className="text-4xl font-bold mb-6">Ready to Get Started?</h3>
          <p className="text-xl mb-8 text-blue-100">
            Join the community of developers and maintainers building the future of open source
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Sign in with GitHub
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <GitBranch className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold text-white">Bountr</span>
              </div>
              <p className="text-sm">Connecting developers through bounty-driven development on GitHub.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/bounties" className="hover:text-white transition-colors">
                    Browse Bounties
                  </Link>
                </li>
                <li>
                  <Link href="/create" className="hover:text-white transition-colors">
                    Post Bounty
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="hover:text-white transition-colors">
                    How it Works
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Community</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Discord
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Twitter
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2024 Bountr. Powered by GitHub Issues and GitHub Pages.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
