import { mockHistory } from "@/lib/mock-data";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";

const typeConfig: Record<string, { icon: string; color: string; bg: string }> = {
  status_change: { icon: "RefreshCw", color: "text-blue-400", bg: "bg-blue-500/10" },
  check: { icon: "CheckCircle", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  alert: { icon: "AlertTriangle", color: "text-amber-400", bg: "bg-amber-500/10" },
  config_change: { icon: "Settings", color: "text-violet-400", bg: "bg-violet-500/10" },
};

const HistoryPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">История событий</h2>
        <p className="text-sm text-muted-foreground mt-1">Журнал всех действий и изменений</p>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-border/50" />

          {mockHistory.map((event, i) => {
            const config = typeConfig[event.type];
            return (
              <div
                key={event.id}
                className="relative flex items-start gap-4 p-5 hover:bg-secondary/30 transition-colors animate-fade-in"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10", config.bg)}>
                  <Icon name={config.icon} size={14} className={config.color} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium">{event.deviceName}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{event.description}</p>
                    </div>
                    <time className="text-[11px] text-muted-foreground whitespace-nowrap flex-shrink-0">
                      {new Date(event.timestamp).toLocaleString("ru-RU", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </time>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;