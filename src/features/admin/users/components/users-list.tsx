
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
import { Search, SlidersHorizontal, MoreHorizontal, ShieldUser, Plus, Coins } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { getTranslations } from "next-intl/server";
import { UserAdmin } from '../types/user';
import { IMetadata } from '@/shared/types/api';

interface UsersListProps {
  users: UserAdmin[]
  pagination: IMetadata
}

export async function UsersList({ users, pagination }: UsersListProps) {
  const t = await getTranslations("AdminUsers");

  return (
    <div className="space-y-6 p-4 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
          <p className="text-muted-foreground">
            {t("description")}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <SlidersHorizontal className="mr-2 h-4 w-4" /> {t("filters")}
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> {t("addUser")}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="py-4">
          <div className="flex items-center gap-2 max-w-sm border rounded-md px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("table.user")}</TableHead>
                <TableHead>{t("table.status")}</TableHead>
                <TableHead>{t("table.subscription")}</TableHead>
                <TableHead>{t("table.credits")}</TableHead>
                <TableHead className="text-right">{t("table.actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users && users.length > 0 ? (
                users.map((user) => {
                  const isActive = user.status === 1;
                  return (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            {user.avatar && (
                              <AvatarImage src={user.avatar} alt={user.name} />
                            )}
                            <AvatarFallback
                              className="text-xs font-semibold"
                              style={user.avatar_color ? { backgroundColor: user.avatar_color, color: "#fff" } : undefined}
                            >
                              {user.name ? user.name.slice(0, 2).toUpperCase() : <ShieldUser className="h-4 w-4" />}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-xs text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={isActive ? "default" : "secondary"}>
                          {isActive ? t("status.active") : t("status.inactive")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.active_subscription ? (
                          <Badge variant="outline">{user.active_subscription}</Badge>
                        ) : (
                          <span className="text-sm text-muted-foreground">{t("noSubscription")}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-sm">
                          <Coins className="h-3.5 w-3.5 text-amber-500" />
                          <span>{user.credits ?? 0}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" aria-label={t("table.actions")}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                    {t("noUsersFound")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
