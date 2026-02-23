"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  name: string;
  slug: string;
  description?: string;
  status: string;
  color: string;
  progress: number;
  tasksTotal: number;
  tasksDone: number;
  subdomain?: string;
}

const STATUS_MAP: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  active: { label: "Activo", variant: "default" },
  paused: { label: "Pausado", variant: "secondary" },
  completed: { label: "Completado", variant: "outline" },
  archived: { label: "Archivado", variant: "destructive" },
};

export function ProjectCard({
  name,
  slug,
  description,
  status,
  color,
  progress,
  tasksTotal,
  tasksDone,
  subdomain,
}: ProjectCardProps) {
  const statusConfig = STATUS_MAP[status] ?? STATUS_MAP.active;

  return (
    <Link href={`/dashboard/projects/${slug}`}>
      <Card className="group relative overflow-hidden bg-card transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
        {/* Color accent bar */}
        <div className="absolute left-0 top-0 h-full w-1" style={{ backgroundColor: color }} />

        <CardContent className="p-5 pl-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold tracking-tight">{name}</h3>
                <Badge variant={statusConfig.variant} className="text-[10px]">
                  {statusConfig.label}
                </Badge>
              </div>
              {description && (
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {description}
                </p>
              )}
            </div>
            {subdomain && (
              <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            )}
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {tasksDone}/{tasksTotal} tareas
              </span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
