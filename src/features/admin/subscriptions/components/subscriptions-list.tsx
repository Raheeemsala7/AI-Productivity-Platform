"use client"
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table"
import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import { Search, SlidersHorizontal, MoreHorizontal, FileText, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';

const subsData = [
    {
        id: "SUB-1029",
        user: "Alice Smith",
        plan: "Professional",
        status: "active",
        amount: "$39.00/mo",
        nextBilling: "Oct 25, 2026",
    },
    {
        id: "SUB-1030",
        user: "Bob Jones",
        plan: "Enterprise",
        status: "past_due",
        amount: "$299.00/mo",
        nextBilling: "Oct 15, 2026",
    },
    {
        id: "SUB-1031",
        user: "Charlie Brown",
        plan: "Professional",
        status: "active",
        amount: "$39.00/mo",
        nextBilling: "Nov 01, 2026",
    },
    {
        id: "SUB-1032",
        user: "Diana Prince",
        plan: "Basic",
        status: "canceled",
        amount: "$15.00/mo",
        nextBilling: "-",
    }
];

const statusConfig: Record<string, { label: string, icon: any, variant: "default" | "secondary" | "destructive" | "outline" }> = {
    active: { label: "Active", icon: CheckCircle2, variant: "default" },
    past_due: { label: "Past Due", icon: AlertCircle, variant: "destructive" },
    canceled: { label: "Canceled", icon: XCircle, variant: "secondary" },
};

export function SubscriptionsList() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">Subscriptions</h2>
            <p className="text-muted-foreground">
            Manage user subscriptions, billing cycles, and plan statuses.
            </p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline"><SlidersHorizontal className="mr-2 h-4 w-4" /> Filters</Button>
            <Button variant="outline"><FileText className="mr-2 h-4 w-4" /> Export</Button>
        </div>
      </div>

      <Card>
        <CardHeader className="py-4">
          <div className="flex items-center gap-2 max-w-sm border rounded-md px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input type="text" placeholder="Search subscriptions..." className="flex-1 bg-transparent border-none outline-none text-sm" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subscription ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Next Billing</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subsData.map((sub) => {
                  const StatusIcon = statusConfig[sub.status].icon;
                  return (
                    <TableRow key={sub.id}>
                    <TableCell className="font-medium">{sub.id}</TableCell>
                    <TableCell>{sub.user}</TableCell>
                    <TableCell>{sub.plan}</TableCell>
                    <TableCell>{sub.amount}</TableCell>
                    <TableCell>
                        <Badge variant={statusConfig[sub.status].variant} className="flex w-fit items-center gap-1">
                            <StatusIcon className="h-3 w-3" />
                            {statusConfig[sub.status].label}
                        </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{sub.nextBilling}</TableCell>
                    <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </TableCell>
                    </TableRow>
                  )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
