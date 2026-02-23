"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Activity,
  RefreshCw,
  Clock,
  Server,
  Wifi,
  WifiOff,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceHealth {
  id: string;
  project: string;
  endpoint: string;
  status: "healthy" | "degraded" | "down" | "unknown";
  responseTime: number;
  uptime: number;
  lastChecked: string;
}

const DEMO_SERVICES: ServiceHealth[] = [
  { id: "1", project: "Maps", endpoint: "https://maps.puntocero.dev", status: "healthy", responseTime: 124, uptime: 99.9, lastChecked: "hace 5 min" },
  { id: "2", project: "Logitrack", endpoint: "https://logitrack.puntocero.dev", status: "healthy", responseTime: 89, uptime: 99.7, lastChecked: "hace 5 min" },
  { id: "3", project: "DrPollitoApp", endpoint: "https://drpollito.puntocero.dev", status: "degraded", responseTime: 1420, uptime: 95.2, lastChecked: "hace 5 min" },
  { id: "4", project: "Armados2Go", endpoint: "https://armados2go.puntocero.dev", status: "down", responseTime: 0, uptime: 87.3, lastChecked: "hace 5 min" },
  { id: "5", project: "ContaPro", endpoint: "https://contapro.puntocero.dev", status: "healthy", responseTime: 201, uptime: 99.8, lastChecked: "hace 5 min" },
  { id: "6", project: "TheYellowExpress", endpoint: "https://theyellowexpress.puntocero.dev", status: "unknown", responseTime: 0, uptime: 0, lastChecked: "nunca" },
];

const INFRA_ALERTS = [
  { service: "Railway", metric: "CPU Usage", value: "12%", threshold: "15%", status: "ok" as const },
  { service: "Vercel", metric: "Build Status", value: "Passing", threshold: "Fail", status: "ok" as const },
  { service: "Supabase", metric: "Conexiones", value: "45/60", threshold: "80%", status: "warning" as const },
  { service: "GoDaddy", metric: "DNS Expiry", value: "28 días", threshold: "30 días", status: "warning" as const },
];

const statusConfig = {
  healthy: { icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10", label: "Saludable" },
  degraded: { icon: AlertTriangle, color: "text-amber-400", bg: "bg-amber-500/10", label: "Degradado" },
  down: { icon: WifiOff, color: "text-red-400", bg: "bg-red-500/10", label: "Caído" },
  unknown: { icon: Wifi, color: "text-zinc-400", bg: "bg-zinc-500/10", label: "Desconocido" },
};

export default function HealthPage() {
  const healthyCount = DEMO_SERVICES.filter((s) => s.status === "healthy").length;
  const avgResponse = Math.round(
    DEMO_SERVICES.filter((s) => s.responseTime > 0).reduce((s, v) => s + v.responseTime, 0) /
      DEMO_SERVICES.filter((s) => s.responseTime > 0).length
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Health Check</h1>
          <p className="text-sm text-muted-foreground">
            Monitoreo automático de servicios y subdominios
          </p>
        </div>
        <Button size="sm" variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Verificar ahora
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="bg-card">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
              <Server className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Servicios activos</p>
              <p className="text-2xl font-bold">{healthyCount}/{DEMO_SERVICES.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tiempo promedio</p>
              <p className="text-2xl font-bold">{avgResponse}ms</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Alertas infra</p>
              <p className="text-2xl font-bold">
                {INFRA_ALERTS.filter((a) => a.status === "warning").length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DEMO_SERVICES.map((svc) => {
          const cfg = statusConfig[svc.status];
          const Icon = cfg.icon;

          return (
            <Card key={svc.id} className="bg-card">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", cfg.bg)}>
                      <Icon className={cn("h-4 w-4", cfg.color)} />
                    </div>
                    <div>
                      <p className="font-semibold">{svc.project}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[180px]">{svc.endpoint}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={cn("text-[10px]", cfg.color)}>
                    {cfg.label}
                  </Badge>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Uptime</span>
                    <span>{svc.uptime}%</span>
                  </div>
                  <Progress
                    value={svc.uptime}
                    className="h-1.5"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>{svc.responseTime > 0 ? `${svc.responseTime}ms` : "N/A"}</span>
                    <span>{svc.lastChecked}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Infrastructure alerts table */}
      <Card className="bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Alertas de Infraestructura</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {INFRA_ALERTS.map((alert, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-border p-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "h-2 w-2 rounded-full",
                      alert.status === "ok" ? "bg-emerald-500" : "bg-amber-500"
                    )}
                  />
                  <div>
                    <p className="text-sm font-medium">{alert.service}</p>
                    <p className="text-xs text-muted-foreground">{alert.metric}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-mono">{alert.value}</p>
                  <p className="text-[10px] text-muted-foreground">Umbral: {alert.threshold}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
