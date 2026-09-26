"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Activity, Users, CreditCard, TrendingUp, TrendingDown } from 'lucide-react';

export function StatisticsDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Platform Statistics</h2>
        <p className="text-muted-foreground">
          Detailed insights into user activity, revenue, and system usage.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
            { title: "Active Users", value: "8,234", trend: "+12.5%", isUp: true, icon: Users },
            { title: "New Signups", value: "432", trend: "+5.2%", isUp: true, icon: Users },
            { title: "Churn Rate", value: "1.2%", trend: "-0.4%", isUp: true, icon: TrendingDown }, // Low churn is good
            { title: "MRR", value: "$45,231", trend: "+8.1%", isUp: true, icon: CreditCard },
        ].map((stat, i) => (
            <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className={`text-xs ${stat.isUp ? 'text-green-500' : 'text-red-500'} flex items-center mt-1`}>
                        {stat.isUp ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                        {stat.trend} from last month
                    </p>
                </CardContent>
            </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card className="h-[400px] flex flex-col">
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center border-t">
             <div className="text-muted-foreground flex flex-col items-center">
                 <Activity className="h-10 w-10 mb-2 opacity-20" />
                 <span>Line Chart Placeholder</span>
             </div>
          </CardContent>
        </Card>
        <Card className="h-[400px] flex flex-col">
          <CardHeader>
            <CardTitle>User Demographics</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center border-t">
             <div className="text-muted-foreground flex flex-col items-center">
                 <Activity className="h-10 w-10 mb-2 opacity-20" />
                 <span>Pie Chart Placeholder</span>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
