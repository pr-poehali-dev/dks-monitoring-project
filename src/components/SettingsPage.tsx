import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const SettingsPage = () => {
  const [checkInterval, setCheckInterval] = useState("15");
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [slowThreshold, setSlowThreshold] = useState("500");
  const [offlineTimeout, setOfflineTimeout] = useState("60");

  const sections = [
    {
      title: "Мониторинг",
      icon: "Activity",
      items: [
        {
          label: "Интервал проверки (сек)",
          description: "Как часто опрашивать устройства",
          element: (
            <Input
              type="number"
              value={checkInterval}
              onChange={(e) => setCheckInterval(e.target.value)}
              className="w-24 text-right glass border-border/50 rounded-xl"
            />
          ),
        },
        {
          label: "Порог медленного отклика (мс)",
          description: "Устройства с откликом выше будут помечены",
          element: (
            <Input
              type="number"
              value={slowThreshold}
              onChange={(e) => setSlowThreshold(e.target.value)}
              className="w-24 text-right glass border-border/50 rounded-xl"
            />
          ),
        },
        {
          label: "Таймаут оффлайн (сек)",
          description: "Время до пометки устройства как недоступное",
          element: (
            <Input
              type="number"
              value={offlineTimeout}
              onChange={(e) => setOfflineTimeout(e.target.value)}
              className="w-24 text-right glass border-border/50 rounded-xl"
            />
          ),
        },
      ],
    },
    {
      title: "Уведомления",
      icon: "Bell",
      items: [
        {
          label: "Push-уведомления",
          description: "Мгновенные уведомления в браузере",
          element: <Switch checked={pushEnabled} onCheckedChange={setPushEnabled} />,
        },
        {
          label: "Email-уведомления",
          description: "Отправлять алерты на почту",
          element: <Switch checked={emailEnabled} onCheckedChange={setEmailEnabled} />,
        },
        ...(emailEnabled
          ? [
              {
                label: "Email для уведомлений",
                description: "Адрес для отправки алертов",
                element: (
                  <Input
                    type="email"
                    value={emailAddress}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmailAddress(e.target.value)}
                    placeholder="email@example.com"
                    className="w-56 glass border-border/50 rounded-xl"
                  />
                ),
              },
            ]
          : []),
      ],
    },
    {
      title: "API",
      icon: "Code",
      items: [
        {
          label: "REST API",
          description: "Эндпоинт для интеграции с внешними системами",
          element: (
            <div className="flex items-center gap-2">
              <code className="text-xs glass px-3 py-1.5 rounded-lg font-mono text-muted-foreground">/api/v1/devices</code>
              <button className="text-primary hover:text-primary/80 transition-colors">
                <Icon name="Copy" size={14} />
              </button>
            </div>
          ),
        },
      ],
    },
  ];

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Настройки</h2>
        <p className="text-sm text-muted-foreground mt-1">Конфигурация системы мониторинга</p>
      </div>

      {sections.map((section, si) => (
        <div
          key={section.title}
          className="glass-card rounded-2xl overflow-hidden animate-fade-in"
          style={{ animationDelay: `${si * 80}ms` }}
        >
          <div className="px-5 py-3.5 border-b border-border/50 flex items-center gap-2">
            <Icon name={section.icon} size={16} className="text-primary" />
            <h3 className="font-semibold text-sm">{section.title}</h3>
          </div>
          <div className="divide-y divide-border/30">
            {section.items.map((item) => (
              <div key={item.label} className="flex items-center justify-between px-5 py-4 hover:bg-secondary/20 transition-colors">
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                </div>
                {item.element}
              </div>
            ))}
          </div>
        </div>
      ))}

      <button className="gradient-primary text-white px-6 py-2.5 rounded-xl text-sm font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all flex items-center gap-2">
        <Icon name="Save" size={16} />
        Сохранить настройки
      </button>
    </div>
  );
};

export default SettingsPage;