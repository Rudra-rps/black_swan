import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SimulationResults from "@/components/simulation-results"

export const metadata: Metadata = {
  title: "Disaster Simulator | Black Swan Sentinel",
}

export default function DisasterSimulator() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Disaster Simulator</h1>
          <p className="text-muted-foreground">Simulate the impact of financial disasters on your portfolio</p>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        <Card>
          <CardHeader>
            <CardTitle>Select Black Swan Event</CardTitle>
            <CardDescription>Choose a predefined scenario or customize your own disaster simulation</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="predefined">
              <TabsList className="mb-4">
                <TabsTrigger value="predefined">Predefined Scenarios</TabsTrigger>
                <TabsTrigger value="custom">Custom Scenario</TabsTrigger>
              </TabsList>

              <TabsContent value="predefined" className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="scenario">Scenario</Label>
                    <Select defaultValue="market-crash">
                      <SelectTrigger id="scenario" className="w-full">
                        <SelectValue placeholder="Select a scenario" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="market-crash">Market Crash (-30%)</SelectItem>
                        <SelectItem value="inflation-spike">Inflation Spike (12%)</SelectItem>
                        <SelectItem value="job-loss">Job Loss (6 months)</SelectItem>
                        <SelectItem value="housing-crash">Housing Market Crash (-25%)</SelectItem>
                        <SelectItem value="currency-devaluation">Currency Devaluation (-20%)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="duration">Duration (months)</Label>
                    <Select defaultValue="6">
                      <SelectTrigger id="duration">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 months</SelectItem>
                        <SelectItem value="6">6 months</SelectItem>
                        <SelectItem value="12">12 months</SelectItem>
                        <SelectItem value="24">24 months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="severity">Severity</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger id="severity">
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mild">Mild</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="severe">Severe</SelectItem>
                        <SelectItem value="extreme">Extreme</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="custom" className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="stock-market">Stock Market Impact</Label>
                      <span className="text-sm">-30%</span>
                    </div>
                    <Slider id="stock-market" defaultValue={[30]} max={100} step={1} className="w-full" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="real-estate">Real Estate Impact</Label>
                      <span className="text-sm">-15%</span>
                    </div>
                    <Slider id="real-estate" defaultValue={[15]} max={100} step={1} className="w-full" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="inflation">Inflation Rate</Label>
                      <span className="text-sm">8%</span>
                    </div>
                    <Slider id="inflation" defaultValue={[8]} max={30} step={0.5} className="w-full" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="interest-rates">Interest Rate Change</Label>
                      <span className="text-sm">+2%</span>
                    </div>
                    <Slider id="interest-rates" defaultValue={[2]} min={-5} max={10} step={0.25} className="w-full" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="income-reduction">Income Reduction</Label>
                      <span className="text-sm">-20%</span>
                    </div>
                    <Slider id="income-reduction" defaultValue={[20]} max={100} step={1} className="w-full" />
                  </div>

                  <div>
                    <Label htmlFor="duration-custom">Duration (months)</Label>
                    <Select defaultValue="6">
                      <SelectTrigger id="duration-custom">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 months</SelectItem>
                        <SelectItem value="6">6 months</SelectItem>
                        <SelectItem value="12">12 months</SelectItem>
                        <SelectItem value="24">24 months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 flex justify-end">
              <Button size="lg" className="w-full sm:w-auto">
                Run Simulation
              </Button>
            </div>
          </CardContent>
        </Card>

        <SimulationResults />
      </div>
    </div>
  )
}
