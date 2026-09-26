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
import { Search, SlidersHorizontal, MoreHorizontal, ShieldUser, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

const usersData = [
    {
        id: "USR-001",
        name: "Alice Smith",
        email: "alice@example.com",
        status: "active",
        subscription: "Professional",
        lastActive: "2 hours ago"
    },
    {
        id: "USR-002",
        name: "Bob Jones",
        email: "bob@example.com",
        status: "inactive",
        subscription: "Free",
        lastActive: "2 days ago"
    },
    {
        id: "USR-003",
        name: "Charlie Brown",
        email: "charlie@example.com",
        status: "active",
        subscription: "Enterprise",
        lastActive: "5 mins ago"
    },
    {
        id: "USR-004",
        name: "Diana Prince",
        email: "diana@example.com",
        status: "active",
        subscription: "Professional",
        lastActive: "1 day ago"
    }
];

export function UsersList() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">Users</h2>
            <p className="text-muted-foreground">
            Manage platform users, view their subscriptions and statuses.
            </p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline"><SlidersHorizontal className="mr-2 h-4 w-4" /> Filters</Button>
            <Button><Plus className="mr-2 h-4 w-4" /> Add User</Button>
        </div>
      </div>

      <Card>
        <CardHeader className="py-4">
          <div className="flex items-center gap-2 max-w-sm border rounded-md px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input type="text" placeholder="Search users by name or email..." className="flex-1 bg-transparent border-none outline-none text-sm" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usersData.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                      <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center">
                              <ShieldUser className="h-4 w-4" />
                          </div>
                          <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-xs text-muted-foreground">{user.email}</div>
                          </div>
                      </div>
                  </TableCell>
                  <TableCell>
                      <Badge variant={user.status === "active" ? "default" : "secondary"}>
                          {user.status}
                      </Badge>
                  </TableCell>
                  <TableCell>{user.subscription}</TableCell>
                  <TableCell className="text-muted-foreground">{user.lastActive}</TableCell>
                  <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                      </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
