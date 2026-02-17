import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "online" | "offline" | "warning";
  className?: string;
  showLabel?: boolean;
}

const statusConfig = {
  online: { label: "Онлайн", dotClass: "bg-emerald-400", textClass: "text-emerald-400", bgClass: "bg-emerald-400/10" },
  offline: { label: "Оффлайн", dotClass: "bg-red-400", textClass: "text-red-400", bgClass: "bg-red-400/10" },
  warning: { label: "Проблема", dotClass: "bg-amber-400", textClass: "text-amber-400", bgClass: "bg-amber-400/10" },
};

const StatusBadge = ({ status, className, showLabel = true }: StatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <div className={cn("flex items-center gap-2 px-2.5 py-1 rounded-full", config.bgClass, className)}>
      <span className="relative flex h-2.5 w-2.5">
        <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-50", config.dotClass)} />
        <span className={cn("relative inline-flex rounded-full h-2.5 w-2.5", config.dotClass)} />
      </span>
      {showLabel && (
        <span className={cn("text-xs font-semibold", config.textClass)}>{config.label}</span>
      )}
    </div>
  );
};

export default StatusBadge;