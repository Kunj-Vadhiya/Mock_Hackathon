"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, ArrowLeft, TrendingUp, Award, CheckCircle, ExternalLink } from "lucide-react"
import Link from "next/link"

interface Recommendation {
  name: string
  publisher: string
  hIndex: number
  acceptanceRate: number
  openAccess: boolean
  score: number
  explanation: string
  website: string
  abstract: string
}

export default function RecommendationsPage() {
  const router = useRouter()
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [expandedAbstracts, setExpandedAbstracts] = useState<{ [key: number]: boolean }>({})

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    // Get form data from localStorage
    const formDataStr = localStorage.getItem("recommendationFormData")
    if (!formDataStr) {
      router.push("/dashboard")
      return
    }

    const formData = JSON.parse(formDataStr)

    // Fetch recommendations
    fetchRecommendations(formData)
  }, [router])

  const fetchRecommendations = async (formData: any) => {
    setIsLoading(true)
    
    try {
      console.log("Sending request to backend with data:", formData)
      
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      const data = await response.json()
      console.log("Received response from backend:", data)

      if (data.success && data.recommendations) {
        // Transform backend data to frontend format - TOP 3 ONLY
        const transformedData: Recommendation[] = data.recommendations.slice(0, 3).map((rec: any, index: number) => ({
          name: rec.name || "Unknown Journal",
          publisher: rec.publisher || "Unknown Publisher",
          hIndex: rec.impactFactor || rec.h_index || rec.hIndex || 0,
          acceptanceRate: rec.acceptanceRate || 30,
          openAccess: rec.openAccess || false,
          score: Math.round(rec.score || (100 - index * 10)),
          explanation: rec.explanation || "This journal matches your research area and criteria.",
          website: rec.homepage || rec.website || `https://www.google.com/search?q=${encodeURIComponent(rec.name)}`,
          abstract: rec.abstract || `${rec.name} is a peer-reviewed academic journal that publishes high-quality research articles in its field. The journal maintains rigorous standards for publication and serves as an important venue for disseminating research findings to the scientific community.`
        }))
        
        console.log("Transformed top 3 recommendations:", transformedData)
        setRecommendations(transformedData)
      } else {
        console.error("Backend returned unsuccessful response or no recommendations")
        setRecommendations([])
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error)
      alert(`Failed to fetch recommendations: ${error instanceof Error ? error.message : 'Unknown error'}. Please make sure the backend server is running on port 8000.`)
      setRecommendations([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-emerald-950 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-blue-600/25 to-green-600/25 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      {/* Header */}
      <header className="bg-black/50 backdrop-blur-xl border-b border-emerald-500/20 shadow-2xl sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <BookOpen className="w-8 h-8 text-emerald-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              ResearchHub
            </span>
          </Link>
          <Button
            variant="outline"
            onClick={() => router.push("/dashboard")}
            className="bg-emerald-600/90 border-emerald-500 hover:bg-emerald-500 text-white hover:text-white transition-all shadow-lg hover:shadow-emerald-500/50 font-semibold"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-emerald-200 to-cyan-200 bg-clip-text text-transparent">
            🏆 Top 3 Journal Recommendations
          </h1>
          <p className="text-gray-300 mb-8 text-lg">
            Based on your research paper details, here are your top 3 best matching journals
          </p>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-300 text-lg">Finding the perfect journals for your research...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {recommendations.map((rec, index) => {
                // Define medal colors and badges for top 3
                const getMedalBadge = () => {
                  if (index === 0) {
                    return {
                      badge: '🥇 Best Match',
                      gradientFrom: 'from-amber-500',
                      gradientTo: 'to-yellow-500',
                      borderColor: 'border-amber-500/50',
                      shadowColor: 'shadow-amber-500/30'
                    }
                  } else if (index === 1) {
                    return {
                      badge: '🥈 Second Choice',
                      gradientFrom: 'from-slate-400',
                      gradientTo: 'to-gray-400',
                      borderColor: 'border-slate-400/50',
                      shadowColor: 'shadow-slate-400/30'
                    }
                  } else {
                    return {
                      badge: '🥉 Third Choice',
                      gradientFrom: 'from-orange-600',
                      gradientTo: 'to-amber-700',
                      borderColor: 'border-orange-500/50',
                      shadowColor: 'shadow-orange-500/30'
                    }
                  }
                }
                
                const medal = getMedalBadge()
                
                return (
                <Card
                  key={index}
                  className={`bg-slate-900/90 backdrop-blur-xl border ${medal.borderColor} hover:border-emerald-500/50 transition-all duration-300 hover:shadow-2xl hover:${medal.shadowColor}`}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${medal.gradientFrom} ${medal.gradientTo} text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-3 shadow-lg`}>
                          {medal.badge}
                        </div>
                        <CardTitle className="text-3xl font-bold text-white mb-2">
                          {rec.name}
                        </CardTitle>
                        <p className="text-slate-300 text-base">Published by {rec.publisher}</p>
                      </div>
                      <div className="text-right bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 px-4 py-3 rounded-lg border border-emerald-500/30">
                        <div className="text-sm text-emerald-400 mb-1">Score:</div>
                        <div className="text-3xl font-bold text-emerald-400">{rec.score}/100</div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* H-Index */}
                      <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-400/30 rounded-lg p-4 hover:border-blue-400/60 transition-all">
                        <div className="flex items-center gap-2 text-blue-400 mb-2">
                          <TrendingUp className="w-5 h-5" />
                          <span className="font-semibold text-sm">H-Index</span>
                        </div>
                        <div className="text-3xl font-bold text-white">{rec.hIndex}</div>
                      </div>

                      {/* Accept Rate */}
                      <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-400/30 rounded-lg p-4 hover:border-purple-400/60 transition-all">
                        <div className="flex items-center gap-2 text-purple-400 mb-2">
                          <Award className="w-5 h-5" />
                          <span className="font-semibold text-sm">Accept Rate</span>
                        </div>
                        <div className="text-3xl font-bold text-white">{rec.acceptanceRate}%</div>
                      </div>

                      {/* Open Access */}
                      <div className={`${rec.openAccess ? 'bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-400/30' : 'bg-gradient-to-br from-slate-500/10 to-slate-600/5 border-slate-400/30'} border rounded-lg p-4 hover:${rec.openAccess ? 'border-green-400/60' : 'border-slate-400/60'} transition-all`}>
                        <div className={`flex items-center gap-2 ${rec.openAccess ? 'text-green-400' : 'text-slate-400'} mb-2`}>
                          <CheckCircle className="w-5 h-5" />
                          <span className="font-semibold text-sm">Open Access</span>
                        </div>
                        <div className="text-2xl font-bold text-white">
                          {rec.openAccess ? 'Yes' : 'No'}
                        </div>
                      </div>
                    </div>

                    {/* Explanation */}
                    <div className="bg-gradient-to-br from-amber-500/5 to-orange-500/5 border border-amber-500/20 rounded-lg p-4">
                      <h3 className="font-semibold text-amber-400 mb-2">Why This Journal?</h3>
                      <p className="text-slate-200 leading-relaxed">{rec.explanation}</p>
                    </div>

                    {/* Abstract */}
                    <div className="bg-gradient-to-br from-cyan-500/5 to-blue-500/5 border border-cyan-500/20 rounded-lg p-4">
                      <h3 className="font-semibold text-cyan-400 mb-2">Abstract</h3>
                      <p className="text-slate-200 leading-relaxed">
                        {expandedAbstracts[index] ? (
                          <>
                            {rec.abstract}
                            <button
                              onClick={() => setExpandedAbstracts({ ...expandedAbstracts, [index]: false })}
                              className="ml-2 text-cyan-400 hover:text-cyan-300 font-semibold underline"
                            >
                              Read less
                            </button>
                          </>
                        ) : (
                          <>
                            {rec.abstract.slice(0, 120)}...
                            <button
                              onClick={() => setExpandedAbstracts({ ...expandedAbstracts, [index]: true })}
                              className="ml-2 text-cyan-400 hover:text-cyan-300 font-semibold underline"
                            >
                              Read more
                            </button>
                          </>
                        )}
                      </p>
                    </div>

                    {/* Visit Website Button */}
                    <Link
                      href={rec.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-semibold px-5 py-2.5 rounded-lg transition-all hover:shadow-lg hover:shadow-emerald-500/30"
                    >
                      Visit Journal Website
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </CardContent>
                </Card>
                )
              })}
            </div>
          )}

          {!isLoading && recommendations.length === 0 && (
            <div className="text-center py-20">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-300 text-lg">No recommendations found. Please try again.</p>
              <Button
                onClick={() => router.push("/dashboard")}
                className="mt-6 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white"
              >
                Back to Dashboard
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
