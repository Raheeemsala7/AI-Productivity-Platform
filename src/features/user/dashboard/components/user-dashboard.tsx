"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Activity, Clock, Zap, MessageSquare } from 'lucide-react';

export function UserDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back! Here is a summary of your workspace.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credits Remaining</CardTitle>
            <Zap className="h-4 w-4 text-brand" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">160 / 1000</div>
            <p className="text-xs text-muted-foreground">Resets in 12 days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Generations Today</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">4 above average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saved Templates</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Used 3 times today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Saved</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2h</div>
            <p className="text-xs text-muted-foreground">Estimated this week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[
                { action: "Generated 'Marketing Email'", type: "Template", time: "10 mins ago" },
                { action: "Chat with AI Assistant", type: "Chat", time: "1 hour ago" },
                { action: "Summarized Document 'Q3 Report'", type: "Tool", time: "3 hours ago" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center">
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-medium leading-none">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.type}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
          </CardHeader>
          <CardContent>
              <div className="flex flex-col h-full">
                  <div className="text-2xl font-bold mb-2">Professional</div>
                  <p className="text-muted-foreground mb-6">Your plan is active and renews on October 25, 2026.</p>
                  
                  <div className="mt-auto space-y-4">
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-brand w-[84%] rounded-full"></div>
                      </div>
                      <div className="flex justify-between text-sm">
                          <span>840 Credits Used</span>
                          <span className="font-medium text-brand">160 Left</span>
                      </div>
                  </div>
              </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
