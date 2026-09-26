import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Users, Mail, Clock } from "lucide-react"

export default function UsersMockPage() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Users Management</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">User {i}</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm mt-2">
                <Mail className="h-4 w-4 mr-2" /> user{i}@example.com
              </div>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Clock className="h-4 w-4 mr-2" /> Registered 2 days ago
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
