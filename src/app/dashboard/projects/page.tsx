"use client";

import { ProjectCard } from "@/components/dashboard/project-card";
import { PROJECTS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const DEMO_TASKS: Record<string, { total: number; done: number }> = {
  drpollitoapp: { total: 12, done: 5 },
  maps: { total: 8, done: 3 },
  armados2go: { total: 15, done: 10 },
  theyellowexpress: { total: 6, done: 1 },
  contapro: { total: 20, done: 14 },
  logitrack: { total: 18, done: 11 },
};

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Proyectos</h1>
          <p className="text-sm text-muted-foreground">
            Gestiona todos los proyectos de la agencia
          </p>
        </div>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo proyecto
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p) => {
          const tasks = DEMO_TASKS[p.slug] ?? { total: 0, done: 0 };
          const progress = tasks.total > 0 ? Math.round((tasks.done / tasks.total) * 100) : 0;
          return (
            <ProjectCard
              key={p.slug}
              name={p.name}
              slug={p.slug}
              description={`${p.subdomain}.puntocero.dev`}
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
  );
}
