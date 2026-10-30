"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Activity, Clock, Zap, MessageSquare } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function UserDashboard() {
  const t = useTranslations("Dashboard.userDashboard");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
        <p className="text-muted-foreground">
          {t("description")}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("creditsRemaining")}</CardTitle>
            <Zap className="h-4 w-4 text-brand" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">160 / 1000</div>
            <p className="text-xs text-muted-foreground">{t("resetsInDays", { days: 12 })}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("generationsToday")}</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">{t("aboveAverage", { count: 4 })}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("savedTemplates")}</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">{t("usedTimesToday", { count: 3 })}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("timeSaved")}</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2h</div>
            <p className="text-xs text-muted-foreground">{t("estimatedThisWeek")}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>{t("recentActivity")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[
                { action: t("activityMarketingEmail"), type: t("typeTemplate"), time: t("timeMinsAgo", { count: 10 }) },
                { action: t("activityChatAssistant"), type: t("typeChat"), time: t("timeHourAgo", { count: 1 }) },
                { action: t("activitySummarizedReport"), type: t("typeTool"), time: t("timeHoursAgo", { count: 3 }) },
              ].map((activity, i) => (
                <div key={i} className="flex items-center">
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-medium leading-none">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.type}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>{t("currentPlan")}</CardTitle>
          </CardHeader>
          <CardContent>
              <div className="flex flex-col h-full">
                  <div className="text-2xl font-bold mb-2">{t("professional")}</div>
                  <p className="text-muted-foreground mb-6">{t("planRenewalNotice")}</p>
                  
                  <div className="mt-auto space-y-4">
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-brand w-[84%] rounded-full"></div>
                      </div>
                      <div className="flex justify-between text-sm">
                          <span>{t("creditsUsed", { count: 840 })}</span>
                          <span className="font-medium text-brand">{t("creditsLeft", { count: 160 })}</span>
                      </div>
                  </div>
              </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
