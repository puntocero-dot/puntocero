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
import { Plus, Package, Pencil, Trash2 } from "lucide-react";
import { PROJECTS } from "@/lib/constants";

type InventoryStatus = "available" | "deployed" | "maintenance" | "retired";

interface InventoryItem {
  id: string;
  name: string;
  serialNumber: string;
  category: string;
  project: string;
  status: InventoryStatus;
  warrantyExpiry: string;
  client?: string;
}

const INITIAL_INVENTORY: InventoryItem[] = [
  { id: "1", name: "GPS Tracker GT06N", serialNumber: "GT-2024-001", category: "IoT Sensor", project: "Logitrack", status: "deployed", warrantyExpiry: "2027-06-15", client: "FlotaMX" },
  { id: "2", name: "GPS Tracker GT06N", serialNumber: "GT-2024-002", category: "IoT Sensor", project: "Logitrack", status: "deployed", warrantyExpiry: "2027-06-15", client: "ExpressLog" },
  { id: "3", name: "Raspberry Pi 4 8GB", serialNumber: "RPI-2025-001", category: "SBC", project: "Maps", status: "deployed", warrantyExpiry: "2026-12-01" },
  { id: "4", name: "Thermal Printer 80mm", serialNumber: "TP-2025-001", category: "Peripheral", project: "TheYellowExpress", status: "available", warrantyExpiry: "2027-03-20" },
  { id: "5", name: "NVMe SSD 1TB", serialNumber: "SSD-2025-001", category: "Storage", project: "ContaPro", status: "maintenance", warrantyExpiry: "2028-01-10" },
  { id: "6", name: "Arduino Mega 2560", serialNumber: "ARD-2025-001", category: "Microcontroller", project: "Armados2Go", status: "available", warrantyExpiry: "2027-09-01" },
];

const CATEGORIES = ["IoT Sensor", "SBC", "Peripheral", "Storage", "Microcontroller", "Server", "Network", "Other"];

const statusColors: Record<string, string> = {
  available: "text-emerald-400",
  deployed: "text-blue-400",
  maintenance: "text-amber-400",
  retired: "text-zinc-400",
};

const statusLabels: Record<string, string> = {
  available: "Disponible",
  deployed: "Desplegado",
  maintenance: "Mantenimiento",
  retired: "Retirado",
};

