export interface Device {
  id: string;
  name: string;
  ip: string;
  login: string;
  password: string;
  location: string;
  building: string;
  floor: string;
  status: "online" | "offline" | "warning";
  responseTime: number | null;
  lastChecked: string;
  snapshotUrl?: string;
  model: string;
}

export interface Alert {
  id: string;
  deviceId: string;
  deviceName: string;
  type: "offline" | "slow" | "restored";
  message: string;
  timestamp: string;
  read: boolean;
}

export interface HistoryEvent {
  id: string;
  deviceId: string;
  deviceName: string;
  type: "status_change" | "check" | "alert" | "config_change";
  description: string;
  timestamp: string;
}

export interface DashboardStats {
  totalDevices: number;
  online: number;
  offline: number;
  warning: number;
  avgResponseTime: number;
  uptime: number;
}

export type PageType = "dashboard" | "devices" | "statistics" | "history" | "alerts" | "settings";

export default {};