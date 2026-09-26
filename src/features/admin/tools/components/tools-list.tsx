"use client"
import React from 'react';
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { Settings, PenTool, Database } from 'lucide-react';
import { useTranslations } from 'next-intl';

const tools = [
    { id: 1, name: "Text Summarizer", description: "Summarize long form text.", status: "enabled" },
    { id: 2, name: "Image Generator", description: "Generate images from text prompts.", status: "enabled" },
    { id: 3, name: "Audio Transcriber", description: "Transcribe audio files to text.", status: "disabled" },
    { id: 4, name: "Code Assistant", description: "AI coding companion.", status: "enabled" },
];

export function ToolsList() {
  const t = useTranslations("Dashboard");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">Tools Configuration</h2>
            <p className="text-muted-foreground">
            Manage the availability and settings of platform tools.
            </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {tools.map((tool) => (
            <Card key={tool.id} className="flex flex-col">
                <CardHeader className="pb-3 flex flex-row justify-between items-start">
                    <div className="h-10 w-10 rounded-md bg-brand/10 flex items-center justify-center">
                        <PenTool className="h-5 w-5 text-brand" />
                    </div>
                    <Badge variant={tool.status === "enabled" ? "default" : "secondary"}>
                        {tool.status}
                    </Badge>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                    <h3 className="font-semibold text-lg mb-1">{tool.name}</h3>
                    <p className="text-sm text-muted-foreground mb-6">{tool.description}</p>
                    <div className="mt-auto flex items-center gap-2">
                        <Button variant="outline" className="flex-1"><Settings className="mr-2 h-4 w-4" /> Configure</Button>
                        <Button variant={tool.status === 'enabled' ? 'destructive' : 'default'} className="flex-1">
                            {tool.status === 'enabled' ? 'Disable' : 'Enable'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
