import { Device } from "@/lib/types";
import Icon from "@/components/ui/icon";
import StatusBadge from "./StatusBadge";
import { cn } from "@/lib/utils";

interface DeviceCardProps {
  device: Device;
  delay?: number;
  onSelect?: (device: Device) => void;
}

const DeviceCard = ({ device, delay = 0, onSelect }: DeviceCardProps) => {
  return (
    <div
      onClick={() => onSelect?.(device)}
      className={cn(
        "glass-card rounded-2xl p-5 cursor-pointer hover:scale-[1.02] transition-all duration-300 animate-fade-in group",
        device.status === "online" && "hover:shadow-emerald-500/10",
        device.status === "offline" && "hover:shadow-red-500/10 opacity-80",
        device.status === "warning" && "hover:shadow-amber-500/10"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center",
            device.status === "online" ? "bg-emerald-500/10" : device.status === "offline" ? "bg-red-500/10" : "bg-amber-500/10"
          )}>
            <Icon
              name="Camera"
              size={20}
              className={cn(
                device.status === "online" ? "text-emerald-400" : device.status === "offline" ? "text-red-400" : "text-amber-400"
              )}
            />
          </div>
          <div>
            <h3 className="font-semibold text-sm leading-tight">{device.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{device.model}</p>
          </div>
        </div>
        <StatusBadge status={device.status} />
      </div>

      <div className="space-y-2 mt-4">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Icon name="Globe" size={13} />
            <span>{device.ip}</span>
          </div>
          {device.responseTime !== null && (
            <span className={cn(
              "font-mono font-semibold",
              device.responseTime < 100 ? "text-emerald-400" :
              device.responseTime < 500 ? "text-amber-400" : "text-red-400"
            )}>
              {device.responseTime}мс
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Icon name="MapPin" size={13} />
          <span>{device.building} · {device.floor}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Icon name="Clock" size={13} />
          <span>Проверено: {new Date(device.lastChecked).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
        <button className="text-xs text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors">
          <Icon name="Video" size={13} />
          Камера
        </button>
        <button className="text-xs text-muted-foreground hover:text-foreground font-medium flex items-center gap-1 transition-colors">
          <Icon name="Settings" size={13} />
          Детали
        </button>
      </div>
    </div>
  );
};

export default DeviceCard;