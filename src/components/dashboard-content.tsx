"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { BookOpen, LogOut, Sparkles, TrendingUp, Unlock, Zap } from "lucide-react"

interface Recommendation {
  name: string
  impactFactor: number
  acceptanceRate: number
  openAccess: boolean
  explanation: string
}

export function DashboardContent() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [formData, setFormData] = useState({
    subjectArea: "",
    title: "",
    abstract: "",
  })
  const [acceptanceRange, setAcceptanceRange] = useState([0, 100])
  const [openAccess, setOpenAccess] = useState(true)
  const [rangeError, setRangeError] = useState("")

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.subjectArea || !formData.title || !formData.abstract) {
      return
    }

    if (rangeError) {
      return
    }

    // Store form data in localStorage to pass to results page
    localStorage.setItem("recommendationFormData", JSON.stringify({
      ...formData,
      accPercentFrom: acceptanceRange[0],
      accPercentTo: acceptanceRange[1],
      openAccess,
    }))

    // Navigate to results page
    router.push("/recommendations")
  }

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-emerald-950 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-blue-600/25 to-green-600/25 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-40 left-1/4 w-72 h-72 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <header className="bg-black/50 backdrop-blur-xl border-b border-emerald-500/20 shadow-2xl relative z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 group">
            <div className="relative">
              <BookOpen className="h-8 w-8 text-cyan-400 transition-transform group-hover:scale-110 group-hover:rotate-12 duration-300" />
              <div className="absolute inset-0 bg-cyan-400/30 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI Journal Recommender
            </h1>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="hover:scale-105 transition-transform duration-200 hover:shadow-lg bg-white/5 border-white/20 text-white hover:bg-white/10"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="flex relative z-10">
        <aside className="w-80 flex-shrink-0 min-h-[calc(100vh-80px)] border-r border-emerald-500/20 bg-black/50 backdrop-blur-xl shadow-2xl sticky top-0">
          <div className="p-6">
            <Card className="border-2 border-white/10 bg-slate-800/50 backdrop-blur-sm shadow-xl">
              <CardHeader className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-b border-white/10">
                <CardTitle className="text-lg flex items-center gap-2 text-white">
                  <Zap className="h-5 w-5 text-cyan-400 animate-pulse" />
                  Filters
                </CardTitle>
                <CardDescription className="text-slate-300">Refine your search criteria</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-4 p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 hover:from-blue-500/20 hover:to-cyan-500/20 transition-all duration-300 hover:shadow-lg border border-white/10">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-cyan-400" />
                    <Label className="font-semibold text-base text-white">Acceptance Rate</Label>
                  </div>
                  <div className="space-y-4">
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={acceptanceRange}
                      onValueChange={(value) => {
                        setAcceptanceRange(value)
                        if (value[1] < value[0]) {
                          setRangeError("Max % cannot be less than Min %")
                        } else {
                          setRangeError("")
                        }
                      }}
                      className="w-full"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs text-slate-400">Min %</Label>
                        <Input
                          type="number"
                          min={0}
                          max={100}
                          value={acceptanceRange[0]}
                          onChange={(e) => {
                            const val = Math.min(100, Math.max(0, Number(e.target.value)))
                            if (val > acceptanceRange[1]) {
                              setRangeError("Min % cannot be greater than Max %")
                            } else {
                              setRangeError("")
                            }
                            setAcceptanceRange([val, acceptanceRange[1]])
                          }}
                          className="h-9 text-center font-semibold transition-all hover:scale-105 focus:scale-105 bg-slate-900/50 border-white/20 text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-slate-400">Max %</Label>
                        <Input
                          type="number"
                          min={0}
                          max={100}
                          value={acceptanceRange[1]}
                          onChange={(e) => {
                            const val = Math.min(100, Math.max(0, Number(e.target.value)))
                            if (val < acceptanceRange[0]) {
                              setRangeError("Max % cannot be less than Min %")
                            } else {
                              setRangeError("")
                            }
                            setAcceptanceRange([acceptanceRange[0], val])
                          }}
                          className="h-9 text-center font-semibold transition-all hover:scale-105 focus:scale-105 bg-slate-900/50 border-white/20 text-white"
                        />
                      </div>
                    </div>
                    {rangeError && (
                      <div className="text-red-400 text-sm font-medium bg-red-500/10 border border-red-500/30 rounded-md p-2 animate-in fade-in slide-in-from-top-2">
                        {rangeError}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3 p-4 rounded-lg bg-gradient-to-br from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20 transition-all duration-300 hover:shadow-lg border border-white/10">
                  <div className="flex items-center gap-2">
                    <Unlock className="h-5 w-5 text-emerald-400" />
                    <Label className="font-semibold text-base text-white">Do you want Open Access?</Label>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-md bg-slate-900/50 hover:bg-slate-900/70 transition-colors border border-white/10">
                    <span className="text-sm font-medium text-white">{openAccess ? "Yes" : "No"}</span>
                    <Switch
                      checked={openAccess}
                      onCheckedChange={setOpenAccess}
                      className="data-[state=checked]:bg-emerald-500"
                    />
                  </div>
                  <p className="text-xs text-slate-400">Filter journals that offer open access publishing</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto min-h-[calc(100vh-80px)]">
          <div className="max-w-5xl mx-auto px-8 py-8">
            <div className="space-y-8">
              <Card className="border-2 border-white/10 hover:shadow-2xl transition-all duration-300 bg-slate-800/50 backdrop-blur-sm shadow-xl hover:border-cyan-500/30">
                <CardHeader className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-b border-white/10">
                  <CardTitle className="flex items-center gap-2 text-xl text-white">
                    <Sparkles className="h-6 w-6 text-purple-400 animate-pulse" />
                    Submit Your Research
                  </CardTitle>
                  <CardDescription className="text-base text-slate-300">
                    Provide details about your research to get AI-powered journal recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-8">
                      {/* Left column */}
                      <div className="space-y-5">
                        <div className="space-y-2">
                          <Label htmlFor="subjectArea" className="text-base font-semibold text-white">
                            Subject Area <span className="text-red-400">*</span>
                          </Label>
                          <Input
                            id="subjectArea"
                            placeholder="e.g., Artificial Intelligence, Machine Learning"
                            value={formData.subjectArea}
                            onChange={(e) => setFormData({ ...formData, subjectArea: e.target.value })}
                            required
                            className="h-11 transition-all duration-200 focus:scale-[1.02] focus:shadow-lg bg-slate-900/50 border-white/20 text-white placeholder:text-slate-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="title" className="text-base font-semibold text-white">
                            Research Title <span className="text-red-400">*</span>
                          </Label>
                          <Input
                            id="title"
                            placeholder="Enter your research paper title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                            className="h-11 transition-all duration-200 focus:scale-[1.02] focus:shadow-lg bg-slate-900/50 border-white/20 text-white placeholder:text-slate-500"
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full h-12 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 text-white font-semibold text-base shadow-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed border-0"
                          disabled={isLoading || !formData.subjectArea || !formData.title || !formData.abstract}
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            {isLoading ? (
                              <>
                                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Analyzing Your Research...
                              </>
                            ) : (
                              <>
                                <Sparkles className="h-5 w-5" />
                                Get AI Recommendations
                              </>
                            )}
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Button>
                      </div>

                      {/* Right column - Abstract */}
                      <div className="space-y-2">
                        <Label htmlFor="abstract" className="text-base font-semibold text-white">
                          Abstract <span className="text-red-400">*</span>
                        </Label>
                        <Textarea
                          id="abstract"
                          placeholder="Paste your research abstract here..."
                          value={formData.abstract}
                          onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                          required
                          className="resize-none transition-all duration-200 focus:scale-[1.01] focus:shadow-lg min-h-[280px] bg-slate-900/50 border-white/20 text-white placeholder:text-slate-500"
                        />
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {recommendations.length > 0 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    AI Recommendations
                  </h2>
                  <div className="grid gap-4">
                    {recommendations.map((journal, index) => (
                      <Card
                        key={index}
                        className="hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1 border-2 border-white/10 bg-slate-800/50 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 hover:border-cyan-500/30"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <CardTitle className="text-xl text-cyan-400 hover:text-purple-400 transition-colors">
                                {journal.name}
                              </CardTitle>
                              <div className="flex flex-wrap gap-3 mt-3 text-sm">
                                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 font-medium border border-blue-500/30">
                                  <TrendingUp className="h-4 w-4" />
                                  IF: {journal.impactFactor}
                                </span>
                                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 font-medium border border-purple-500/30">
                                  Acceptance: {journal.acceptanceRate}%
                                </span>
                                {journal.openAccess && (
                                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-medium border border-emerald-500/30">
                                    <Unlock className="h-4 w-4" />
                                    Open Access
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="bg-gradient-to-br from-cyan-500 to-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shadow-lg hover:scale-110 transition-transform duration-300">
                              {index + 1}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-slate-300 leading-relaxed">{journal.explanation}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
