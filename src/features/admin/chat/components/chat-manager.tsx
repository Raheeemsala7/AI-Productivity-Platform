"use client"
import React from 'react';
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';
import { Search, MessageSquare, MoreVertical, Send } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

const conversations = [
    { id: 1, user: "Alice Smith", preview: "I have a question about my billing...", time: "10:42 AM", unread: true },
    { id: 2, user: "Bob Jones", preview: "The new feature is amazing!", time: "09:15 AM", unread: false },
    { id: 3, user: "Charlie Brown", preview: "Can you help me set up the API?", time: "Yesterday", unread: false },
];

export function ChatManager() {
  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col space-y-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Chat Management</h2>
        <p className="text-muted-foreground">
          Monitor and manage support and user conversations.
        </p>
      </div>

      <Card className="flex-1 flex overflow-hidden p-0 border-0 shadow-sm ring-1 ring-border">
          {/* Sidebar */}
          <div className="w-80 border-r flex flex-col bg-muted/20">
              <div className="p-4 border-b">
                  <div className="flex items-center gap-2 border bg-background rounded-md px-3 py-2">
                      <Search className="h-4 w-4 text-muted-foreground" />
                      <input type="text" placeholder="Search conversations..." className="flex-1 bg-transparent border-none outline-none text-sm" />
                  </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                  {conversations.map((conv) => (
                      <div key={conv.id} className={`p-4 border-b cursor-pointer hover:bg-muted/50 ${conv.unread ? 'bg-background' : ''}`}>
                          <div className="flex justify-between items-start mb-1">
                              <span className={`font-medium text-sm ${conv.unread ? 'text-foreground' : 'text-muted-foreground'}`}>{conv.user}</span>
                              <span className="text-xs text-muted-foreground">{conv.time}</span>
                          </div>
                          <p className={`text-xs truncate ${conv.unread ? 'font-medium' : 'text-muted-foreground'}`}>{conv.preview}</p>
                      </div>
                  ))}
              </div>
          </div>
          
          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col bg-background">
              <div className="h-16 border-b flex items-center justify-between px-6">
                  <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold">
                          AS
                      </div>
                      <div>
                          <div className="font-semibold text-sm">Alice Smith</div>
                          <div className="text-xs text-muted-foreground">alice@example.com</div>
                      </div>
                  </div>
                  <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
              </div>
              
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground opacity-50">
                      <MessageSquare className="h-12 w-12 mb-4" />
                      <p>Select a conversation to view messages</p>
                  </div>
              </div>

              <div className="p-4 border-t bg-muted/10">
                  <div className="flex gap-2">
                      <input type="text" placeholder="Type a message..." className="flex-1 border rounded-md px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-brand" disabled />
                      <Button disabled><Send className="h-4 w-4 mr-2" /> Send</Button>
                  </div>
              </div>
          </div>
      </Card>
    </div>
  );
}
