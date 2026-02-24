"use client";

import { useRouter } from "next/navigation";
import { Bell, LogOut, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

export function Header() {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  
  const handleLogout = () => {
    // En un entorno real, esto llamaría a una API para cerrar sesión
    // Por ahora, simplemente redirigimos a la página principal
    router.push("/");
  };

  const handleProfile = () => {
    // Aquí podrías navegar a la página de perfil
    alert("Funcionalidad de perfil - En construcción");
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
      {/* Search */}
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar proyectos, tareas..."
          className="pl-9 bg-background"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative"
          onClick={() => setShowNotifications(true)}
        >
          <Bell className="h-4 w-4" />
          <Badge className="absolute -right-1 -top-1 h-4 w-4 rounded-full p-0 text-[10px] flex items-center justify-center">
            3
          </Badge>
        </Button>
        
        {/* Modal de notificaciones */}
        <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Notificaciones</DialogTitle>
              <DialogDescription>
                Tienes 3 notificaciones sin leer.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-3">
              <div className="flex items-start gap-3 rounded-lg border border-border p-3">
                <div className="rounded-full bg-amber-500/20 p-2">
                  <Bell className="h-4 w-4 text-amber-500" />
                </div>
                <div>
                  <p className="font-medium">Licencia por vencer</p>
                  <p className="text-sm text-muted-foreground">La licencia de Vercel vence en 7 días.</p>
                  <p className="mt-1 text-xs text-muted-foreground">Hace 2 horas</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-border p-3">
                <div className="rounded-full bg-red-500/20 p-2">
                  <Bell className="h-4 w-4 text-red-500" />
                </div>
                <div>
                  <p className="font-medium">Servicio caído</p>
                  <p className="text-sm text-muted-foreground">El health check de Maps reporta servicio caído.</p>
                  <p className="mt-1 text-xs text-muted-foreground">Hace 5 horas</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-border p-3">
                <div className="rounded-full bg-green-500/20 p-2">
                  <Bell className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="font-medium">Tarea completada</p>
                  <p className="text-sm text-muted-foreground">William marcó "Configurar DNS" como completada.</p>
                  <p className="mt-1 text-xs text-muted-foreground">Ayer</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  AD
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium hidden md:inline">Admin</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={handleProfile}>
              <User className="mr-2 h-4 w-4" />
              Perfil
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-destructive cursor-pointer" 
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
