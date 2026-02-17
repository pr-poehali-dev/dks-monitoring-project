import { mockStats, responseTimeHistory, uptimeHistory, mockDevices } from "@/lib/mock-data";
import StatsCard from "./StatsCard";
import Icon from "@/components/ui/icon";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";

const statusData = [
  { name: "Онлайн", value: mockStats.online, color: "#22c55e" },
  { name: "Оффлайн", value: mockStats.offline, color: "#ef4444" },
  { name: "Проблемы", value: mockStats.warning, color: "#f59e0b" },
];

const deviceResponseTimes = mockDevices
  .filter((d) => d.responseTime !== null)
  .map((d) => ({ name: d.name.replace("DKS-15122 ", "").replace("DKS-15120 ", ""), time: d.responseTime }));

const StatisticsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Статистика</h2>
        <p className="text-sm text-muted-foreground mt-1">Аналитика работы панелей за последнюю неделю</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Общий Uptime" value={`${mockStats.uptime}%`} icon="Activity" gradient="gradient-success shadow-emerald-500/20" delay={0} />
        <StatsCard title="Ср. отклик" value={`${mockStats.avgResponseTime}мс`} icon="Zap" delay={50} />
        <StatsCard title="Проверок сегодня" value="2,847" icon="RefreshCw" gradient="bg-gradient-to-r from-violet-500 to-purple-600 shadow-violet-500/20" delay={100} />
        <StatsCard title="Инцидентов" value="3" icon="AlertTriangle" gradient="gradient-warning shadow-amber-500/20" delay={150} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-5 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
            <Icon name="TrendingUp" size={16} className="text-primary" />
            Uptime за неделю
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={uptimeHistory}>
              <defs>
                <linearGradient id="uptimeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="opacity-10" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis domain={[95, 100]} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "hsl(224 28% 10%)", border: "1px solid hsl(224 20% 18%)", borderRadius: "12px", fontSize: "12px" }} />
              <Area type="monotone" dataKey="uptime" stroke="#22c55e" fill="url(#uptimeGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-2xl p-5 animate-fade-in" style={{ animationDelay: "250ms" }}>
          <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
            <Icon name="Timer" size={16} className="text-primary" />
            Отклик по устройствам
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={deviceResponseTimes} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" className="opacity-10" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={100} />
              <Tooltip contentStyle={{ background: "hsl(224 28% 10%)", border: "1px solid hsl(224 20% 18%)", borderRadius: "12px", fontSize: "12px" }} />
              <Bar dataKey="time" radius={[0, 6, 6, 0]}>
                {deviceResponseTimes.map((entry, i) => (
                  <Cell key={i} fill={entry.time! < 100 ? "#22c55e" : entry.time! < 500 ? "#f59e0b" : "#ef4444"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-5 animate-fade-in" style={{ animationDelay: "300ms" }}>
          <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
            <Icon name="PieChart" size={16} className="text-primary" />
            Статусы устройств
          </h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width={200} height={200}>
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value">
                  {statusData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2">
            {statusData.map((s) => (
              <div key={s.name} className="flex items-center gap-1.5 text-xs">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                {s.name} ({s.value})
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 glass-card rounded-2xl p-5 animate-fade-in" style={{ animationDelay: "350ms" }}>
          <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
            <Icon name="BarChart3" size={16} className="text-primary" />
            Динамика отклика (сегодня)
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={responseTimeHistory}>
              <defs>
                <linearGradient id="avgGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="opacity-10" />
              <XAxis dataKey="time" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "hsl(224 28% 10%)", border: "1px solid hsl(224 20% 18%)", borderRadius: "12px", fontSize: "12px" }} />
              <Area type="monotone" dataKey="avg" stroke="#3b82f6" fill="url(#avgGrad2)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;