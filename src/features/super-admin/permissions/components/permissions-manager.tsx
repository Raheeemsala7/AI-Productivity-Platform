"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { Plus, KeyRound } from 'lucide-react';

const roles = [
    { 
        id: "ROLE-1", 
        name: "Super Admin", 
        description: "Full system access", 
        isSystem: true,
        permissions: ["All"]
    },
    { 
        id: "ROLE-2", 
        name: "Support Admin", 
        description: "Access to users, subscriptions, and chat.", 
        isSystem: false,
        permissions: ["Users:View", "Users:Edit", "Subscriptions:View", "Chat:Manage"]
    },
    { 
        id: "ROLE-3", 
        name: "Billing Admin", 
        description: "Access to plans, coupons, and statistics.", 
        isSystem: false,
        permissions: ["Plans:Manage", "Coupons:Manage", "Statistics:View"]
    },
];

export function PermissionsManager() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">Permissions</h2>
            <p className="text-muted-foreground">
            Manage roles and their associated system permissions.
            </p>
        </div>
        <div className="flex gap-2">
            <Button><Plus className="mr-2 h-4 w-4" /> Create Role</Button>
        </div>
      </div>

      <div className="grid gap-6">
        {roles.map((role) => (
            <Card key={role.id}>
                <CardHeader className="pb-3 flex flex-row justify-between items-start">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                            <KeyRound className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                            <CardTitle className="text-xl">{role.name}</CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">{role.description}</p>
                        </div>
                    </div>
                    {role.isSystem && <Badge variant="secondary">System Role</Badge>}
                </CardHeader>
                <CardContent>
                    <div className="mt-4">
                        <h4 className="text-sm font-medium mb-3">Assigned Permissions:</h4>
                        <div className="flex flex-wrap gap-2">
                            {role.permissions.map(p => (
                                <Badge key={p} variant="outline" className="bg-background">{p}</Badge>
                            ))}
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <Button variant="outline" disabled={role.isSystem}>Edit Permissions</Button>
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
