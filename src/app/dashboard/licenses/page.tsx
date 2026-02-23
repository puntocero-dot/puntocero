"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  CreditCard,
  AlertTriangle,
  Calendar,
  DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface License {
  id: string;
  name: string;
  provider: string;
  costMonthly: number;
  renewalDate: string;
  status: "active" | "expiring_soon" | "expired";
  project?: string;
}

const DEMO_LICENSES: License[] = [
  { id: "1", name: "Windsurf Pro", provider: "Windsurf", costMonthly: 20, renewalDate: "2026-02-26", status: "expiring_soon", project: "All" },
  { id: "2", name: "Railway Starter", provider: "Railway", costMonthly: 5, renewalDate: "2026-03-05", status: "expiring_soon", project: "Logitrack" },
  { id: "3", name: "Vercel Pro", provider: "Vercel", costMonthly: 20, renewalDate: "2026-04-15", status: "active", project: "All" },
  { id: "4", name: "Supabase Pro", provider: "Supabase", costMonthly: 25, renewalDate: "2026-05-01", status: "active", project: "All" },
  { id: "5", name: "GoDaddy DNS", provider: "GoDaddy", costMonthly: 1.17, renewalDate: "2026-03-21", status: "expiring_soon", project: "All" },
  { id: "6", name: "Gemini API", provider: "Google", costMonthly: 0, renewalDate: "2026-12-31", status: "active", project: "DrPollitoApp" },
  { id: "7", name: "GitHub Team", provider: "GitHub", costMonthly: 4, renewalDate: "2026-06-01", status: "active", project: "All" },
  { id: "8", name: "Figma Pro", provider: "Figma", costMonthly: 15, renewalDate: "2026-01-15", status: "expired", project: "All" },
];

function daysUntil(dateStr: string): number {
  const diff = new Date(dateStr).getTime() - new Date().getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function statusBadge(status: string, days: number) {
  if (status === "expired" || days < 0)
    return <Badge variant="destructive" className="text-[10px]">Expirada</Badge>;
  if (days <= 7)
    return <Badge variant="destructive" className="text-[10px]">{days}d restantes</Badge>;
  if (days <= 30)
    return <Badge className="bg-amber-500/20 text-amber-400 text-[10px]">{days}d restantes</Badge>;
  return <Badge variant="outline" className="text-[10px] text-emerald-400">Activa</Badge>;
}

export default function LicensesPage() {
  const totalMonthly = DEMO_LICENSES.reduce((s, l) => s + l.costMonthly, 0);
  const expiringCount = DEMO_LICENSES.filter(
    (l) => l.status === "expiring_soon" || daysUntil(l.renewalDate) <= 30
  ).length;
  const expiredCount = DEMO_LICENSES.filter(
    (l) => l.status === "expired" || daysUntil(l.renewalDate) < 0
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Licencias y Suscripciones</h1>
          <p className="text-sm text-muted-foreground">
            Control de pagos, renovaciones y alertas
          </p>
        </div>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Agregar licencia
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="bg-card">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Costo mensual</p>
              <p className="text-2xl font-bold">${totalMonthly.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Por vencer (30d)</p>
              <p className="text-2xl font-bold">{expiringCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
              <CreditCard className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Expiradas</p>
              <p className="text-2xl font-bold">{expiredCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card className="bg-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Servicio</TableHead>
                <TableHead>Proveedor</TableHead>
                <TableHead>Proyecto</TableHead>
                <TableHead className="text-right">Costo/mes</TableHead>
                <TableHead>Renovación</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DEMO_LICENSES.map((lic) => {
                const days = daysUntil(lic.renewalDate);
                return (
                  <TableRow key={lic.id} className="cursor-pointer hover:bg-accent/50">
                    <TableCell className="font-medium">{lic.name}</TableCell>
                    <TableCell className="text-muted-foreground">{lic.provider}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-[10px]">
                        {lic.project}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm">
                      ${lic.costMonthly.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-sm">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        {new Date(lic.renewalDate).toLocaleDateString("es-MX", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </TableCell>
                    <TableCell>{statusBadge(lic.status, days)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
