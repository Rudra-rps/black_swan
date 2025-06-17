"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle } from "lucide-react"
import { Line, Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler)

export default function SimulationResults() {
  const impactData = {
    labels: ["Net Worth", "Liquidity", "Income", "Expenses", "Debt Ratio"],
    datasets: [
      {
        label: "Before",
        data: [100, 100, 100, 100, 100],
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
      {
        label: "After",
        data: [70, 45, 80, 115, 130],
        backgroundColor: "rgba(239, 68, 68, 0.5)",
      },
    ],
  }

  const timelineData = {
    labels: ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6"],
    datasets: [
      {
        label: "Net Worth (₹ Lakhs)",
        data: [24.6, 22.1, 20.5, 19.2, 18.4, 17.2],
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        tension: 0.3,
        fill: true,
      },
    ],
  }

  const affectedAssets = [
    { name: "Equity Mutual Funds", impact: "-35%", value: "₹4,20,000", severity: "high" },
    { name: "Real Estate", impact: "-18%", value: "₹3,60,000", severity: "medium" },
    { name: "Corporate Bonds", impact: "-12%", value: "₹72,000", severity: "medium" },
    { name: "Bank Deposits", impact: "-5%", value: "₹25,000", severity: "low" },
    { name: "Gold", impact: "+8%", value: "+₹32,000", severity: "positive" },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <CardTitle>Simulation Results: Market Crash (-30%)</CardTitle>
        </div>
        <CardDescription>Estimated impact on your financial situation over 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="impact">
          <TabsList className="mb-4">
            <TabsTrigger value="impact">Impact Summary</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="assets">Affected Assets</TabsTrigger>
          </TabsList>

          <TabsContent value="impact">
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Net Worth Impact</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold">-30%</p>
                    <p className="text-sm text-muted-foreground">(-₹7,37,037)</p>
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Survival Period</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold">4.2 months</p>
                    <p className="text-sm text-red-500">Critical</p>
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Recovery Time</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold">3.5 years</p>
                    <p className="text-sm text-muted-foreground">Estimated</p>
                  </div>
                </div>
              </div>

              <div className="h-[350px]">
                <Bar
                  data={impactData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 150,
                        title: {
                          display: true,
                          text: "Percentage (%)",
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
                      tooltip: {
                        callbacks: {
                          label: (context) => `${context.dataset.label}: ${context.raw}%`,
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="timeline">
            <div className="h-[350px]">
              <Line
                data={timelineData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: false,
                      title: {
                        display: true,
                        text: "Net Worth (₹ Lakhs)",
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
                      display: false,
                    },
                  },
                }}
              />
            </div>
          </TabsContent>

          <TabsContent value="assets">
            <div className="space-y-4">
              {affectedAssets.map((asset, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{asset.name}</p>
                    <p className="text-sm text-muted-foreground">Current value: {asset.value}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        asset.severity === "high"
                          ? "destructive"
                          : asset.severity === "medium"
                            ? "default"
                            : asset.severity === "low"
                              ? "outline"
                              : "secondary"
                      }
                      className={asset.severity === "positive" ? "bg-green-500 hover:bg-green-600" : ""}
                    >
                      {asset.impact}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
