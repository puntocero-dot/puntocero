"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TASK_STATUS_CONFIG, PRIORITY_CONFIG } from "@/lib/constants";
import type { Task, TaskStatus } from "@/types";
import { Calendar, Pencil, Trash2, MoveHorizontal, User } from "lucide-react";
import { useState } from "react";

interface KanbanBoardProps {
  tasks: Task[];
  onEditTask?: (task: Task) => void;
  onDeleteTask?: (task: Task) => void;
  onMoveTask?: (taskId: string, status: string) => void;
  onTaskClick?: (task: Task) => void;
}

const COLUMNS: TaskStatus[] = ["backlog", "todo", "in_progress", "review", "done"];

export function KanbanBoard({ tasks, onEditTask, onDeleteTask, onMoveTask, onTaskClick }: KanbanBoardProps) {
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const grouped = COLUMNS.reduce(
    (acc, status) => {
      acc[status] = tasks.filter((t) => t.status === status);
      return acc;
    },
    {} as Record<TaskStatus, Task[]>
  );

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {COLUMNS.map((status) => {
        const config = TASK_STATUS_CONFIG[status];
        const columnTasks = grouped[status];

        return (
          <div 
            key={status} 
            className="flex w-72 shrink-0 flex-col"
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = "move";
            }}
            onDrop={(e) => {
              e.preventDefault();
              if (draggedTaskId && onMoveTask) {
                onMoveTask(draggedTaskId, status);
                setDraggedTaskId(null);
              }
            }}
          >
            {/* Column header */}
            <div className="mb-3 flex items-center gap-2">
              <div className={cn("h-2 w-2 rounded-full", config.color)} />
              <span className="text-sm font-medium">{config.label}</span>
              <Badge variant="secondary" className="ml-auto text-[10px]">
                {columnTasks.length}
              </Badge>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-2">
              {columnTasks.map((task) => (
                <Card
                  key={task.id}
                  className="bg-card transition-all hover:border-primary/30 hover:shadow-md"
                  draggable={true}
                  onDragStart={(e) => {
                    setDraggedTaskId(task.id);
                    e.dataTransfer.effectAllowed = "move";
                  }}
                  onDragEnd={() => setDraggedTaskId(null)}
                >
                  <CardContent className="p-3">
                    <div className="flex justify-between">
                      <p 
                        className="text-sm font-medium leading-snug cursor-pointer" 
                        onClick={() => onTaskClick?.(task)}
                      >
                        {task.title}
                      </p>
                      <div className="flex space-x-1 ml-2">
                        {onEditTask && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6" 
                            onClick={(e) => {
                              e.stopPropagation();
                              onEditTask(task);
                            }}
                          >
                            <Pencil className="h-3 w-3" />
                          </Button>
                        )}
                        {onDeleteTask && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 text-destructive" 
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteTask(task);
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                    {task.description && (
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                        {task.description}
                      </p>
                    )}
                    <div className="mt-3 flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={cn("text-[10px]", PRIORITY_CONFIG[task.priority].color)}
                      >
                        {PRIORITY_CONFIG[task.priority].label}
                      </Badge>
                      {task.due_date && (
                        <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {new Date(task.due_date).toLocaleDateString("es-MX", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      )}
                      {task.assignee && (
                        <span className="ml-auto flex items-center gap-1 text-[10px] text-muted-foreground">
                          <User className="h-3 w-3" />
                          {task.assignee.full_name.split(" ")[0]}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {columnTasks.length === 0 && (
                <div className="flex h-24 items-center justify-center rounded-lg border border-dashed border-border">
                  <p className="text-xs text-muted-foreground">Sin tareas</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
