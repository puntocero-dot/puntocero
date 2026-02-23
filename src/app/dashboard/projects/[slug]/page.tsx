"use client";

import { use, useState } from "react";
import { KanbanBoard } from "@/components/dashboard/kanban-board";
import { GanttChart } from "@/components/dashboard/gantt-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, ExternalLink } from "lucide-react";
import { PROJECTS } from "@/lib/constants";
import type { Task } from "@/types";

// Demo tasks for visualization
const DEMO_TASKS: Task[] = [
  {
    id: "1", project_id: "x", title: "Diseño de landing page", description: "Crear mockup en Figma",
    status: "done", priority: "high", order_index: 0, start_date: "2026-02-01", due_date: "2026-02-10",
    created_at: "", updated_at: "",
  },
  {
    id: "2", project_id: "x", title: "Integrar autenticación Supabase", description: "Login, registro, roles",
    status: "in_progress", priority: "high", order_index: 1, start_date: "2026-02-10", due_date: "2026-02-20",
    created_at: "", updated_at: "",
  },
  {
    id: "3", project_id: "x", title: "API REST de productos", description: "CRUD completo con validación",
    status: "in_progress", priority: "medium", order_index: 2, start_date: "2026-02-15", due_date: "2026-02-28",
    created_at: "", updated_at: "",
  },
  {
    id: "4", project_id: "x", title: "Dashboard de métricas", description: "Gráficas de ventas y KPIs",
    status: "todo", priority: "medium", order_index: 3, due_date: "2026-03-05",
    created_at: "", updated_at: "",
  },
  {
    id: "5", project_id: "x", title: "Sistema de notificaciones", description: "Push + email",
    status: "todo", priority: "low", order_index: 4, due_date: "2026-03-10",
    created_at: "", updated_at: "",
  },
  {
    id: "6", project_id: "x", title: "Testing E2E", description: "Playwright suite",
    status: "backlog", priority: "medium", order_index: 5,
    created_at: "", updated_at: "",
  },
  {
    id: "7", project_id: "x", title: "Documentación técnica", description: "README, API docs",
    status: "backlog", priority: "low", order_index: 6,
    created_at: "", updated_at: "",
  },
  {
    id: "8", project_id: "x", title: "Deploy a producción", description: "CI/CD pipeline",
    status: "review", priority: "critical", order_index: 7, start_date: "2026-02-18", due_date: "2026-02-25",
    created_at: "", updated_at: "",
  },
];

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = PROJECTS.find((p) => p.slug === slug);
  const [view, setView] = useState<"kanban" | "gantt">("kanban");

  if (!project) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground">Proyecto no encontrado</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="h-10 w-10 rounded-lg"
            style={{ backgroundColor: project.color }}
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">{project.name}</h1>
              <Badge variant="outline" className="text-[10px]">
                Activo
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {project.subdomain}.puntocero.dev
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <ExternalLink className="mr-2 h-4 w-4" />
            Ver sitio
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Nueva tarea
          </Button>
        </div>
      </div>

      {/* View toggle */}
      <Tabs value={view} onValueChange={(v) => setView(v as "kanban" | "gantt")}>
        <TabsList>
          <TabsTrigger value="kanban">Kanban</TabsTrigger>
          <TabsTrigger value="gantt">Gantt</TabsTrigger>
        </TabsList>

        <TabsContent value="kanban" className="mt-4">
          <KanbanBoard tasks={DEMO_TASKS} />
        </TabsContent>

        <TabsContent value="gantt" className="mt-4">
          <GanttChart tasks={DEMO_TASKS} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
