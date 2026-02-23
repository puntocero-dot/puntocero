"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Package, Cpu, HardDrive } from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  serialNumber: string;
  category: string;
  project: string;
  status: "available" | "deployed" | "maintenance" | "retired";
  warrantyExpiry: string;
  client?: string;
}

const DEMO_INVENTORY: InventoryItem[] = [
  { id: "1", name: "GPS Tracker GT06N", serialNumber: "GT-2024-001", category: "IoT Sensor", project: "Logitrack", status: "deployed", warrantyExpiry: "2027-06-15", client: "FlotaMX" },
  { id: "2", name: "GPS Tracker GT06N", serialNumber: "GT-2024-002", category: "IoT Sensor", project: "Logitrack", status: "deployed", warrantyExpiry: "2027-06-15", client: "ExpressLog" },
  { id: "3", name: "Raspberry Pi 4 8GB", serialNumber: "RPI-2025-001", category: "SBC", project: "Maps", status: "deployed", warrantyExpiry: "2026-12-01" },
  { id: "4", name: "Thermal Printer 80mm", serialNumber: "TP-2025-001", category: "Peripheral", project: "TheYellowExpress", status: "available", warrantyExpiry: "2027-03-20" },
  { id: "5", name: "NVMe SSD 1TB", serialNumber: "SSD-2025-001", category: "Storage", project: "ContaPro", status: "maintenance", warrantyExpiry: "2028-01-10" },
  { id: "6", name: "Arduino Mega 2560", serialNumber: "ARD-2025-001", category: "Microcontroller", project: "Armados2Go", status: "available", warrantyExpiry: "2027-09-01" },
];

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

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Inventario IoT / Hardware</h1>
          <p className="text-sm text-muted-foreground">
            Rastreo de equipos, sensores y garantías vinculadas a clientes
          </p>
        </div>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Agregar equipo
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        {(["available", "deployed", "maintenance", "retired"] as const).map((status) => {
          const count = DEMO_INVENTORY.filter((i) => i.status === status).length;
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {DEMO_INVENTORY.map((item) => (
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
                    {item.client ?? "—"}
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
