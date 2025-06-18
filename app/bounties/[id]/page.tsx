"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { GitBranch, Clock, User, MessageSquare, ExternalLink, Send, Heart, Flag } from "lucide-react"

export default function BountyDetailPage({ params }: { params: { id: string } }) {
  const [newComment, setNewComment] = useState("")

  // Mock data - in real app, this would come from GitHub Issues API
  const bounty = {
    id: Number.parseInt(params.id),
    title: "Add Dark Mode Support",
    description: `Looking for someone to implement dark mode toggle with theme persistence across the entire application.

## Requirements
- Add a theme toggle button in the header
- Implement dark/light theme switching
- Persist theme preference in localStorage
- Update all components to support both themes
- Ensure proper contrast ratios for accessibility

## Technical Details
- Using Tailwind CSS for styling
- React 18 with TypeScript
- Need to support both system preference and manual toggle
- Should work across all existing components

## Acceptance Criteria
- [ ] Theme toggle button is visible and functional
- [ ] All pages/components render correctly in both themes
- [ ] Theme preference persists across browser sessions
- [ ] Respects system theme preference on first visit
- [ ] Passes accessibility contrast requirements`,
    amount: 500,
    status: "open",
    targetRepository: "facebook/react",
    targetRepositoryUrl: "https://github.com/facebook/react",
    author: "johndoe",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    createdAt: "2 days ago",
    updatedAt: "1 day ago",
    labels: ["enhancement", "ui/ux", "accessibility", "react"],
    applicants: 3,
    issueUrl: "https://github.com/Bountr/Bountr/issues/123",
  }

  const comments = [
    {
      id: 1,
      author: "devexpert",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      content:
        "I'm interested in taking on this bounty! I have extensive experience with React and Tailwind CSS. I've implemented similar dark mode features in several projects. Would love to discuss the timeline and any specific design preferences you have.",
      createdAt: "1 day ago",
      isOffer: true,
    },
    {
      id: 2,
      author: "johndoe",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      content:
        "Thanks for your interest @devexpert! The design should follow our existing design system. I can share the Figma files with you. What's your estimated timeline for completion?",
      createdAt: "1 day ago",
      isOffer: false,
    },
    {
      id: 3,
      author: "uispecialist",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      content:
        "I'd also like to submit an offer for this bounty. I specialize in accessibility and have implemented WCAG-compliant dark modes before. I can complete this within 5 days with full testing included.",
      createdAt: "6 hours ago",
      isOffer: true,
    },
  ]

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    // In real app, this would post a comment to the GitHub issue
    console.log("Submitting comment:", newComment)
    setNewComment("")
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

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bounty Header */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className="bg-green-100 text-green-800 font-semibold text-lg px-3 py-1">
                      ${bounty.amount}
                    </Badge>
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      Open
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm">
                      <Flag className="h-4 w-4 mr-1" />
                      Report
                    </Button>
                  </div>
                </div>

                <CardTitle className="text-3xl mb-4">{bounty.title}</CardTitle>

                <div className="flex flex-wrap gap-2 mb-4">
                  {bounty.labels.map((label) => (
                    <Badge key={label} variant="secondary" className="text-sm">
                      {label}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <GitBranch className="h-4 w-4" />
                    <Link href={bounty.targetRepositoryUrl} className="hover:text-blue-600 transition-colors">
                      Target: {bounty.targetRepository}
                    </Link>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{bounty.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>Created {bounty.createdAt}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{bounty.applicants} applicants</span>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed">
                    {bounty.description}
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Comments/Applications */}
            <Card>
              <CardHeader>
                <CardTitle>Applications & Discussion</CardTitle>
                <CardDescription>
                  {comments.length} comment{comments.length !== 1 ? "s" : ""}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {comments.map((comment, index) => (
                  <div key={comment.id}>
                    <div className="flex space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={comment.authorAvatar || "/placeholder.svg"} />
                        <AvatarFallback>{comment.author[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-sm">{comment.author}</span>
                          {comment.isOffer && (
                            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                              Application
                            </Badge>
                          )}
                          <span className="text-xs text-gray-500">{comment.createdAt}</span>
                        </div>
                        <div className="text-sm text-gray-700 leading-relaxed">{comment.content}</div>
                      </div>
                    </div>
                    {index < comments.length - 1 && <Separator className="mt-6" />}
                  </div>
                ))}

                {/* Add Comment Form */}
                <Separator />
                <form onSubmit={handleSubmitComment} className="space-y-4">
                  <div className="flex space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        placeholder="Leave a comment or submit your application..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" disabled={!newComment.trim()}>
                      <Send className="h-4 w-4 mr-2" />
                      Comment
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" size="lg">
                  Apply for Bounty
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={bounty.issueUrl}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View on GitHub
                  </Link>
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Ask Question
                </Button>
              </CardContent>
            </Card>

            {/* Bounty Info */}
            <Card>
              <CardHeader>
                <CardTitle>Bounty Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    Open
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Bounty Amount</span>
                  <span className="font-semibold text-green-600">${bounty.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Applications</span>
                  <span className="font-medium">{bounty.applicants}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Created</span>
                  <span className="text-sm">{bounty.createdAt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Last Updated</span>
                  <span className="text-sm">{bounty.updatedAt}</span>
                </div>
              </CardContent>
            </Card>

            {/* Target Repository Info */}
            <Card>
              <CardHeader>
                <CardTitle>Target Repository</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 mb-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={bounty.authorAvatar || "/placeholder.svg"} />
                    <AvatarFallback>{bounty.targetRepository.split("/")[0][0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{bounty.targetRepository.split("/")[0]}</div>
                    <Link href={bounty.targetRepositoryUrl} className="text-sm text-blue-600 hover:underline">
                      {bounty.targetRepository}
                    </Link>
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={bounty.targetRepositoryUrl}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Target Repository
                  </Link>
                </Button>
                <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-700">
                    <strong>Note:</strong> Submit your pull request to the target repository and reference this bounty
                    issue.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Similar Bounties */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Bounties</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Link href="/bounties/2" className="block p-2 rounded hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">API Rate Limiting</span>
                      <Badge variant="secondary" className="text-xs">
                        $250
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-500">backend-service</div>
                  </Link>
                  <Link href="/bounties/4" className="block p-2 rounded hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Database Migration Tool</span>
                      <Badge variant="secondary" className="text-xs">
                        $800
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-500">db-tools</div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
