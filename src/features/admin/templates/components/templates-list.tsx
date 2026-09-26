"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { Plus, Search, LayoutTemplate, MoreHorizontal } from 'lucide-react';

const templates = [
    { id: 1, name: "Blog Post Generator", category: "Writing", status: "active", uses: 1240 },
    { id: 2, name: "Email Outreach", category: "Marketing", status: "active", uses: 890 },
    { id: 3, name: "Code Review Assistant", category: "Development", status: "draft", uses: 0 },
    { id: 4, name: "SEO Meta Tags", category: "Marketing", status: "active", uses: 3450 },
];

export function TemplatesList() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">Templates</h2>
            <p className="text-muted-foreground">
            Manage AI templates available to your users.
            </p>
        </div>
        <div className="flex gap-2">
            <Button><Plus className="mr-2 h-4 w-4" /> Create Template</Button>
        </div>
      </div>

      <div className="flex items-center gap-2 max-w-sm border rounded-md px-3 py-2 bg-background">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input type="text" placeholder="Search templates..." className="flex-1 bg-transparent border-none outline-none text-sm" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {templates.map((tpl) => (
            <Card key={tpl.id} className="flex flex-col hover:border-brand/50 transition-colors">
                <CardHeader className="pb-3 flex flex-row justify-between items-start">
                    <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                        <LayoutTemplate className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <Button variant="ghost" size="icon" className="-mr-2 -mt-2"><MoreHorizontal className="h-4 w-4" /></Button>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                    <h3 className="font-semibold text-lg mb-1">{tpl.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{tpl.category}</p>
                    <div className="mt-auto flex items-center justify-between">
                        <Badge variant={tpl.status === "active" ? "default" : "secondary"}>{tpl.status}</Badge>
                        <span className="text-xs text-muted-foreground">{tpl.uses.toLocaleString()} uses</span>
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
