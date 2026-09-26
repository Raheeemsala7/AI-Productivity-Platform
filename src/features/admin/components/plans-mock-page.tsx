import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Layers, Check } from "lucide-react"

export default function PlansMockPage() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Plans Management</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {["Basic", "Pro", "Enterprise"].map((plan, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{plan} Plan</CardTitle>
              <Layers className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm mt-2">
                <Check className="h-4 w-4 mr-2 text-brand" /> {i + 2} Features included
              </div>
              <div className="font-bold text-xl mt-2">${(i + 1) * 19}/mo</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
