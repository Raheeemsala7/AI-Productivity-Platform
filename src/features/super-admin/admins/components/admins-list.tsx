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
import { Search, ShieldUser, Plus, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';

const adminsData = [
    { id: "ADM-1", name: "Super Root", email: "root@example.com", role: "Super Admin", status: "active", lastLogin: "Just now" },
    { id: "ADM-2", name: "John Doe", email: "john@example.com", role: "Support Admin", status: "active", lastLogin: "2 hours ago" },
    { id: "ADM-3", name: "Jane Smith", email: "jane@example.com", role: "Billing Admin", status: "active", lastLogin: "1 day ago" },
    { id: "ADM-4", name: "Alex Jones", email: "alex@example.com", role: "Support Admin", status: "inactive", lastLogin: "1 month ago" },
];

export function AdminsList() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">Admins</h2>
            <p className="text-muted-foreground">
            Manage administrative users and their assigned roles.
            </p>
        </div>
        <div className="flex gap-2">
            <Button><Plus className="mr-2 h-4 w-4" /> Add Admin</Button>
        </div>
      </div>

      <Card>
        <CardHeader className="py-4">
          <div className="flex items-center gap-2 max-w-sm border rounded-md px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input type="text" placeholder="Search admins..." className="flex-1 bg-transparent border-none outline-none text-sm" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Admin</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminsData.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell>
                      <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-brand/10 text-brand flex items-center justify-center">
                              <ShieldUser className="h-4 w-4" />
                          </div>
                          <div>
                              <div className="font-medium">{admin.name}</div>
                              <div className="text-xs text-muted-foreground">{admin.email}</div>
                          </div>
                      </div>
                  </TableCell>
                  <TableCell>{admin.role}</TableCell>
                  <TableCell>
                      <Badge variant={admin.status === "active" ? "default" : "secondary"}>
                          {admin.status}
                      </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{admin.lastLogin}</TableCell>
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
