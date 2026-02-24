"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/dashboard/project-card";
import { PROJECTS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

interface ProjectEntry {
  name: string;
  slug: string;
  color: string;
  subdomain: string;
  status: string;
  tasksTotal: number;
  tasksDone: number;
}

const DEMO_TASKS: Record<string, { total: number; done: number }> = {
  drpollitoapp: { total: 12, done: 5 },
  maps: { total: 8, done: 3 },
  armados2go: { total: 15, done: 10 },
  theyellowexpress: { total: 6, done: 1 },
  contapro: { total: 20, done: 14 },
  logitrack: { total: 18, done: 11 },
};

const COLORS = [
  { label: "Rojo", value: "#EF4444" },
  { label: "Naranja", value: "#F59E0B" },
  { label: "Amarillo", value: "#EAB308" },
  { label: "Verde", value: "#10B981" },
  { label: "Azul", value: "#3B82F6" },
  { label: "Morado", value: "#8B5CF6" },
  { label: "Rosa", value: "#EC4899" },
  { label: "Cyan", value: "#06B6D4" },
];

export default function ProjectsPage() {
  const initialProjects: ProjectEntry[] = PROJECTS.map((p) => {
    const tasks = DEMO_TASKS[p.slug] ?? { total: 0, done: 0 };
    return {
      name: p.name,
      slug: p.slug,
      color: p.color,
      subdomain: p.subdomain,
      status: "active",
      tasksTotal: tasks.total,
      tasksDone: tasks.done,
    };
  });

  const [projects, setProjects] = useState<ProjectEntry[]>(initialProjects);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", subdomain: "", color: "#3B82F6" });

  const handleAdd = () => {
    const slug = newProject.name.toLowerCase().replace(/[^a-z0-9]+/g, "");
    setProjects([
      ...projects,
      {
        name: newProject.name,
        slug,
        color: newProject.color,
        subdomain: newProject.subdomain || slug,
        status: "active",
        tasksTotal: 0,
        tasksDone: 0,
      },
    ]);
    setNewProject({ name: "", subdomain: "", color: "#3B82F6" });
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Proyectos</h1>
          <p className="text-sm text-muted-foreground">
            Gestiona todos los proyectos de la agencia
          </p>
        </div>
        <Button size="sm" onClick={() => setIsAddOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo proyecto
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => {
          const progress = p.tasksTotal > 0 ? Math.round((p.tasksDone / p.tasksTotal) * 100) : 0;
          return (
            <ProjectCard
              key={p.slug}
              name={p.name}
              slug={p.slug}
              description={`${p.subdomain}.puntocero.dev`}
              status={p.status}
              color={p.color}
              progress={progress}
              tasksTotal={p.tasksTotal}
              tasksDone={p.tasksDone}
              subdomain={p.subdomain}
            />
          );
        })}
      </div>

      {/* Add Project Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nuevo proyecto</DialogTitle>
            <DialogDescription>Crea un nuevo proyecto para la agencia</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Nombre del proyecto</Label>
              <Input
                value={newProject.name}
                onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                placeholder="Ej: MiNuevoApp"
              />
            </div>
            <div className="grid gap-2">
              <Label>Subdominio</Label>
              <div className="flex items-center gap-2">
                <Input
                  value={newProject.subdomain}
                  onChange={(e) => setNewProject({...newProject, subdomain: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "")})}
                  placeholder="minuevoapp"
                />
                <span className="text-sm text-muted-foreground whitespace-nowrap">.puntocero.dev</span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Color</Label>
              <Select value={newProject.color} onValueChange={(v) => setNewProject({...newProject, color: v})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COLORS.map(c => (
                    <SelectItem key={c.value} value={c.value}>
                      <span className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full inline-block" style={{ backgroundColor: c.value }} />
                        {c.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancelar</Button>
            <Button onClick={handleAdd} disabled={!newProject.name}>Crear proyecto</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
