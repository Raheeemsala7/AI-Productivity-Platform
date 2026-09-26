"use client"
import React from 'react';
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { Building, Settings, Link as LinkIcon, Power } from 'lucide-react';
import { useTranslations } from 'next-intl';

const providers = [
    { id: 1, name: "OpenAI", type: "AI Model", status: "active", connected: true },
    { id: 2, name: "Anthropic", type: "AI Model", status: "inactive", connected: false },
    { id: 3, name: "Stripe", type: "Payment", status: "active", connected: true },
    { id: 4, name: "AWS S3", type: "Storage", status: "active", connected: true },
];

export function ProvidersList() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">Providers</h2>
            <p className="text-muted-foreground">
            Manage external service providers and API integrations.
            </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {providers.map((provider) => (
            <Card key={provider.id} className="flex flex-col">
                <CardHeader className="pb-3 flex flex-row justify-between items-start">
                    <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                        <Building className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <Badge variant={provider.status === "active" ? "default" : "secondary"}>
                        {provider.status}
                    </Badge>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                    <h3 className="font-semibold text-lg mb-1">{provider.name}</h3>
                    <p className="text-sm text-muted-foreground mb-6">Type: {provider.type}</p>
                    
                    <div className="flex items-center gap-2 mb-6 text-sm">
                        <div className={`h-2 w-2 rounded-full ${provider.connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className={provider.connected ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                            {provider.connected ? 'Connected' : 'Not Connected'}
                        </span>
                    </div>

                    <div className="mt-auto flex items-center gap-2">
                        <Button variant="outline" className="flex-1">
                            <Settings className="mr-2 h-4 w-4" /> Config
                        </Button>
                        <Button variant={provider.connected ? 'destructive' : 'default'} className="flex-1">
                            {provider.connected ? <><Power className="mr-2 h-4 w-4"/> Disconnect</> : <><LinkIcon className="mr-2 h-4 w-4"/> Connect</>}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
