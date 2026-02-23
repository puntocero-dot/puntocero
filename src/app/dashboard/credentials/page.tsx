"use client";

import { useState } from "react";
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
import {
  Plus,
  Eye,
  EyeOff,
  Copy,
  ExternalLink,
  KeyRound,
  Shield,
} from "lucide-react";
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
        <Button size="sm">
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
              {DEMO_CREDENTIALS.map((cred) => {
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
                          onClick={() => copyToClipboard(cred.username)}
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
                      </div>
                    </TableCell>
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
