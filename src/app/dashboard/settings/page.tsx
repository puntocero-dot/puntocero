"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Save, Bell, Shield, Globe, Palette } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configuración</h1>
        <p className="text-sm text-muted-foreground">
          Ajustes generales de Punto Cero Core
        </p>
      </div>

      {/* General */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Globe className="h-4 w-4" />
            General
          </CardTitle>
          <CardDescription>Configuración del dominio y organización</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Nombre de la organización</Label>
              <Input defaultValue="Punto Cero" />
            </div>
            <div className="space-y-2">
              <Label>Dominio raíz</Label>
              <Input defaultValue="puntocero.dev" />
            </div>
          </div>
          <Button size="sm">
            <Save className="mr-2 h-4 w-4" />
            Guardar cambios
          </Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Bell className="h-4 w-4" />
            Notificaciones
          </CardTitle>
          <CardDescription>Alertas por Telegram y correo electrónico</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Telegram Bot Token</Label>
              <Input type="password" placeholder="bot123456:ABC..." />
            </div>
            <div className="space-y-2">
              <Label>Telegram Chat ID</Label>
              <Input placeholder="-100..." />
            </div>
          </div>
          <Separator />
          <div className="space-y-3">
            <p className="text-sm font-medium">Alertas activas</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Health Check — cada 1h</Badge>
              <Badge variant="outline">Licencias — 30d, 7d, 1d antes</Badge>
              <Badge variant="outline">Build fail — inmediato</Badge>
            </div>
          </div>
          <Button size="sm">
            <Save className="mr-2 h-4 w-4" />
            Guardar
          </Button>
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Shield className="h-4 w-4" />
            Seguridad
          </CardTitle>
          <CardDescription>Cifrado y acceso</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Clave de cifrado (credenciales)</Label>
            <Input type="password" defaultValue="••••••••••••••••••••••••••••••••" />
            <p className="text-xs text-muted-foreground">
              AES-256 para el vault de credenciales. No la compartas.
            </p>
          </div>
          <Button size="sm">
            <Save className="mr-2 h-4 w-4" />
            Actualizar clave
          </Button>
        </CardContent>
      </Card>

      {/* Theme */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Palette className="h-4 w-4" />
            Apariencia
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-primary bg-background">
              <span className="text-xs">Dark</span>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-zinc-100">
              <span className="text-xs text-zinc-800">Light</span>
            </div>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Dark mode activado por defecto (Google-style)
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
