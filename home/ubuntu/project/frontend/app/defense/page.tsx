import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShieldCheck, Clock, ArrowRight, CheckCircle2, AlertTriangle } from "lucide-react"

export const metadata: Metadata = {
  title: "Defense Playbook | Black Swan Sentinel",
}

export default function DefensePlaybook() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Defense Playbook</h1>
          <p className="text-muted-foreground">AI-generated action plans to protect your financial future</p>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <CardTitle>Your AI Defense Plan</CardTitle>
            </div>
            <CardDescription>
              Personalized recommendations based on your financial situation and risk profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="immediate">
              <TabsList className="mt-2">
                <TabsTrigger value="immediate" className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Immediate Actions</span>
                </TabsTrigger>
                <TabsTrigger value="short-term" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Short-term (30 days)</span>
                </TabsTrigger>
                <TabsTrigger value="long-term" className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Long-term Strategy</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="immediate" className="mt-0 space-y-4">
                <div className="space-y-4">
                  <ActionCard
                    title="Increase Emergency Fund"
                    description="Transfer ₹1,50,000 from your SBI savings account to your emergency fund to reach the 6-month expense target."
                    impact="High"
                    effort="Medium"
                    status="pending"
                  />

                  <ActionCard
                    title="Rebalance Portfolio"
                    description="Reduce tech sector exposure from 32% to 25% by selling ₹70,000 worth of tech mutual funds and reinvesting in defensive sectors."
                    impact="Medium"
                    effort="Low"
                    status="pending"
                  />

                  <ActionCard
                    title="Review Insurance Coverage"
                    description="Your health insurance covers only 60% of potential hospitalization costs. Consider increasing coverage by ₹5,00,000."
                    impact="High"
                    effort="Low"
                    status="pending"
                  />

                  <ActionCard
                    title="Reduce High-Interest Debt"
                    description="Pay off your credit card debt of ₹85,000 using part of your fixed deposit that's earning only 5.5% interest."
                    impact="High"
                    effort="Medium"
                    status="pending"
                  />
                </div>
              </TabsContent>

              <TabsContent value="short-term" className="mt-0 space-y-4">
                <div className="space-y-4">
                  <ActionCard
                    title="Diversify Income Sources"
                    description="Your income is 92% dependent on your primary job. Explore freelance opportunities in your field to create an additional income stream."
                    impact="Medium"
                    effort="High"
                    status="pending"
                  />

                  <ActionCard
                    title="Optimize Tax Strategy"
                    description="You're currently paying ₹12,000 more in taxes than necessary. Schedule a consultation with a tax advisor to optimize your tax planning."
                    impact="Medium"
                    effort="Medium"
                    status="pending"
                  />

                  <ActionCard
                    title="Review Recurring Expenses"
                    description="Your subscription services cost ₹8,500 monthly. Audit and eliminate unused subscriptions to reduce monthly expenses."
                    impact="Low"
                    effort="Low"
                    status="completed"
                  />

                  <ActionCard
                    title="Create a Will and Estate Plan"
                    description="You don't have a formal estate plan. Consult with a legal advisor to create a will and designate beneficiaries for your assets."
                    impact="Medium"
                    effort="Medium"
                    status="pending"
                  />
                </div>
              </TabsContent>

              <TabsContent value="long-term" className="mt-0 space-y-4">
                <div className="space-y-4">
                  <ActionCard
                    title="Increase Retirement Contributions"
                    description="You're currently saving 12% of your income for retirement, below the recommended 15%. Increase your monthly NPS contribution by ₹5,000."
                    impact="High"
                    effort="Low"
                    status="pending"
                  />

                  <ActionCard
                    title="Diversify Internationally"
                    description="Your portfolio is 95% invested in Indian markets. Allocate 20% to international funds to reduce country-specific risk."
                    impact="Medium"
                    effort="Medium"
                    status="pending"
                  />

                  <ActionCard
                    title="Develop Passive Income"
                    description="Invest ₹10,00,000 in dividend-yielding stocks and REITs to create a passive income stream of approximately ₹60,000 annually."
                    impact="High"
                    effort="High"
                    status="pending"
                  />

                  <ActionCard
                    title="Skill Development"
                    description="Invest in courses to enhance your professional skills, increasing your market value and income potential by an estimated 15-20%."
                    impact="Medium"
                    effort="High"
                    status="pending"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Mitigation Progress</CardTitle>
            <CardDescription>Track your progress in implementing defense strategies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">Overall Financial Resilience</p>
                  <p className="text-sm font-medium">65%</p>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "65%" }}></div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">Emergency Preparedness</p>
                    <p className="text-sm font-medium">45%</p>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: "45%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">Portfolio Diversification</p>
                    <p className="text-sm font-medium">72%</p>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: "72%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">Income Security</p>
                    <p className="text-sm font-medium">58%</p>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: "58%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">Debt Management</p>
                    <p className="text-sm font-medium">85%</p>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: "85%" }}></div>
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

function ActionCard({
  title,
  description,
  impact,
  effort,
  status,
}: {
  title: string
  description: string
  impact: "High" | "Medium" | "Low"
  effort: "High" | "Medium" | "Low"
  status: "pending" | "completed"
}) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {status === "completed" ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-amber-500" />
            )}
            <h3 className="font-medium">{title}</h3>
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <Badge variant={impact === "High" ? "default" : impact === "Medium" ? "secondary" : "outline"}>
            {impact} Impact
          </Badge>
          <Badge variant="outline">{effort} Effort</Badge>
        </div>

        {status === "pending" ? (
          <Button variant="outline" size="sm" className="gap-1">
            <span>Take Action</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Badge variant="secondary" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
            Completed
          </Badge>
        )}
      </div>
    </div>
  )
}


