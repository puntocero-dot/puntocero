"use client";

import { use, useState, useEffect } from "react";
import { KanbanBoard } from "@/components/dashboard/kanban-board";
import { GanttChart } from "@/components/dashboard/gantt-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, ExternalLink, Pencil, Calendar, Trash2, KeyRound, Eye, EyeOff, Copy, Shield } from "lucide-react";
import { PROJECTS } from "@/lib/constants";
import { format } from "date-fns";
import type { Task, TaskStatus, Project } from "@/types";

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
  const project = PROJECTS.find((p) => p.slug === slug) as Project | undefined;
  const [tasks, setTasks] = useState<Task[]>(DEMO_TASKS);
  const [view, setView] = useState<"kanban" | "gantt">("kanban");
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [isDeleteTaskOpen, setIsDeleteTaskOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    due_date: "",
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const handleAddTask = () => {
    const id = String(Math.max(...tasks.map(t => Number(t.id || 0))) + 1);
    const task: Task = {
      id,
      project_id: slug,
      title: newTask.title || "Nueva tarea",
      description: newTask.description || "",
      status: newTask.status || "todo",
      priority: newTask.priority || "medium",
      order_index: tasks.length,
      due_date: newTask.due_date,
      start_date: new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    setTasks([...tasks, task]);
    setNewTask({
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
      due_date: "",
    });
    setIsAddTaskOpen(false);
  };
  
  const handleEditTask = () => {
    if (!currentTask) return;
    setTasks(tasks.map(task => 
      task.id === currentTask.id ? { ...currentTask } : task
    ));
    setCurrentTask(null);
    setIsEditTaskOpen(false);
  };
  
  const handleDeleteTask = () => {
    if (!currentTask) return;
    setTasks(tasks.filter(task => task.id !== currentTask.id));
    setCurrentTask(null);
    setIsDeleteTaskOpen(false);
  };
  
  const openEditTask = (task: Task) => {
    setCurrentTask({...task});
    setIsEditTaskOpen(true);
  };
  
  const openDeleteTask = (task: Task) => {
    setCurrentTask(task);
    setIsDeleteTaskOpen(true);
  };
  
  const moveTask = (taskId: string, newStatus: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus as TaskStatus } : task
    ));
  };

  if (!project || !mounted) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground">{!mounted ? "Cargando..." : "Proyecto no encontrado"}</p>
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
          <Button size="sm" onClick={() => setIsAddTaskOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nueva tarea
          </Button>
        </div>
      </div>

      {/* View toggle */}
      <Tabs value={view} onValueChange={(v) => setView(v as any)}>
        <TabsList>
          <TabsTrigger value="kanban">Kanban</TabsTrigger>
          <TabsTrigger value="gantt">Gantt</TabsTrigger>
          <TabsTrigger value="resources">Recursos y Credenciales</TabsTrigger>
        </TabsList>

        <TabsContent value="kanban" className="mt-4">
          <KanbanBoard tasks={tasks} onEditTask={openEditTask} onDeleteTask={openDeleteTask} onMoveTask={moveTask} />
        </TabsContent>

        <TabsContent value="gantt" className="mt-4">
          <GanttChart tasks={tasks} />
        </TabsContent>

        <TabsContent value="resources" className="mt-4 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Technology Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <ExternalLink className="h-5 w-5 text-primary" />
                Tecnologías y Enlaces
              </h3>
              <div className="grid gap-3">
                {project.links && project.links.length > 0 ? (
                  project.links.map((link, i) => (
                    <Button key={i} variant="outline" className="justify-start h-auto py-3 px-4 w-full" asChild>
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        <div className="flex flex-col items-start gap-0.5">
                          <span className="font-medium text-sm">{link.label}</span>
                          <span className="text-[10px] text-muted-foreground truncate w-full max-w-[200px]">
                            {link.url}
                          </span>
                        </div>
                      </a>
                    </Button>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground italic">No hay enlaces registrados para este proyecto.</p>
                )}
              </div>
            </div>

            {/* Project Credentials (Mock) */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <KeyRound className="h-5 w-5 text-primary" />
                Credenciales del Proyecto
              </h3>
              <div className="space-y-3">
                {/* Specific project credentials logic will eventually pull from DB */}
                <ProjectCredentialsSection projectName={project.name} credentials={project.credentials} />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Task Dialog */}
      <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar nueva tarea</DialogTitle>
            <DialogDescription>
              Crea una nueva tarea para el proyecto {project?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={newTask.title || ""}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                placeholder="Título de la tarea"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={newTask.description || ""}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                placeholder="Descripción detallada"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="status">Estado</Label>
                <Select
                  value={newTask.status || "todo"}
                  onValueChange={(value) => setNewTask({...newTask, status: value as TaskStatus})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="backlog">Backlog</SelectItem>
                    <SelectItem value="todo">Por hacer</SelectItem>
                    <SelectItem value="in_progress">En progreso</SelectItem>
                    <SelectItem value="review">Revisión</SelectItem>
                    <SelectItem value="done">Completado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priority">Prioridad</Label>
                <Select
                  value={newTask.priority || "medium"}
                  onValueChange={(value) => setNewTask({...newTask, priority: value as "low" | "medium" | "high" | "critical"})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar prioridad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baja</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                    <SelectItem value="critical">Crítica</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="due_date">Fecha límite</Label>
              <Input
                id="due_date"
                type="date"
                value={newTask.due_date || ""}
                onChange={(e) => setNewTask({...newTask, due_date: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTaskOpen(false)}>Cancelar</Button>
            <Button onClick={handleAddTask}>Crear tarea</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Task Dialog */}
      {currentTask && (
        <Dialog open={isEditTaskOpen} onOpenChange={setIsEditTaskOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar tarea</DialogTitle>
              <DialogDescription>
                Modifica los detalles de la tarea.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Título</Label>
                <Input
                  id="edit-title"
                  value={currentTask.title}
                  onChange={(e) => setCurrentTask({...currentTask, title: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Descripción</Label>
                <Textarea
                  id="edit-description"
                  value={currentTask.description || ""}
                  onChange={(e) => setCurrentTask({...currentTask, description: e.target.value})}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-status">Estado</Label>
                  <Select
                    value={currentTask.status}
                    onValueChange={(value) => setCurrentTask({...currentTask, status: value as TaskStatus})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="backlog">Backlog</SelectItem>
                      <SelectItem value="todo">Por hacer</SelectItem>
                      <SelectItem value="in_progress">En progreso</SelectItem>
                      <SelectItem value="review">Revisión</SelectItem>
                      <SelectItem value="done">Completado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-priority">Prioridad</Label>
                  <Select
                    value={currentTask.priority}
                    onValueChange={(value) => setCurrentTask({...currentTask, priority: value as "low" | "medium" | "high" | "critical"})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baja</SelectItem>
                      <SelectItem value="medium">Media</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                      <SelectItem value="critical">Crítica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-start-date">Fecha inicio</Label>
                  <Input
                    id="edit-start-date"
                    type="date"
                    value={currentTask.start_date || ""}
                    onChange={(e) => setCurrentTask({...currentTask, start_date: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-due-date">Fecha límite</Label>
                  <Input
                    id="edit-due-date"
                    type="date"
                    value={currentTask.due_date || ""}
                    onChange={(e) => setCurrentTask({...currentTask, due_date: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditTaskOpen(false)}>Cancelar</Button>
              <Button onClick={handleEditTask}>Guardar cambios</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Task Dialog */}
      {currentTask && (
        <AlertDialog open={isDeleteTaskOpen} onOpenChange={setIsDeleteTaskOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Eliminar esta tarea?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción eliminará permanentemente la tarea "{currentTask.title}".
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDeleteTask}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}

// Sub-component for Project Credentials
function ProjectCredentialsSection({ projectName, credentials }: { projectName: string, credentials?: Project['credentials'] }) {
  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set());

  // Use credentials from project or fallback to empty array
  const displayCreds = credentials || [];

  const toggleVisibility = (id: string) => {
    setVisibleIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-3">
      {displayCreds.length > 0 ? (
        displayCreds.map((cred, idx) => (
          <div key={idx} className="p-3 border rounded-lg bg-card/50 flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">{cred.label}</p>
              {cred.username && <p className="text-[11px] text-muted-foreground font-mono truncate">{cred.username}</p>}
              <p className="text-xs mt-1 font-mono text-primary">
                {visibleIds.has(`${idx}`) ? (cred.password || "No pass") : "••••••••••••"}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => toggleVisibility(`${idx}`)}
              >
                {visibleIds.has(`${idx}`) ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              {cred.url && (
                <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                  <a href={cred.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-muted-foreground italic">No hay credenciales registradas para este proyecto.</p>
      )}
      <p className="text-[10px] text-muted-foreground flex items-center gap-1 pt-2">
        <Shield className="h-3 w-3" />
        Estas credenciales son exclusivas de {projectName}.
      </p>
    </div>
  );
}
