import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
  trend?: { value: number; positive: boolean };
  gradient?: string;
  delay?: number;
}

const StatsCard = ({ title, value, subtitle, icon, trend, gradient, delay = 0 }: StatsCardProps) => {
  return (
    <div
      className="glass-card rounded-2xl p-5 hover:scale-[1.02] transition-all duration-300 group animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={cn(
            "w-11 h-11 rounded-xl flex items-center justify-center shadow-lg",
            gradient || "gradient-primary shadow-blue-500/20"
          )}
        >
          <Icon name={icon} size={20} className="text-white" />
        </div>
        {trend && (
          <div className={cn("flex items-center gap-1 text-xs font-semibold", trend.positive ? "text-emerald-400" : "text-red-400")}>
            <Icon name={trend.positive ? "TrendingUp" : "TrendingDown"} size={14} />
            {Math.abs(trend.value)}%
          </div>
        )}
      </div>
      <div className="text-2xl font-bold tracking-tight">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{title}</div>
      {subtitle && <div className="text-[11px] text-muted-foreground/70 mt-0.5">{subtitle}</div>}
    </div>
  );
};

export default StatsCard;