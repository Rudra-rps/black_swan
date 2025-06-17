"use client"

import { useState, useEffect } from "react"
import { apiClient, type Alert } from "@/lib/api"

export default function AlertTimeline() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true)
        const data = await apiClient.getAlerts()
        setAlerts(data)
      } catch (err) {
        setError('Failed to fetch alerts')
        console.error('Error fetching alerts:', err)
        // Use fallback data
        setAlerts([
          {
            id: '1',
            title: 'Market Volatility Alert',
            message: 'Increased volatility detected in tech sector',
            severity: 'medium',
            category: 'market',
            created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            is_read: false,
          },
          {
            id: '2',
            title: 'Portfolio Rebalancing Needed',
            message: 'Your portfolio allocation has drifted from target',
            severity: 'low',
            category: 'portfolio',
            created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
            is_read: false,
          },
          {
            id: '3',
            title: 'Interest Rate Change',
            message: 'RBI has announced repo rate increase',
            severity: 'high',
            category: 'policy',
            created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            is_read: true,
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchAlerts()
  }, [])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500'
      case 'high':
        return 'bg-orange-500'
      case 'medium':
        return 'bg-yellow-500'
      case 'low':
        return 'bg-blue-500'
      default:
        return 'bg-gray-500'
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) {
      return 'Just now'
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d ago`
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-start space-x-3 animate-pulse">
            <div className="w-3 h-3 bg-gray-300 rounded-full mt-1"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
          <p className="text-sm text-amber-800">
            Backend connection failed. Displaying demo alerts.
          </p>
        </div>
      )}
      
      {alerts.map((alert) => (
        <div key={alert.id} className="flex items-start space-x-3">
          <div className={`w-3 h-3 rounded-full mt-1 ${getSeverityColor(alert.severity)}`}></div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className={`text-sm font-medium ${alert.is_read ? 'text-muted-foreground' : 'text-foreground'}`}>
                {alert.title}
              </p>
              <span className="text-xs text-muted-foreground">
                {formatTimeAgo(alert.created_at)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {alert.message}
            </p>
          </div>
        </div>
      ))}
      
      {alerts.length === 0 && !loading && (
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">No alerts at this time</p>
        </div>
      )}
    </div>
  )
}