const emptyItem: Omit<InventoryItem, "id"> = {
  name: "",
  serialNumber: "",
  category: "",
  project: "",
  status: "available",
  warrantyExpiry: "",
  client: "",
};

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [newItem, setNewItem] = useState(emptyItem);
  const [currentItem, setCurrentItem] = useState<InventoryItem | null>(null);

  const handleAdd = () => {
    const id = Date.now().toString();
    setItems([...items, { ...newItem, id }]);
    setNewItem(emptyItem);
    setIsAddOpen(false);
  };

  const handleEdit = () => {
    if (!currentItem) return;
    setItems(items.map(i => i.id === currentItem.id ? currentItem : i));
    setIsEditOpen(false);
  };

  const handleDelete = () => {
    if (!currentItem) return;
    setItems(items.filter(i => i.id !== currentItem.id));
    setIsDeleteOpen(false);
  };

  const openEdit = (item: InventoryItem) => {
    setCurrentItem({ ...item });
    setIsEditOpen(true);
  };

  const openDelete = (item: InventoryItem) => {
    setCurrentItem(item);
    setIsDeleteOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Inventario IoT / Hardware</h1>
          <p className="text-sm text-muted-foreground">
            Rastreo de equipos, sensores y garantías vinculadas a clientes
          </p>
        </div>
        <Button size="sm" onClick={() => setIsAddOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Agregar equipo
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        {(["available", "deployed", "maintenance", "retired"] as const).map((status) => {
          const count = items.filter((i) => i.status === status).length;
          return (
            <Card key={status} className="bg-card">
              <CardContent className="flex items-center gap-3 p-4">
                <Package className={`h-5 w-5 ${statusColors[status]}`} />
                <div>
                  <p className="text-xs text-muted-foreground">{statusLabels[status]}</p>
                  <p className="text-xl font-bold">{count}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Table */}
      <Card className="bg-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Equipo</TableHead>
                <TableHead>N° Serie</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Proyecto</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Garantía</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="font-mono text-xs">{item.serialNumber}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-[10px]">
                      {item.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{item.project}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {item.client || "—"}
                  </TableCell>
                  <TableCell className="text-sm">
                    {new Date(item.warrantyExpiry).toLocaleDateString("es-MX", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-[10px] ${statusColors[item.status]}`}>
                      {statusLabels[item.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(item)}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => openDelete(item)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar equipo</DialogTitle>
            <DialogDescription>Registra un nuevo equipo o dispositivo</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Nombre del equipo</Label>
                <Input value={newItem.name} onChange={(e) => setNewItem({...newItem, name: e.target.value})} placeholder="Ej: GPS Tracker GT06N" />
              </div>
              <div className="grid gap-2">
                <Label>N° Serie</Label>
                <Input value={newItem.serialNumber} onChange={(e) => setNewItem({...newItem, serialNumber: e.target.value})} placeholder="Ej: GT-2024-003" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Categoría</Label>
                <Select value={newItem.category} onValueChange={(v) => setNewItem({...newItem, category: v})}>
                  <SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Proyecto</Label>
                <Select value={newItem.project} onValueChange={(v) => setNewItem({...newItem, project: v})}>
                  <SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                  <SelectContent>
                    {PROJECTS.map(p => <SelectItem key={p.slug} value={p.name}>{p.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Cliente (opcional)</Label>
                <Input value={newItem.client || ""} onChange={(e) => setNewItem({...newItem, client: e.target.value})} placeholder="Ej: FlotaMX" />
              </div>
              <div className="grid gap-2">
                <Label>Garantía hasta</Label>
                <Input type="date" value={newItem.warrantyExpiry} onChange={(e) => setNewItem({...newItem, warrantyExpiry: e.target.value})} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Estado</Label>
              <Select value={newItem.status} onValueChange={(v) => setNewItem({...newItem, status: v as InventoryStatus})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Disponible</SelectItem>
                  <SelectItem value="deployed">Desplegado</SelectItem>
                  <SelectItem value="maintenance">Mantenimiento</SelectItem>
                  <SelectItem value="retired">Retirado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancelar</Button>
            <Button onClick={handleAdd} disabled={!newItem.name || !newItem.serialNumber}>Agregar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar equipo</DialogTitle>
            <DialogDescription>Modifica los datos del equipo</DialogDescription>
          </DialogHeader>
          {currentItem && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Nombre del equipo</Label>
                  <Input value={currentItem.name} onChange={(e) => setCurrentItem({...currentItem, name: e.target.value})} />
                </div>
                <div className="grid gap-2">
                  <Label>N° Serie</Label>
                  <Input value={currentItem.serialNumber} onChange={(e) => setCurrentItem({...currentItem, serialNumber: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Categoría</Label>
                  <Select value={currentItem.category} onValueChange={(v) => setCurrentItem({...currentItem, category: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Proyecto</Label>
                  <Select value={currentItem.project} onValueChange={(v) => setCurrentItem({...currentItem, project: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {PROJECTS.map(p => <SelectItem key={p.slug} value={p.name}>{p.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Cliente (opcional)</Label>
                  <Input value={currentItem.client || ""} onChange={(e) => setCurrentItem({...currentItem, client: e.target.value})} />
                </div>
                <div className="grid gap-2">
                  <Label>Garantía hasta</Label>
                  <Input type="date" value={currentItem.warrantyExpiry} onChange={(e) => setCurrentItem({...currentItem, warrantyExpiry: e.target.value})} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Estado</Label>
                <Select value={currentItem.status} onValueChange={(v) => setCurrentItem({...currentItem, status: v as InventoryStatus})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Disponible</SelectItem>
                    <SelectItem value="deployed">Desplegado</SelectItem>
                    <SelectItem value="maintenance">Mantenimiento</SelectItem>
                    <SelectItem value="retired">Retirado</SelectItem>
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
            <AlertDialogTitle>¿Eliminar equipo?</AlertDialogTitle>
            <AlertDialogDescription>
              Se eliminará &quot;{currentItem?.name}&quot; ({currentItem?.serialNumber}) permanentemente. Esta acción no se puede deshacer.
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
