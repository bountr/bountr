"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { GitBranch, DollarSign, Plus, X, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function CreateBountyPage() {
  const [formData, setFormData] = useState({
    targetRepository: "",
    title: "",
    description: "",
    amount: "",
    priority: "medium",
    category: "",
    acceptanceCriteria: "",
    deadline: "",
  })

  const [labels, setLabels] = useState<string[]>([])
  const [newLabel, setNewLabel] = useState("")

  const addLabel = () => {
    if (newLabel.trim() && !labels.includes(newLabel.trim())) {
      setLabels([...labels, newLabel.trim()])
      setNewLabel("")
    }
  }

  const removeLabel = (labelToRemove: string) => {
    setLabels(labels.filter((label) => label !== labelToRemove))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would create a GitHub issue with the bounty data
    console.log("Creating bounty:", { ...formData, labels })
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
            <Link href="/create" className="text-blue-600 font-medium">
              Post Bounty
            </Link>
            <Button variant="outline" size="sm">
              Sign in with GitHub
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Create a New Bounty</h1>
          <p className="text-gray-600 text-lg">
            Post a feature request or bug fix with a bounty reward to attract developers
          </p>
        </div>

        {/* Info Alert */}
        <Alert className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Your bounty will be created as a GitHub issue in your repository with special labels to identify it as a
            bounty. Make sure you have write access to the repository you're posting to.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Target Repository */}
          <Card>
            <CardHeader>
              <CardTitle>Target Repository</CardTitle>
              <CardDescription>
                Specify the GitHub repository where you want the work to be done. The bounty will be posted in our
                platform's repository, but will reference this target repo.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="targetRepository">Target Repository (owner/repo)</Label>
                <Input
                  id="targetRepository"
                  placeholder="e.g., facebook/react or your-username/your-project"
                  value={formData.targetRepository}
                  onChange={(e) => setFormData({ ...formData, targetRepository: e.target.value })}
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  This is the repository where developers will submit their pull requests
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Bounty Details */}
          <Card>
            <CardHeader>
              <CardTitle>Bounty Details</CardTitle>
              <CardDescription>Provide clear information about what you need developed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Add dark mode support to dashboard"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide a detailed description of what needs to be implemented..."
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="frontend">Frontend</SelectItem>
                      <SelectItem value="backend">Backend</SelectItem>
                      <SelectItem value="fullstack">Full Stack</SelectItem>
                      <SelectItem value="mobile">Mobile</SelectItem>
                      <SelectItem value="devops">DevOps</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="documentation">Documentation</SelectItem>
                      <SelectItem value="testing">Testing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => setFormData({ ...formData, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="acceptance-criteria">Acceptance Criteria</Label>
                <Textarea
                  id="acceptance-criteria"
                  placeholder="List the specific requirements that must be met for the bounty to be considered complete..."
                  rows={4}
                  value={formData.acceptanceCriteria}
                  onChange={(e) => setFormData({ ...formData, acceptanceCriteria: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Labels */}
          <Card>
            <CardHeader>
              <CardTitle>Labels</CardTitle>
              <CardDescription>Add labels to help categorize your bounty</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Add a label..."
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addLabel())}
                />
                <Button type="button" onClick={addLabel} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {labels.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {labels.map((label) => (
                    <Badge key={label} variant="secondary" className="flex items-center space-x-1">
                      <span>{label}</span>
                      <button type="button" onClick={() => removeLabel(label)} className="ml-1 hover:text-red-600">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Bounty Amount & Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Bounty Amount & Timeline</CardTitle>
              <CardDescription>Set the reward amount and optional deadline</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="amount">Bounty Amount (USD)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="amount"
                      type="number"
                      placeholder="500"
                      className="pl-10"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="deadline">Deadline (Optional)</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>This is how your bounty will appear to developers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 bg-white">
                <div className="flex items-center space-x-3 mb-3">
                  <Badge variant="secondary" className="bg-green-100 text-green-800 font-semibold">
                    ${formData.amount || "0"}
                  </Badge>
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    Open
                  </Badge>
                  {formData.category && (
                    <Badge variant="secondary" className="text-xs">
                      {formData.category}
                    </Badge>
                  )}
                  {labels.map((label) => (
                    <Badge key={label} variant="secondary" className="text-xs">
                      {label}
                    </Badge>
                  ))}
                </div>
                <h3 className="text-lg font-semibold mb-2">{formData.title || "Your bounty title will appear here"}</h3>
                <p className="text-gray-600 mb-3">
                  {formData.description || "Your bounty description will appear here"}
                </p>
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <span>Target: {formData.targetRepository || "owner/repository"}</span>
                  <span>•</span>
                  <span>just now</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex space-x-4">
            <Button type="submit" size="lg" className="flex-1">
              Create Bounty
            </Button>
            <Button type="button" variant="outline" size="lg" asChild>
              <Link href="/bounties">Cancel</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
