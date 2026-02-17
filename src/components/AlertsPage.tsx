import { useState } from "react";
import { mockAlerts } from "@/lib/mock-data";
import { Alert } from "@/lib/types";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";

const alertTypeConfig: Record<string, { icon: string; color: string; bg: string; border: string; label: string }> = {
  offline: { icon: "WifiOff", color: "text-red-400", bg: "bg-red-500/5", border: "border-red-500/20", label: "Недоступен" },
  slow: { icon: "Clock", color: "text-amber-400", bg: "bg-amber-500/5", border: "border-amber-500/20", label: "Медленный отклик" },
  restored: { icon: "CheckCircle", color: "text-emerald-400", bg: "bg-emerald-500/5", border: "border-emerald-500/20", label: "Восстановлен" },
};

const AlertsPage = () => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const markAllRead = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, read: true })));
  };

  const filtered = filter === "unread" ? alerts.filter((a) => !a.read) : alerts;
  const unreadCount = alerts.filter((a) => !a.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Алерты</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {unreadCount > 0 ? `${unreadCount} непрочитанных` : "Нет новых уведомлений"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 glass rounded-xl p-1">
            <button
              onClick={() => setFilter("all")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                filter === "all" ? "gradient-primary text-white shadow-md" : "text-muted-foreground"
              )}
            >
              Все ({alerts.length})
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                filter === "unread" ? "gradient-primary text-white shadow-md" : "text-muted-foreground"
              )}
            >
              Новые ({unreadCount})
            </button>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-xs text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors"
            >
              <Icon name="CheckCheck" size={14} />
              Прочитать все
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((alert, i) => {
          const config = alertTypeConfig[alert.type];
          return (
            <div
              key={alert.id}
              className={cn(
                "glass-card rounded-2xl p-5 border transition-all animate-fade-in",
                config.border,
                !alert.read && "ring-1 ring-primary/20"
              )}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", config.bg)}>
                  <Icon name={config.icon} size={18} className={config.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold">{alert.deviceName}</p>
                        {!alert.read && (
                          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{alert.message}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full", config.bg, config.color)}>
                        {config.label}
                      </span>
                      <p className="text-[11px] text-muted-foreground mt-1">
                        {new Date(alert.timestamp).toLocaleString("ru-RU", {
                          hour: "2-digit",
                          minute: "2-digit",
                          day: "numeric",
                          month: "short",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 animate-fade-in">
          <Icon name="BellOff" size={48} className="mx-auto text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground">Нет уведомлений</p>
        </div>
      )}
    </div>
  );
};

export default AlertsPage;