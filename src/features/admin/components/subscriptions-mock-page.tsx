import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { CreditCard, BadgeCheck, Clock } from "lucide-react"

export default function SubscriptionsMockPage() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Subscriptions Management</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subscription {i}</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm mt-2">
                <BadgeCheck className="h-4 w-4 mr-2 text-green-500" /> Active Plan
              </div>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Clock className="h-4 w-4 mr-2" /> Renews in 14 days
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
