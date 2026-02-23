"use client";

import { cn } from "@/lib/utils";
import { TASK_STATUS_CONFIG } from "@/lib/constants";
import type { Task } from "@/types";

interface GanttChartProps {
  tasks: Task[];
  startDate?: Date;
  endDate?: Date;
}

export function GanttChart({ tasks, startDate, endDate }: GanttChartProps) {
  const now = new Date();
  const start = startDate ?? new Date(now.getFullYear(), now.getMonth(), 1);
  const end = endDate ?? new Date(now.getFullYear(), now.getMonth() + 2, 0);
  const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  // Generate week labels
  const weeks: { label: string; offsetPct: number }[] = [];
  const cursor = new Date(start);
  while (cursor <= end) {
    const offset = Math.ceil((cursor.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    weeks.push({
      label: cursor.toLocaleDateString("es-MX", { month: "short", day: "numeric" }),
      offsetPct: (offset / totalDays) * 100,
    });
    cursor.setDate(cursor.getDate() + 7);
  }

  // Today marker
  const todayOffset = Math.ceil((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const todayPct = Math.min(Math.max((todayOffset / totalDays) * 100, 0), 100);

  const filteredTasks = tasks.filter((t) => t.start_date || t.due_date);

  return (
    <div className="rounded-lg border border-border bg-card">
      {/* Timeline header */}
      <div className="relative h-8 border-b border-border">
        {weeks.map((w, i) => (
          <span
            key={i}
            className="absolute top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground"
            style={{ left: `${w.offsetPct}%` }}
          >
            {w.label}
          </span>
        ))}
      </div>

      {/* Rows */}
      <div className="relative">
        {/* Today line */}
        <div
          className="absolute top-0 bottom-0 w-px bg-primary/40 z-10"
          style={{ left: `${todayPct}%` }}
        />

        {filteredTasks.length === 0 && (
          <div className="flex h-32 items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Agrega fechas de inicio/fin a las tareas para ver el Gantt
            </p>
          </div>
        )}

        {filteredTasks.map((task) => {
          const taskStart = task.start_date
            ? new Date(task.start_date)
            : task.due_date
              ? new Date(new Date(task.due_date).getTime() - 7 * 24 * 60 * 60 * 1000)
              : start;
          const taskEnd = task.due_date ? new Date(task.due_date) : taskStart;

          const leftDays = Math.max(
            0,
            Math.ceil((taskStart.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
          );
          const widthDays = Math.max(
            1,
            Math.ceil((taskEnd.getTime() - taskStart.getTime()) / (1000 * 60 * 60 * 24))
          );

          const leftPct = (leftDays / totalDays) * 100;
          const widthPct = (widthDays / totalDays) * 100;

          const statusColor = TASK_STATUS_CONFIG[task.status]?.color ?? "bg-zinc-500";

          return (
            <div
              key={task.id}
              className="flex items-center border-b border-border last:border-0"
              style={{ height: 40 }}
            >
              {/* Task label */}
              <div className="w-48 shrink-0 truncate px-3 text-xs font-medium">
                {task.title}
              </div>
              {/* Bar area */}
              <div className="relative flex-1 h-full">
                <div
                  className={cn("absolute top-1/2 -translate-y-1/2 h-5 rounded-full", statusColor, "opacity-80")}
                  style={{
                    left: `${leftPct}%`,
                    width: `${Math.max(widthPct, 1)}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
