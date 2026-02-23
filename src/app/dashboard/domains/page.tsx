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
import { Plus, Globe, Lock, ExternalLink } from "lucide-react";
import { PROJECTS } from "@/lib/constants";

const DEMO_DOMAINS = PROJECTS.map((p) => ({
  subdomain: `${p.subdomain}.puntocero.dev`,
  project: p.name,
  color: p.color,
  isActive: true,
  ssl: "active" as const,
}));

export default function DomainsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestión de Dominios</h1>
          <p className="text-sm text-muted-foreground">
            Subdominios, SSL y enrutamiento dinámico
          </p>
        </div>
        <Button size="sm">
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
              {DEMO_DOMAINS.map((d) => (
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
                    <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                      <a
                        href={`https://${d.subdomain}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </Button>
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
