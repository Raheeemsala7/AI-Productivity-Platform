import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { ShieldUser, Key } from "lucide-react"

export default function RolesMockPage() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Roles & Permissions</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {["Admin", "Manager", "User", "Guest"].map((role, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{role} Role</CardTitle>
              <ShieldUser className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm mt-2">
                <Key className="h-4 w-4 mr-2" /> {5 - i} Permissions Assigned
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
