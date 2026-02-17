import { mockDevices, mockAlerts, mockStats, responseTimeHistory } from "@/lib/mock-data";
import StatsCard from "./StatsCard";
import DeviceCard from "./DeviceCard";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DashboardPage = () => {
  const unreadAlerts = mockAlerts.filter((a) => !a.read);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Приборная панель</h2>
          <p className="text-sm text-muted-foreground mt-1">Мониторинг вызывных панелей Beward DKS в реальном времени</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground glass rounded-full px-4 py-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          Обновление каждые 15 сек
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Всего устройств"
          value={mockStats.totalDevices}
          icon="Monitor"
          subtitle={`${mockStats.online} активных`}
          delay={0}
        />
        <StatsCard
          title="Онлайн"
          value={mockStats.online}
          icon="Wifi"
          gradient="gradient-success shadow-emerald-500/20"
          trend={{ value: 2.5, positive: true }}
          delay={50}
        />
        <StatsCard
          title="Средний отклик"
          value={`${mockStats.avgResponseTime}мс`}
          icon="Zap"
          gradient="bg-gradient-to-r from-violet-500 to-purple-600 shadow-violet-500/20"
          trend={{ value: 8, positive: true }}
          delay={100}
        />
        <StatsCard
          title="Uptime"
          value={`${mockStats.uptime}%`}
          icon="Activity"
          gradient="bg-gradient-to-r from-cyan-400 to-blue-500 shadow-cyan-500/20"
          delay={150}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card rounded-2xl p-5 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm">Время отклика</h3>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Среднее
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" /> Макс
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={responseTimeHistory}>
              <defs>
                <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f87171" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="opacity-10" />
              <XAxis dataKey="time" tick={{ fontSize: 11 }} className="text-muted-foreground" />
              <YAxis tick={{ fontSize: 11 }} className="text-muted-foreground" />
              <Tooltip
                contentStyle={{
                  background: "hsl(224 28% 10%)",
                  border: "1px solid hsl(224 20% 18%)",
                  borderRadius: "12px",
                  fontSize: "12px",
                }}
              />
              <Area type="monotone" dataKey="avg" stroke="#3b82f6" fill="url(#colorAvg)" strokeWidth={2} />
              <Area type="monotone" dataKey="max" stroke="#f87171" fill="url(#colorMax)" strokeWidth={1.5} strokeDasharray="4 4" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-2xl p-5 animate-fade-in" style={{ animationDelay: "250ms" }}>
          <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
            <Icon name="Bell" size={16} className="text-primary" />
            Последние алерты
          </h3>
          <div className="space-y-3">
            {unreadAlerts.map((alert) => (
              <div
                key={alert.id}
                className={cn(
                  "p-3 rounded-xl border transition-colors",
                  alert.type === "offline" ? "bg-red-500/5 border-red-500/20" :
                  alert.type === "slow" ? "bg-amber-500/5 border-amber-500/20" :
                  "bg-emerald-500/5 border-emerald-500/20"
                )}
              >
                <div className="flex items-start gap-2">
                  <Icon
                    name={alert.type === "offline" ? "WifiOff" : alert.type === "slow" ? "Clock" : "CheckCircle"}
                    size={14}
                    className={cn(
                      "mt-0.5 flex-shrink-0",
                      alert.type === "offline" ? "text-red-400" :
                      alert.type === "slow" ? "text-amber-400" : "text-emerald-400"
                    )}
                  />
                  <div>
                    <p className="text-xs font-medium">{alert.deviceName}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{alert.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
          <Icon name="Monitor" size={16} className="text-primary" />
          Устройства
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {mockDevices.slice(0, 3).map((device, i) => (
            <DeviceCard key={device.id} device={device} delay={i * 50} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;