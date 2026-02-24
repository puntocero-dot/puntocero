"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Plus, Globe, Lock, ExternalLink, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { PROJECTS } from "@/lib/constants";

interface DomainEntry {
  id: string;
  subdomain: string;
  project: string;
  color: string;
  isActive: boolean;
  ssl: "active" | "pending" | "error";
}

const DEMO_DOMAINS: DomainEntry[] = PROJECTS.map((p, index) => ({
  id: String(index + 1),
  subdomain: `${p.subdomain}.puntocero.dev`,
  project: p.name,
  color: p.color,
  isActive: true,
  ssl: "active" as const,
}));

export default function DomainsPage() {
  const [domains, setDomains] = useState<DomainEntry[]>(DEMO_DOMAINS);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentDomain, setCurrentDomain] = useState<DomainEntry | null>(null);
  const [newDomain, setNewDomain] = useState<Partial<DomainEntry>>({
    subdomain: "",
    project: "",
    isActive: true,
    ssl: "pending",
  });
  
  const handleAddDomain = () => {
    if (!newDomain.subdomain || !newDomain.project) return;
    
    const projectData = PROJECTS.find(p => p.name === newDomain.project);
    const id = String(Math.max(...domains.map(d => Number(d.id))) + 1);
    
    setDomains([
      ...domains,
      {
        id,
        subdomain: `${newDomain.subdomain}.puntocero.dev`,
        project: newDomain.project,
        color: projectData?.color || "#666",
        isActive: true,
        ssl: "pending" as const,
      }
    ]);
    
    setNewDomain({
      subdomain: "",
      project: "",
      isActive: true,
      ssl: "pending",
    });
    
    setIsAddDialogOpen(false);
  };
  
  const handleEditDomain = () => {
    if (!currentDomain) return;
    
    setDomains(domains.map(domain => 
      domain.id === currentDomain.id ? { ...currentDomain } : domain
    ));
    
    setCurrentDomain(null);
    setIsEditDialogOpen(false);
  };
  
  const handleDeleteDomain = () => {
    if (!currentDomain) return;
    
    setDomains(domains.filter(domain => domain.id !== currentDomain.id));
    setCurrentDomain(null);
    setIsDeleteDialogOpen(false);
  };
  
  const openEditDialog = (domain: DomainEntry) => {
    setCurrentDomain({...domain});
    setIsEditDialogOpen(true);
  };
  
  const openDeleteDialog = (domain: DomainEntry) => {
    setCurrentDomain(domain);
    setIsDeleteDialogOpen(true);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestión de Dominios</h1>
          <p className="text-sm text-muted-foreground">
            Subdominios, SSL y enrutamiento dinámico
          </p>
        </div>
        <Button size="sm" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Agregar dominio
        </Button>
      </div>

      {/* Root domain card */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex items-center gap-4 p-5">
          <Globe className="h-6 w-6 text-primary" />
          <div>
            <p className="font-semibold">puntocero.dev</p>
            <p className="text-sm text-muted-foreground">
              Dominio raíz — Wildcard DNS *.puntocero.dev configurado
            </p>
          </div>
          <Badge variant="outline" className="ml-auto text-emerald-400">
            <Lock className="mr-1 h-3 w-3" />
            SSL Activo
          </Badge>
        </CardContent>
      </Card>

      {/* Subdomains table */}
      <Card className="bg-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subdominio</TableHead>
                <TableHead>Proyecto</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>SSL</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {domains.map((d) => (
                <TableRow key={d.subdomain}>
                  <TableCell className="font-mono text-sm">{d.subdomain}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="text-[10px]"
                      style={{
                        backgroundColor: `${d.color}20`,
                        color: d.color,
                      }}
                    >
                      {d.project}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px] text-emerald-400">
                      Activo
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1 text-sm text-emerald-400">
                      <Lock className="h-3 w-3" />
                      Activo
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                        <a
                          href={`https://${d.subdomain}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => openEditDialog(d)}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-destructive"
                        onClick={() => openDeleteDialog(d)}
                      >
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

      {/* Add Domain Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar nuevo subdominio</DialogTitle>
            <DialogDescription>
              Crea un nuevo subdominio para un proyecto específico.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-[1fr,auto] gap-2 items-end">
              <div>
                <Label htmlFor="subdomain">Subdominio</Label>
                <Input
                  id="subdomain"
                  value={newDomain.subdomain || ""}
                  onChange={(e) => setNewDomain({...newDomain, subdomain: e.target.value})}
                  placeholder="nombre-del-subdominio"
                />
              </div>
              <div className="text-sm text-muted-foreground pt-1">
                .puntocero.dev
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="project">Proyecto</Label>
              <Select
                onValueChange={(value) => setNewDomain({...newDomain, project: value})}
                value={newDomain.project || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar proyecto" />
                </SelectTrigger>
                <SelectContent>
                  {PROJECTS.map((project) => (
                    <SelectItem key={project.name} value={project.name}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddDomain}>
              Crear subdominio
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Domain Dialog */}
      {currentDomain && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar subdominio</DialogTitle>
              <DialogDescription>
                Modifica los detalles del subdominio seleccionado.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-[1fr,auto] gap-2 items-end">
                <div>
                  <Label htmlFor="edit-subdomain">Subdominio</Label>
                  <Input
                    id="edit-subdomain"
                    value={currentDomain.subdomain.replace(".puntocero.dev", "")}
                    onChange={(e) => setCurrentDomain({
                      ...currentDomain, 
                      subdomain: `${e.target.value}.puntocero.dev`
                    })}
                  />
                </div>
                <div className="text-sm text-muted-foreground pt-1">
                  .puntocero.dev
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-project">Proyecto</Label>
                <Select
                  onValueChange={(value) => {
                    const projectData = PROJECTS.find(p => p.name === value);
                    setCurrentDomain({
                      ...currentDomain,
                      project: value,
                      color: projectData?.color || currentDomain.color
                    });
                  }}
                  value={currentDomain.project}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PROJECTS.map((project) => (
                      <SelectItem key={project.name} value={project.name}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Estado</Label>
                <Select
                  onValueChange={(value) => setCurrentDomain({
                    ...currentDomain,
                    isActive: value === "active"
                  })}
                  value={currentDomain.isActive ? "active" : "inactive"}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="inactive">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-ssl">Certificado SSL</Label>
                <Select
                  onValueChange={(value: "active" | "pending" | "error") => 
                    setCurrentDomain({...currentDomain, ssl: value})
                  }
                  value={currentDomain.ssl}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleEditDomain}>
                Guardar cambios
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Domain Dialog */}
      {currentDomain && (
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Eliminar este subdominio?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción eliminará permanentemente el subdominio {currentDomain.subdomain}.
                Esta acción no es reversible.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDeleteDomain}
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
