"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, BarChart, PieChart } from "lucide-react"
import { Line, Bar, Doughnut } from "react-chartjs-2"
import { apiClient, type Portfolio } from "@/lib/api"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
)

export default function PortfolioSummary() {
  const [activeTab, setActiveTab] = useState("overview")
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        setLoading(true)
        const data = await apiClient.getPortfolios()
        setPortfolios(data)
      } catch (err) {
        setError('Failed to fetch portfolio data')
        console.error('Error fetching portfolios:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolios()
  }, [])

  // Fallback data for when API is not available
  const assetAllocation = {
    labels: ["Stocks", "Bonds", "Real Estate", "Gold", "Cash", "Others"],
    datasets: [
      {
        label: "Asset Allocation",
        data: [45, 20, 15, 10, 8, 2],
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  }

  const netWorthHistory = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Net Worth (₹ Lakhs)",
        data: [18.2, 19.5, 20.1, 19.8, 21.2, 22.5, 23.1, 22.8, 23.5, 24.2, 24.8, 24.6],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.3,
        fill: true,
      },
    ],
  }

  const monthlyFlow = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Income",
        data: [1.65, 1.68, 1.7, 1.72, 1.75, 1.78, 1.8, 1.82, 1.85, 1.85, 1.85, 1.85],
        backgroundColor: "rgba(34, 197, 94, 0.6)",
      },
      {
        label: "Expenses",
        data: [0.92, 0.88, 0.95, 0.91, 0.93, 0.97, 0.94, 0.92, 0.96, 0.95, 0.94, 0.95],
        backgroundColor: "rgba(239, 68, 68, 0.6)",
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: "rgba(150, 150, 150, 0.1)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Summary</CardTitle>
          <CardDescription>Loading portfolio data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[300px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Summary</CardTitle>
        <CardDescription>
          {error ? 
            "Using demo data - connect to backend for real portfolio data" : 
            "Overview of your financial portfolio and performance"
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
            <p className="text-sm text-amber-800">
              Backend connection failed. Displaying demo data. Error: {error}
            </p>
          </div>
        )}
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="allocation" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              <span>Allocation</span>
            </TabsTrigger>
            <TabsTrigger value="cashflow" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              <span>Cash Flow</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <div className="h-[300px]">
              <Line data={netWorthHistory} options={chartOptions} />
            </div>
          </TabsContent>

          <TabsContent value="allocation" className="mt-4">
            <div className="h-[300px]">
              <Doughnut
                data={assetAllocation}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "right" as const,
                    },
                  },
                }}
              />
            </div>
          </TabsContent>

          <TabsContent value="cashflow" className="mt-4">
            <div className="h-[300px]">
              <Bar
                data={monthlyFlow}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: "rgba(150, 150, 150, 0.1)",
                      },
                    },
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      position: "top" as const,
                    },
                  },
                }}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

