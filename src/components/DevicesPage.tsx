import { useState } from "react";
import { mockDevices } from "@/lib/mock-data";
import DeviceCard from "./DeviceCard";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type FilterStatus = "all" | "online" | "offline" | "warning";

const DevicesPage = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [groupBy, setGroupBy] = useState<"none" | "building">("none");

  const filtered = mockDevices.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.ip.includes(search) ||
      d.building.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || d.status === filter;
    return matchSearch && matchFilter;
  });

  const grouped = groupBy === "building"
    ? filtered.reduce((acc, d) => {
        if (!acc[d.building]) acc[d.building] = [];
        acc[d.building].push(d);
        return acc;
      }, {} as Record<string, typeof filtered>)
    : { "Все устройства": filtered };

  const filters: { id: FilterStatus; label: string; count: number }[] = [
    { id: "all", label: "Все", count: mockDevices.length },
    { id: "online", label: "Онлайн", count: mockDevices.filter((d) => d.status === "online").length },
    { id: "offline", label: "Оффлайн", count: mockDevices.filter((d) => d.status === "offline").length },
    { id: "warning", label: "Проблемы", count: mockDevices.filter((d) => d.status === "warning").length },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Устройства</h2>
          <p className="text-sm text-muted-foreground mt-1">Управление вызывными панелями</p>
        </div>
        <button className="gradient-primary text-white px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all">
          <Icon name="Plus" size={16} />
          Добавить
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Поиск по имени, IP или зданию..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 glass border-border/50 rounded-xl"
          />
        </div>
        <div className="flex items-center gap-1 glass rounded-xl p-1">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                filter === f.id
                  ? "gradient-primary text-white shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {f.label} ({f.count})
            </button>
          ))}
        </div>
        <button
          onClick={() => setGroupBy(groupBy === "none" ? "building" : "none")}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all",
            groupBy === "building" ? "gradient-primary text-white shadow-md" : "glass text-muted-foreground hover:text-foreground"
          )}
        >
          <Icon name="Building2" size={14} />
          По зданиям
        </button>
      </div>

      {Object.entries(grouped).map(([group, devices]) => (
        <div key={group}>
          {groupBy === "building" && (
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
              <Icon name="Building2" size={14} />
              {group}
            </h3>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {devices.map((device, i) => (
              <DeviceCard key={device.id} device={device} delay={i * 50} />
            ))}
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <div className="text-center py-16 animate-fade-in">
          <Icon name="SearchX" size={48} className="mx-auto text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground">Устройства не найдены</p>
        </div>
      )}
    </div>
  );
};

export default DevicesPage;