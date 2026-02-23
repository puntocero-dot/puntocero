import { notFound } from "next/navigation";
import { PROJECTS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2, Zap, Shield, Globe } from "lucide-react";

interface ShowcasePageProps {
  params: Promise<{ subdomain: string }>;
}

export default async function ShowcasePage({ params }: ShowcasePageProps) {
  const { subdomain } = await params;
  const project = PROJECTS.find((p) => p.subdomain === subdomain);

  if (!project) return notFound();

  const features = [
    { icon: Zap, label: "Rendimiento optimizado", desc: "Edge computing con latencia < 100ms" },
    { icon: Shield, label: "Seguridad enterprise", desc: "Cifrado end-to-end y RBAC" },
    { icon: Globe, label: "Multi-plataforma", desc: "Web, mobile y API REST integrada" },
    { icon: CheckCircle2, label: "Soporte 24/7", desc: "Monitoreo automático con alertas" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center">
          <Badge variant="outline" className="mb-4" style={{ color: project.color, borderColor: project.color }}>
            {subdomain}.puntocero.dev
          </Badge>
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            {project.name}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Solución empresarial desarrollada por Punto Cero — IA avanzada, hardware integrado
            y soporte continuo para tu negocio.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button size="lg" style={{ backgroundColor: project.color }}>
              Solicitar demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              Ver documentación
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-center text-2xl font-bold tracking-tight">
          ¿Por qué elegir {project.name}?
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {features.map((f, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30"
            >
              <f.icon className="h-8 w-8" style={{ color: project.color }} />
              <h3 className="mt-3 text-lg font-semibold">{f.label}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-16 text-center">
        <h2 className="text-2xl font-bold">¿Listo para empezar?</h2>
        <p className="mt-2 text-muted-foreground">
          Contáctanos para una cotización personalizada con hardware incluido.
        </p>
        <Button className="mt-6" size="lg" style={{ backgroundColor: project.color }}>
          Contactar equipo
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Punto Cero — puntocero.dev — Todos los derechos reservados.
      </footer>
    </div>
  );
}
