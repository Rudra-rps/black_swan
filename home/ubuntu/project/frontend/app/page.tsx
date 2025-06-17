import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, ArrowDown, ArrowUp, TrendingDown, TrendingUp } from "lucide-react"
import SwanRadar from "@/components/swan-radar"
import AlertTimeline from "@/components/alert-timeline"
import PortfolioSummary from "@/components/portfolio-summary"
import NewsSection from "@/components/news-section"

export const metadata: Metadata = {
  title: "Dashboard | Black Swan Sentinel",
}

export default function Dashboard() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, John. Here's your financial risk overview.</p>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        <PortfolioSummary />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Net Worth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">₹24,56,789</div>
                <div className="flex items-center text-sm text-green-500">
                  <ArrowUp className="w-4 h-4 mr-1" />
                  12.5%
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Compared to last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">₹1,85,000</div>
                <div className="flex items-center text-sm text-green-500">
                  <ArrowUp className="w-4 h-4 mr-1" />
                  5.2%
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Compared to last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">₹95,400</div>
                <div className="flex items-center text-sm text-red-500">
                  <ArrowDown className="w-4 h-4 mr-1" />
                  2.1%
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Compared to last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="col-span-1 md:col-span-1">
            <CardHeader>
              <CardTitle>Swan Radar</CardTitle>
              <CardDescription>Visualizing your financial risk exposure</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <SwanRadar />
            </CardContent>
          </Card>

          <Card className="col-span-1 md:col-span-1">
            <CardHeader>
              <CardTitle>Latest Alerts</CardTitle>
              <CardDescription>Recent financial risk notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <AlertTimeline />
            </CardContent>
          </Card>
        </div>

        <NewsSection />
      </div>
    </div>
  )
}

