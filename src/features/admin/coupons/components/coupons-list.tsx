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
import { Plus, MoreHorizontal, Search, Ticket } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';

const couponsData = [
    {
        id: "CPN-1",
        code: "WELCOME20",
        discount: "20% OFF",
        usage: "145 / 500",
        status: "active",
        expires: "Dec 31, 2026"
    },
    {
        id: "CPN-2",
        code: "SUMMER50",
        discount: "$50 OFF",
        usage: "500 / 500",
        status: "expired",
        expires: "Aug 31, 2026"
    },
    {
        id: "CPN-3",
        code: "VIPONLY",
        discount: "100% OFF",
        usage: "2 / 10",
        status: "active",
        expires: "Never"
    },
];

export function CouponsList() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">Coupons</h2>
            <p className="text-muted-foreground">
            Manage discount codes, track usage, and set expiration limits.
            </p>
        </div>
        <div className="flex gap-2">
            <Button><Plus className="mr-2 h-4 w-4" /> Create Coupon</Button>
        </div>
      </div>

      <Card>
        <CardHeader className="py-4">
          <div className="flex items-center gap-2 max-w-sm border rounded-md px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input type="text" placeholder="Search coupons..." className="flex-1 bg-transparent border-none outline-none text-sm" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {couponsData.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell>
                      <div className="flex items-center gap-2 font-medium">
                          <Ticket className="h-4 w-4 text-brand" />
                          {coupon.code}
                      </div>
                  </TableCell>
                  <TableCell>{coupon.discount}</TableCell>
                  <TableCell>{coupon.usage}</TableCell>
                  <TableCell>
                      <Badge variant={coupon.status === "active" ? "default" : "secondary"}>
                          {coupon.status}
                      </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{coupon.expires}</TableCell>
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
