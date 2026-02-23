"use client";

import { StatCard } from "@/components/dashboard/stat-card";
import { ProjectCard } from "@/components/dashboard/project-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FolderKanban,
  CheckCircle2,
  AlertTriangle,
  Activity,
  CreditCard,
  Clock,
} from "lucide-react";
import { PROJECTS } from "@/lib/constants";

// Demo data — will be replaced with Supabase queries
const DEMO_TASKS_PER_PROJECT: Record<string, { total: number; done: number }> = {
  drpollitoapp: { total: 12, done: 5 },
  maps: { total: 8, done: 3 },
  armados2go: { total: 15, done: 10 },
  theyellowexpress: { total: 6, done: 1 },
  contapro: { total: 20, done: 14 },
  logitrack: { total: 18, done: 11 },
};

const DEMO_LICENSES_EXPIRING = [
  { name: "Windsurf Pro", provider: "Windsurf", days: 5, cost: "$20/mo" },
  { name: "Railway Starter", provider: "Railway", days: 12, cost: "$5/mo" },
  { name: "GoDaddy DNS", provider: "GoDaddy", days: 28, cost: "$14/yr" },
];

const DEMO_HEALTH = [
  { project: "Maps", status: "healthy", ms: 124 },
  { project: "Logitrack", status: "healthy", ms: 89 },
  { project: "DrPollitoApp", status: "degraded", ms: 1420 },
  { project: "Armados2Go", status: "down", ms: 0 },
  { project: "ContaPro", status: "healthy", ms: 201 },
  { project: "TheYellowExpress", status: "unknown", ms: 0 },
];

const healthColor: Record<string, string> = {
  healthy: "bg-emerald-500",
  degraded: "bg-amber-500",
  down: "bg-red-500",
  unknown: "bg-zinc-500",
};

export default function DashboardPage() {
  const totalTasks = Object.values(DEMO_TASKS_PER_PROJECT).reduce((s, t) => s + t.total, 0);
  const totalDone = Object.values(DEMO_TASKS_PER_PROJECT).reduce((s, t) => s + t.done, 0);
  const healthyCount = DEMO_HEALTH.filter((h) => h.status === "healthy").length;

  return (
    <div className="space-y-8">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Vista general de todos los proyectos de Punto Cero
        </p>
      </div>

      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Proyectos activos"
          value={PROJECTS.length}
          icon={FolderKanban}
          subtitle="6 en total"
        />
        <StatCard
          title="Tareas completadas"
          value={`${totalDone}/${totalTasks}`}
          icon={CheckCircle2}
          trend={{ value: 12, positive: true }}
        />
        <StatCard
          title="Licencias por vencer"
          value={DEMO_LICENSES_EXPIRING.length}
          icon={CreditCard}
          subtitle="Próximos 30 días"
        />
        <StatCard
          title="Servicios saludables"
          value={`${healthyCount}/${DEMO_HEALTH.length}`}
          icon={Activity}
        />
      </div>

      {/* Projects grid */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Proyectos</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => {
            const tasks = DEMO_TASKS_PER_PROJECT[p.slug] ?? { total: 0, done: 0 };
            const progress = tasks.total > 0 ? Math.round((tasks.done / tasks.total) * 100) : 0;
            return (
              <ProjectCard
                key={p.slug}
                name={p.name}
                slug={p.slug}
                description={`Subdominio: ${p.subdomain}.puntocero.dev`}
                status="active"
                color={p.color}
                progress={progress}
                tasksTotal={tasks.total}
                tasksDone={tasks.done}
                subdomain={p.subdomain}
              />
            );
          })}
        </div>
      </div>

      {/* Bottom row: Licenses expiring + Health */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Licenses expiring soon */}
        <Card className="bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              Licencias por vencer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {DEMO_LICENSES_EXPIRING.map((lic) => (
              <div
                key={lic.name}
                className="flex items-center justify-between rounded-lg border border-border p-3"
              >
                <div>
                  <p className="text-sm font-medium">{lic.name}</p>
                  <p className="text-xs text-muted-foreground">{lic.provider}</p>
                </div>
                <div className="text-right">
                  <Badge
                    variant={lic.days <= 7 ? "destructive" : "secondary"}
                    className="text-[10px]"
                  >
                    {lic.days} días
                  </Badge>
                  <p className="mt-1 text-xs text-muted-foreground">{lic.cost}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Health status */}
        <Card className="bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Activity className="h-4 w-4" />
              Estado de servicios
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {DEMO_HEALTH.map((h) => (
              <div
                key={h.project}
                className="flex items-center justify-between rounded-lg border border-border p-3"
              >
                <div className="flex items-center gap-3">
                  <div className={`h-2.5 w-2.5 rounded-full ${healthColor[h.status]}`} />
                  <p className="text-sm font-medium">{h.project}</p>
                </div>
                <div className="flex items-center gap-3">
                  {h.ms > 0 && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {h.ms}ms
                    </span>
                  )}
                  <Badge
                    variant={
                      h.status === "healthy"
                        ? "outline"
                        : h.status === "down"
                          ? "destructive"
                          : "secondary"
                    }
                    className="text-[10px] capitalize"
                  >
                    {h.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
