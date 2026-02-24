"use client";

import { useState } from "react";
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
  Plus,
  Eye,
  EyeOff,
  Copy,
  ExternalLink,
  KeyRound,
  Shield,
  Pencil,
  Trash2,
  AlertCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { PROJECTS } from "@/lib/constants";

interface Credential {
  id: string;
  project: string;
  label: string;
  username: string;
  password: string;
  url?: string;
}

const DEMO_CREDENTIALS: Credential[] = [
  { id: "1", project: "Logitrack", label: "Supabase Dashboard", username: "admin@logitrack.com", password: "••••••••••••", url: "https://app.supabase.com" },
  { id: "2", project: "Maps", label: "Mapbox API", username: "maps@puntocero.dev", password: "••••••••••••", url: "https://mapbox.com" },
  { id: "3", project: "DrPollitoApp", label: "Railway Deploy", username: "deploy@drpollito.com", password: "••••••••••••", url: "https://railway.app" },
  { id: "4", project: "ContaPro", label: "Stripe Dashboard", username: "billing@contapro.com", password: "••••••••••••", url: "https://dashboard.stripe.com" },
  { id: "5", project: "All", label: "GoDaddy DNS", username: "dns@puntocero.dev", password: "••••••••••••", url: "https://godaddy.com" },
  { id: "6", project: "Armados2Go", label: "AWS S3 Bucket", username: "AKIAEXAMPLE", password: "••••••••••••", url: "https://console.aws.amazon.com" },
];

