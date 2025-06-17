"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, TrendingDown, TrendingUp } from "lucide-react"
import { apiClient, type NewsItem } from "@/lib/api"

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        const data = await apiClient.getNews(3) // Get latest 3 news items
        setNews(data)
      } catch (err) {
        setError('Failed to fetch news')
        console.error('Error fetching news:', err)
        // Use fallback data
        setNews([
          {
            id: '1',
            title: 'RBI Raises Interest Rates by 25 bps',
            summary: 'The Reserve Bank of India has increased the repo rate by 25 basis points to 5.75%, potentially affecting your home loan and fixed deposits.',
            content: '',
            source: 'RBI',
            url: '#',
            published_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            impact_score: 8.5,
            categories: ['Banking', 'Policy'],
          },
          {
            id: '2',
            title: 'Tech Stocks Down 3% on Regulatory Concerns',
            summary: 'Technology sector experiencing a selloff due to new regulatory proposals. Your portfolio has a 15% exposure to this sector.',
            content: '',
            source: 'Market Watch',
            url: '#',
            published_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
            impact_score: 6.2,
            categories: ['Technology', 'Markets'],
          },
          {
            id: '3',
            title: 'Gold Prices Rally Amid Global Uncertainty',
            summary: 'Gold prices have increased by 2% today as investors seek safe-haven assets. Your portfolio has a 7% allocation to gold.',
            content: '',
            source: 'Commodity News',
            url: '#',
            published_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            impact_score: 4.8,
            categories: ['Commodities', 'Gold'],
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  const getImpactIcon = (score: number) => {
    if (score >= 7) return AlertCircle
    if (score >= 5) return TrendingDown
    return TrendingUp
  }

  const getImpactColor = (score: number) => {
    if (score >= 7) return 'text-amber-500'
    if (score >= 5) return 'text-red-500'
    return 'text-green-500'
  }

  const getImpactLabel = (score: number) => {
    if (score >= 7) return 'High Impact'
    if (score >= 5) return 'Medium Impact'
    return 'Positive Impact'
  }

  const getImpactBadgeColor = (score: number) => {
    if (score >= 7) return 'bg-amber-500/10 text-amber-500'
    if (score >= 5) return 'bg-red-500/10 text-red-500'
    return 'bg-green-500/10 text-green-500'
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) {
      return 'Just now'
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Market News</CardTitle>
          <CardDescription>Loading latest financial news...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start space-x-4 p-4 rounded-lg border animate-pulse">
                <div className="w-6 h-6 bg-gray-300 rounded mt-0.5"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-300 rounded w-full"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market News</CardTitle>
        <CardDescription>
          {error ? 
            "Backend connection failed - showing demo news" : 
            "Latest financial news that may impact your portfolio"
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
            <p className="text-sm text-amber-800">
              Backend connection failed. Displaying demo news.
            </p>
          </div>
        )}
        
        <div className="space-y-4">
          {news.map((item) => {
            const ImpactIcon = getImpactIcon(item.impact_score)
            return (
              <div key={item.id} className="flex items-start space-x-4 p-4 rounded-lg border">
                <ImpactIcon className={`w-6 h-6 mt-0.5 ${getImpactColor(item.impact_score)}`} />
                <div>
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.summary}
                  </p>
                  <div className="flex items-center mt-2">
                    <span className={`text-xs px-2 py-1 rounded ${getImpactBadgeColor(item.impact_score)}`}>
                      {getImpactLabel(item.impact_score)}
                    </span>
                    <span className="text-xs text-muted-foreground ml-3">
                      {formatTimeAgo(item.published_at)}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
          
          {news.length === 0 && !loading && (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">No news available at this time</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

