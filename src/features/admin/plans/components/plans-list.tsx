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
import { Plus, MoreHorizontal, Check, Edit2 } from 'lucide-react';
import { Card, CardContent } from '@/shared/components/ui/card';

const plansData = [
    {
        id: "PLN-1",
        name: "Free",
        price: "$0",
        billing: "Forever",
        status: "active",
        features: ["100 Credits", "Basic Support", "1 User"],
        popular: false
    },
    {
        id: "PLN-2",
        name: "Professional",
        price: "$39",
        billing: "Monthly",
        status: "active",
        features: ["1000 Credits", "Priority Support", "5 Users", "Advanced Tools"],
        popular: true
    },
    {
        id: "PLN-3",
        name: "Enterprise",
        price: "$299",
        billing: "Monthly",
        status: "active",
        features: ["Unlimited Credits", "24/7 Support", "Unlimited Users", "Custom Integrations", "Dedicated Account Manager"],
        popular: false
    },
];

export function PlansList() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">Plans & Pricing</h2>
            <p className="text-muted-foreground">
            Configure the subscription plans available for your platform.
            </p>
        </div>
        <div className="flex gap-2">
            <Button><Plus className="mr-2 h-4 w-4" /> Create Plan</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plansData.map((plan) => (
            <Card key={plan.id} className={`relative flex flex-col ${plan.popular ? 'border-brand shadow-md' : ''}`}>
                {plan.popular && (
                    <div className="absolute top-0 right-4 transform -translate-y-1/2">
                        <Badge className="bg-brand text-brand-foreground hover:bg-brand/90">Most Popular</Badge>
                    </div>
                )}
                <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold">{plan.name}</h3>
                        <Button variant="ghost" size="icon"><Edit2 className="h-4 w-4" /></Button>
                    </div>
                    <div className="mb-6">
                        <span className="text-4xl font-extrabold">{plan.price}</span>
                        <span className="text-muted-foreground ml-1">/{plan.billing.toLowerCase()}</span>
                    </div>
                    
                    <div className="flex-1">
                        <ul className="space-y-3">
                            {plan.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm">
                                    <Check className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-8 pt-4 border-t flex items-center justify-between">
                        <div className="text-sm font-medium">Status:</div>
                        <Badge variant={plan.status === 'active' ? 'default' : 'secondary'}>{plan.status}</Badge>
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
