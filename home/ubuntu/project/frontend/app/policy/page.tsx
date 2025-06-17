import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Building, Landmark, Coins, Banknote, Filter } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "Policy Watch | Black Swan Sentinel",
}

function PolicyCard({
  icon: Icon,
  title,
  summary,
  impact,
  sectors,
  date,
  severity,
}: {
  icon: LucideIcon
  title: string
  summary: string
  impact: string
  sectors: string[]
  date: string
  severity: "high" | "medium" | "low"
}) {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex items-start gap-3">
        <Icon className="h-6 w-6 text-primary mt-0.5" />
        <div className="flex-1">
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{summary}</p>
        </div>
      </div>

      <div className="bg-muted/50 p-3 rounded-md">
        <p className="text-sm font-medium mb-1">Impact on Your Portfolio:</p>
        <p className="text-sm text-muted-foreground">{impact}</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {sectors.map((sector) => (
            <Badge key={sector} variant="outline" className="text-xs">
              {sector}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={severity === "high" ? "destructive" : severity === "medium" ? "default" : "secondary"}>
            {severity === "high" ? "High Impact" : severity === "medium" ? "Medium Impact" : "Low Impact"}
          </Badge>
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>
      </div>
    </div>
  )
}

export default function PolicyWatch() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Policy Watch</h1>
          <p className="text-muted-foreground">
            Track financial regulations and policy changes that may impact your portfolio
          </p>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <CardTitle>Financial Policy Updates</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Filter</span>
              </div>
            </div>
            <CardDescription>Recent regulatory changes and their potential impact on your investments</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="banking">Banking</TabsTrigger>
                <TabsTrigger value="taxation">Taxation</TabsTrigger>
                <TabsTrigger value="markets">Markets</TabsTrigger>
                <TabsTrigger value="crypto">Crypto</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-0 space-y-4">
                <PolicyCard
                  icon={Landmark}
                  title="RBI Increases Repo Rate by 25 bps"
                  summary="The Reserve Bank of India has increased the repo rate by 25 basis points to 5.75%, citing persistent inflationary pressures."
                  impact="Your home loan EMI will increase by approximately ₹1,520 per month. Fixed deposit returns will improve slightly."
                  sectors={["Banking", "Real Estate"]}
                  date="June 15, 2025"
                  severity="high"
                />

                <PolicyCard
                  icon={Building}
                  title="SEBI Tightens Mutual Fund Expense Ratio Rules"
                  summary="SEBI has announced new regulations capping total expense ratios (TER) for equity mutual funds at 2.25%, down from the previous 2.5%."
                  impact="Your annual mutual fund expenses will decrease by approximately ₹2,500, slightly improving long-term returns."
                  sectors={["Mutual Funds", "Asset Management"]}
                  date="June 10, 2025"
                  severity="medium"
                />

                <PolicyCard
                  icon={Coins}
                  title="New Crypto Taxation Framework Announced"
                  summary="The government has introduced a revised taxation framework for cryptocurrency transactions, reducing TDS from 1% to 0.1%."
                  impact="Your crypto transaction costs will decrease, potentially saving you ₹9,000 annually based on your trading volume."
                  sectors={["Cryptocurrency", "Taxation"]}
                  date="June 5, 2025"
                  severity="medium"
                />

                <PolicyCard
                  icon={Banknote}
                  title="Budget 2025: LTCG Tax Rate Increased"
                  summary="The Finance Minister has proposed increasing the Long Term Capital Gains tax rate from 10% to 12.5% for equity investments."
                  impact="Your tax liability on equity investments held for over 1 year will increase by approximately ₹5,000 annually."
                  sectors={["Taxation", "Equity Markets"]}
                  date="May 28, 2025"
                  severity="high"
                />
              </TabsContent>

              <TabsContent value="banking" className="mt-0 space-y-4">
                <PolicyCard
                  icon={Landmark}
                  title="RBI Increases Repo Rate by 25 bps"
                  summary="The Reserve Bank of India has increased the repo rate by 25 basis points to 5.75%, citing persistent inflationary pressures."
                  impact="Your home loan EMI will increase by approximately ₹1,520 per month. Fixed deposit returns will improve slightly."
                  sectors={["Banking", "Real Estate"]}
                  date="June 15, 2025"
                  severity="high"
                />

                <PolicyCard
                  icon={Landmark}
                  title="RBI Introduces New Digital Banking Guidelines"
                  summary="The RBI has released new guidelines for digital banking operations, focusing on enhanced security measures and customer protection."
                  impact="Your bank may implement additional authentication steps for online transactions, improving security but adding friction."
                  sectors={["Banking", "Digital Finance"]}
                  date="May 20, 2025"
                  severity="low"
                />
              </TabsContent>

              <TabsContent value="taxation" className="mt-0 space-y-4">
                <PolicyCard
                  icon={Banknote}
                  title="Budget 2025: LTCG Tax Rate Increased"
                  summary="The Finance Minister has proposed increasing the Long Term Capital Gains tax rate from 10% to 12.5% for equity investments."
                  impact="Your tax liability on equity investments held for over 1 year will increase by approximately ₹5,000 annually."
                  sectors={["Taxation", "Equity Markets"]}
                  date="May 28, 2025"
                  severity="high"
                />

                <PolicyCard
                  icon={Coins}
                  title="New Crypto Taxation Framework Announced"
                  summary="The government has introduced a revised taxation framework for cryptocurrency transactions, reducing TDS from 1% to 0.1%."
                  impact="Your crypto transaction costs will decrease, potentially saving you ₹9,000 annually based on your trading volume."
                  sectors={["Cryptocurrency", "Taxation"]}
                  date="June 5, 2025"
                  severity="medium"
                />
              </TabsContent>

              <TabsContent value="markets" className="mt-0 space-y-4">
                <PolicyCard
                  icon={Building}
                  title="SEBI Tightens Mutual Fund Expense Ratio Rules"
                  summary="SEBI has announced new regulations capping total expense ratios (TER) for equity mutual funds at 2.25%, down from the previous 2.5%."
                  impact="Your annual mutual fund expenses will decrease by approximately ₹2,500, slightly improving long-term returns."
                  sectors={["Mutual Funds", "Asset Management"]}
                  date="June 10, 2025"
                  severity="medium"
                />

                <PolicyCard
                  icon={Building}
                  title="SEBI Revises Circuit Breaker Mechanism"
                  summary="SEBI has revised the market-wide circuit breaker mechanism to trigger at 10%, 15%, and 20% movement in either direction for the NIFTY 50."
                  impact="This may provide better protection against extreme market volatility, reducing potential losses during market crashes."
                  sectors={["Equity Markets", "Trading"]}
                  date="May 15, 2025"
                  severity="low"
                />
              </TabsContent>

              <TabsContent value="crypto" className="mt-0 space-y-4">
                <PolicyCard
                  icon={Coins}
                  title="New Crypto Taxation Framework Announced"
                  summary="The government has introduced a revised taxation framework for cryptocurrency transactions, reducing TDS from 1% to 0.1%."
                  impact="Your crypto transaction costs will decrease, potentially saving you ₹9,000 annually based on your trading volume."
                  sectors={["Cryptocurrency", "Taxation"]}
                  date="June 5, 2025"
                  severity="medium"
                />

                <PolicyCard
                  icon={Coins}
                  title="RBI Announces CBDC Pilot Expansion"
                  summary="The RBI has announced an expansion of its Central Bank Digital Currency (CBDC) pilot to include retail transactions across major cities."
                  impact="This may provide an alternative to cryptocurrency for digital transactions with lower fees and regulatory protection."
                  sectors={["Cryptocurrency", "Digital Finance"]}
                  date="May 8, 2025"
                  severity="low"
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Policy Impact Analysis</CardTitle>
            <CardDescription>How recent policy changes affect your financial situation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Overall Impact</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold">Moderate</p>
                    <p className="text-sm text-amber-500">-1.2%</p>
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Most Affected</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold">Home Loan</p>
                    <p className="text-sm text-red-500">+₹1,520/mo</p>
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Recovery Time</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold">18 months</p>
                    <p className="text-sm text-muted-foreground">Estimated</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