export default function CredentialsPage() {
  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set());
  const [credentials, setCredentials] = useState<Credential[]>(DEMO_CREDENTIALS);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCredential, setCurrentCredential] = useState<Credential | null>(null);
  const [newCredential, setNewCredential] = useState<Partial<Credential>>({
    project: "",
    label: "",
    username: "",
    password: "",
    url: "",
  });

  const toggleVisibility = (id: string) => {
    setVisibleIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copiado al portapapeles");
  };

  const handleAddCredential = () => {
    const id = String(Math.max(...credentials.map(c => Number(c.id))) + 1);
    setCredentials([
      ...credentials,
      {
        id,
        project: newCredential.project || "All",
        label: newCredential.label || "Nueva credencial",
        username: newCredential.username || "",
        password: "••••••••••••",
        url: newCredential.url,
      },
    ]);
    setNewCredential({
      project: "",
      label: "",
      username: "",
      password: "",
      url: "",
    });
    setIsAddDialogOpen(false);
  };

  const handleEditCredential = () => {
    if (!currentCredential) return;
    setCredentials(
      credentials.map((cred) =>
        cred.id === currentCredential.id
          ? { ...currentCredential }
          : cred
      )
    );
    setCurrentCredential(null);
    setIsEditDialogOpen(false);
  };

  const handleDeleteCredential = () => {
    if (!currentCredential) return;
    setCredentials(credentials.filter((cred) => cred.id !== currentCredential.id));
    setCurrentCredential(null);
    setIsDeleteDialogOpen(false);
  };

  const openEditDialog = (credential: Credential) => {
    setCurrentCredential({ ...credential });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (credential: Credential) => {
    setCurrentCredential(credential);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestor de Credenciales</h1>
          <p className="text-sm text-muted-foreground">
            Almacenamiento cifrado de contraseñas y claves API
          </p>
        </div>
        <Button size="sm" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Agregar credencial
        </Button>
      </div>

      {/* Security notice */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex items-center gap-3 p-4">
          <Shield className="h-5 w-5 text-primary" />
          <p className="text-sm text-muted-foreground">
            Las contraseñas están cifradas con AES-256. Solo los administradores pueden ver las credenciales en texto plano.
          </p>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="bg-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Etiqueta</TableHead>
                <TableHead>Proyecto</TableHead>
                <TableHead>Usuario</TableHead>
                <TableHead>Contraseña</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {credentials.map((cred) => {
                const isVisible = visibleIds.has(cred.id);
                const projectData = PROJECTS.find(
                  (p) => p.name === cred.project
                );

                return (
                  <TableRow key={cred.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <KeyRound className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{cred.label}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="text-[10px]"
                        style={
                          projectData
                            ? {
                                backgroundColor: `${projectData.color}20`,
                                color: projectData.color,
                              }
                            : undefined
                        }
                      >
                        {cred.project}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {cred.username}
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {isVisible ? "s3cur3P@ssw0rd!" : cred.password}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => toggleVisibility(cred.id)}
                        >
                          {isVisible ? (
                            <EyeOff className="h-3.5 w-3.5" />
                          ) : (
                            <Eye className="h-3.5 w-3.5" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => copyToClipboard(isVisible ? "s3cur3P@ssw0rd!" : cred.username)}
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                        {cred.url && (
                          <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                            <a href={cred.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => openEditDialog(cred)}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => openDeleteDialog(cred)}
                        >
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

      {/* Add Credential Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar nueva credencial</DialogTitle>
            <DialogDescription>
              Ingresa los detalles para la nueva credencial. Las contraseñas se guardarán cifradas.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="project">Proyecto</Label>
              <Select 
                onValueChange={(value) => setNewCredential({...newCredential, project: value})}
                value={newCredential.project}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar proyecto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">Todos los proyectos</SelectItem>
                  {PROJECTS.map((project) => (
                    <SelectItem key={project.name} value={project.name}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="label">Etiqueta</Label>
              <Input
                id="label"
                value={newCredential.label || ""}
                onChange={(e) => setNewCredential({...newCredential, label: e.target.value})}
                placeholder="Ej: Base de datos producción"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Usuario</Label>
              <Input
                id="username"
                value={newCredential.username || ""}
                onChange={(e) => setNewCredential({...newCredential, username: e.target.value})}
                placeholder="Usuario o ID de API"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={newCredential.password || ""}
                onChange={(e) => setNewCredential({...newCredential, password: e.target.value})}
                placeholder="Contraseña o clave secreta"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="url">URL (opcional)</Label>
              <Input
                id="url"
                value={newCredential.url || ""}
                onChange={(e) => setNewCredential({...newCredential, url: e.target.value})}
                placeholder="https://ejemplo.com"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddCredential}>
              Guardar credencial
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Credential Dialog */}
      {currentCredential && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar credencial</DialogTitle>
              <DialogDescription>
                Modifica los detalles de la credencial seleccionada.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-project">Proyecto</Label>
                <Select 
                  onValueChange={(value) => setCurrentCredential({...currentCredential, project: value})}
                  value={currentCredential.project}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar proyecto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">Todos los proyectos</SelectItem>
                    {PROJECTS.map((project) => (
                      <SelectItem key={project.name} value={project.name}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-label">Etiqueta</Label>
                <Input
                  id="edit-label"
                  value={currentCredential.label}
                  onChange={(e) => setCurrentCredential({...currentCredential, label: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-username">Usuario</Label>
                <Input
                  id="edit-username"
                  value={currentCredential.username}
                  onChange={(e) => setCurrentCredential({...currentCredential, username: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-password">Contraseña (dejar en blanco si no cambia)</Label>
                <Input
                  id="edit-password"
                  type="password"
                  placeholder="••••••••••••"
                  onChange={(e) => {
                    if (e.target.value) {
                      setCurrentCredential({...currentCredential, password: "••••••••••••"});
                    }
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-url">URL (opcional)</Label>
                <Input
                  id="edit-url"
                  value={currentCredential.url || ""}
                  onChange={(e) => setCurrentCredential({...currentCredential, url: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleEditCredential}>
                Guardar cambios
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      {currentCredential && (
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. Se eliminará permanentemente la credencial "{currentCredential.label}" del proyecto {currentCredential.project}.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDeleteCredential}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Eliminar credencial
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
