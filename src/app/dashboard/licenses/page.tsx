"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Pencil,
  Trash2,
} from "lucide-react";
import { PROJECTS, LICENSE_PROVIDERS } from "@/lib/constants";

interface License {
  id: string;
  name: string;
  provider: string;
  costMonthly: number;
  renewalDate: string;
  status: "active" | "expiring_soon" | "expired";
  project?: string;
}

const INITIAL_LICENSES: License[] = [
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

const emptyLicense: Omit<License, "id"> = {
  name: "",
  provider: "",
  costMonthly: 0,
  renewalDate: "",
  status: "active",
  project: "All",
};

export default function LicensesPage() {
  const [licenses, setLicenses] = useState<License[]>(INITIAL_LICENSES);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [newLicense, setNewLicense] = useState(emptyLicense);
  const [currentLicense, setCurrentLicense] = useState<License | null>(null);

  const totalMonthly = licenses.reduce((s, l) => s + l.costMonthly, 0);
  const expiringCount = licenses.filter(
    (l) => l.status === "expiring_soon" || daysUntil(l.renewalDate) <= 30
  ).length;
  const expiredCount = licenses.filter(
    (l) => l.status === "expired" || daysUntil(l.renewalDate) < 0
  ).length;

  const handleAdd = () => {
    const id = Date.now().toString();
    setLicenses([...licenses, { ...newLicense, id }]);
    setNewLicense(emptyLicense);
    setIsAddOpen(false);
  };

  const handleEdit = () => {
    if (!currentLicense) return;
    setLicenses(licenses.map(l => l.id === currentLicense.id ? currentLicense : l));
    setIsEditOpen(false);
  };

  const handleDelete = () => {
    if (!currentLicense) return;
    setLicenses(licenses.filter(l => l.id !== currentLicense.id));
    setIsDeleteOpen(false);
  };

  const openEdit = (lic: License) => {
    setCurrentLicense({ ...lic });
    setIsEditOpen(true);
  };

  const openDelete = (lic: License) => {
    setCurrentLicense(lic);
    setIsDeleteOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Licencias y Suscripciones</h1>
          <p className="text-sm text-muted-foreground">
            Control de pagos, renovaciones y alertas
          </p>
        </div>
        <Button size="sm" onClick={() => setIsAddOpen(true)}>
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
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {licenses.map((lic) => {
                const days = daysUntil(lic.renewalDate);
                return (
                  <TableRow key={lic.id}>
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
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(lic)}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => openDelete(lic)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar licencia</DialogTitle>
            <DialogDescription>Registra una nueva licencia o suscripción</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre del servicio</Label>
              <Input id="name" value={newLicense.name} onChange={(e) => setNewLicense({...newLicense, name: e.target.value})} placeholder="Ej: Vercel Pro" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Proveedor</Label>
                <Select value={newLicense.provider} onValueChange={(v) => setNewLicense({...newLicense, provider: v})}>
                  <SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                  <SelectContent>
                    {LICENSE_PROVIDERS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                    <SelectItem value="Google">Google</SelectItem>
                    <SelectItem value="Other">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Proyecto</Label>
                <Select value={newLicense.project || "All"} onValueChange={(v) => setNewLicense({...newLicense, project: v})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">Todos</SelectItem>
                    {PROJECTS.map(p => <SelectItem key={p.slug} value={p.name}>{p.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="cost">Costo mensual ($)</Label>
                <Input id="cost" type="number" step="0.01" value={newLicense.costMonthly} onChange={(e) => setNewLicense({...newLicense, costMonthly: parseFloat(e.target.value) || 0})} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="renewal">Fecha de renovación</Label>
                <Input id="renewal" type="date" value={newLicense.renewalDate} onChange={(e) => setNewLicense({...newLicense, renewalDate: e.target.value})} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Estado</Label>
              <Select value={newLicense.status} onValueChange={(v) => setNewLicense({...newLicense, status: v as License["status"]})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Activa</SelectItem>
                  <SelectItem value="expiring_soon">Por vencer</SelectItem>
                  <SelectItem value="expired">Expirada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancelar</Button>
            <Button onClick={handleAdd} disabled={!newLicense.name || !newLicense.provider}>Agregar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar licencia</DialogTitle>
            <DialogDescription>Modifica los datos de la licencia</DialogDescription>
          </DialogHeader>
          {currentLicense && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Nombre del servicio</Label>
                <Input value={currentLicense.name} onChange={(e) => setCurrentLicense({...currentLicense, name: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Proveedor</Label>
                  <Select value={currentLicense.provider} onValueChange={(v) => setCurrentLicense({...currentLicense, provider: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {LICENSE_PROVIDERS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                      <SelectItem value="Google">Google</SelectItem>
                      <SelectItem value="Other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Proyecto</Label>
                  <Select value={currentLicense.project || "All"} onValueChange={(v) => setCurrentLicense({...currentLicense, project: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">Todos</SelectItem>
                      {PROJECTS.map(p => <SelectItem key={p.slug} value={p.name}>{p.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Costo mensual ($)</Label>
                  <Input type="number" step="0.01" value={currentLicense.costMonthly} onChange={(e) => setCurrentLicense({...currentLicense, costMonthly: parseFloat(e.target.value) || 0})} />
                </div>
                <div className="grid gap-2">
                  <Label>Fecha de renovación</Label>
                  <Input type="date" value={currentLicense.renewalDate} onChange={(e) => setCurrentLicense({...currentLicense, renewalDate: e.target.value})} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Estado</Label>
                <Select value={currentLicense.status} onValueChange={(v) => setCurrentLicense({...currentLicense, status: v as License["status"]})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Activa</SelectItem>
                    <SelectItem value="expiring_soon">Por vencer</SelectItem>
                    <SelectItem value="expired">Expirada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancelar</Button>
            <Button onClick={handleEdit}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar licencia?</AlertDialogTitle>
            <AlertDialogDescription>
              Se eliminará &quot;{currentLicense?.name}&quot; permanentemente. Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
