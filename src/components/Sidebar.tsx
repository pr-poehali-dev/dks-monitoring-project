import { useState } from "react";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { PageType } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

interface SidebarProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
  alertCount: number;
}

const navItems: { id: PageType; label: string; icon: string }[] = [
  { id: "dashboard", label: "Приборная панель", icon: "LayoutDashboard" },
  { id: "devices", label: "Устройства", icon: "Monitor" },
  { id: "statistics", label: "Статистика", icon: "BarChart3" },
  { id: "history", label: "История", icon: "Clock" },
  { id: "alerts", label: "Алерты", icon: "Bell" },
  { id: "settings", label: "Настройки", icon: "Settings" },
];

const Sidebar = ({ currentPage, onPageChange, alertCount }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "h-screen sticky top-0 flex flex-col border-r border-border/50 bg-card/50 backdrop-blur-xl transition-all duration-300",
        collapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      <div className="flex items-center gap-3 p-4 border-b border-border/50">
        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
          <Icon name="Shield" size={20} className="text-white" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in overflow-hidden">
            <h1 className="font-bold text-sm leading-tight">Beward DKS</h1>
            <p className="text-[11px] text-muted-foreground">Monitor</p>
          </div>
        )}
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
              currentPage === item.id
                ? "gradient-primary text-white shadow-lg shadow-blue-500/25"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            )}
          >
            <Icon name={item.icon} size={20} className="flex-shrink-0" />
            {!collapsed && (
              <span className="animate-fade-in flex-1 text-left">{item.label}</span>
            )}
            {!collapsed && item.id === "alerts" && alertCount > 0 && (
              <Badge
                variant="destructive"
                className="h-5 min-w-5 flex items-center justify-center text-[10px] px-1.5 animate-fade-in"
              >
                {alertCount}
              </Badge>
            )}
          </button>
        ))}
      </nav>

      <div className="p-3 border-t border-border/50">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
        >
          <Icon
            name={collapsed ? "ChevronRight" : "ChevronLeft"}
            size={18}
          />
          {!collapsed && <span className="animate-fade-in">Свернуть</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;