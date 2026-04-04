"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Code, Database, Globe, Lock, MonitorSmartphone, Server, Zap } from 'lucide-react';
import LensFlareHero from '@/components/ui/LensFlareHero';

export default function Home() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-background">
      {/* Header / Navigation */}
      <header className="border-b border-border">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <span className="text-sm font-bold text-primary-foreground">PC</span>
            </div>
            <span className="text-lg font-semibold tracking-tight">Punto Cero</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#conocenos" className="text-sm font-medium text-foreground/80 hover:text-foreground">Conócenos</a>
            <a href="#servicios" className="text-sm font-medium text-foreground/80 hover:text-foreground">Servicios</a>
            <a href="#proyectos" className="text-sm font-medium text-foreground/80 hover:text-foreground">Proyectos</a>
            <a href="#proceso" className="text-sm font-medium text-foreground/80 hover:text-foreground">Proceso</a>
            <a href="#tecnologias" className="text-sm font-medium text-foreground/80 hover:text-foreground">Tecnologías</a>
          </nav>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowLoginForm(!showLoginForm)}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Login Modal */}
      {showLoginForm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Iniciar Sesión</h2>
              <button onClick={() => setShowLoginForm(false)} className="text-muted-foreground hover:text-foreground">
                &times;
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              window.location.href = '/dashboard';
            }}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1" htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  required
                />
              </div>
              <div className="flex justify-between items-center">

                <button
                  type="submit"
                  className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-slate-950">
        {/* Full Perspective Background */}
        <LensFlareHero />
        
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-black/40 z-[1] pointer-events-none" />

        <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white">
                Desarrollo de <span className="text-primary">Software</span> a Medida
              </h1>
              <p className="mt-6 text-lg text-slate-300">
                En Punto Cero creamos soluciones digitales de alta calidad para empresas y startups.
                Combinamos tecnología de punta, UX impecable e inteligencia artificial para potenciar tu negocio.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => setShowLoginForm(true)}
                  className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Ver proyectos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
                <a
                  href="#servicios"
                  className="inline-flex items-center rounded-md border border-slate-700 bg-white/5 backdrop-blur-sm px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
                >
                  Nuestros servicios
                </a>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 text-sm text-slate-400">
                <p className="font-medium text-slate-200">Tecnologías preferidas:</p>
                <div className="flex gap-4">
                  <span>React</span>
                  <span>Next.js</span>
                  <span>Supabase</span>
                  <span>Go</span>
                  <span>Python</span>
                </div>
              </div>
            </div>

            {/* Featured Projects Card with glassmorphism */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-primary/20 blur-3xl"></div>
              <p className="relative text-sm font-medium uppercase tracking-wider text-slate-400">Proyectos destacados</p>
              <ul className="relative mt-6 space-y-5">
                <li className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/20">
                    <Globe className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Maps</p>
                    <p className="text-sm text-slate-400">Servicio de mapas y geolocalización</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20">
                    <Database className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium text-white">ContaPro</p>
                    <p className="text-sm text-slate-400">Software contable en la nube</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/20">
                    <Server className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Logitrack</p>
                    <p className="text-sm text-slate-400">Rastreo y optimización de flotas</p>
                  </div>
                </li>
              </ul>
              <div className="relative mt-8">
                <Link
                  href="https://maps.puntocero.dev"
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Ver demostración en vivo
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Showcase Section */}
      <section id="conocenos" className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.03] to-background pointer-events-none" />
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 relative">
          <div className="mx-auto max-w-2xl text-center mb-10">
            <p className="text-sm font-medium uppercase tracking-widest text-primary mb-3">Conócenos</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Lo que hacemos en Punto Cero</h2>
          </div>
          <div className="relative group">
            {/* Glow effect behind video */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />
            <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl bg-black">
              <video
                className="w-full h-auto block"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src="/Punto_Cero.mp4" type="video/mp4" />
                Tu navegador no soporta videos HTML5.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 bg-card/50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Nuestros Servicios</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Diseñamos y desarrollamos soluciones digitales que transforman ideas en productos exitosos
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-background p-8 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <MonitorSmartphone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Desarrollo Web & Móvil</h3>
              <p className="mt-3 text-muted-foreground">
                Aplicaciones web progresivas y apps nativas para iOS y Android con interfaces intuitivas y alto rendimiento.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-8 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Sistemas a Medida</h3>
              <p className="mt-3 text-muted-foreground">
                ERPs, CRMs y sistemas de gestión completamente personalizados que automatizan y optimizan tus procesos de negocio.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-8 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Inteligencia Artificial</h3>
              <p className="mt-3 text-muted-foreground">
                Integración de IA avanzada en tus productos para análisis predictivo, procesamiento de lenguaje y optimización automática.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-8 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Ciberseguridad</h3>
              <p className="mt-3 text-muted-foreground">
                Auditorías de seguridad, implementación de protocolos de protección y desarrollo seguro para proteger tu información.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-8 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Cloud & DevOps</h3>
              <p className="mt-3 text-muted-foreground">
                Infraestructura en la nube optimizada, CI/CD, y monitoreo para garantizar el rendimiento y escalabilidad de tus aplicaciones.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-8 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Server className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">IoT & Hardware</h3>
              <p className="mt-3 text-muted-foreground">
                Diseño e integración de dispositivos conectados, sensores inteligentes y sistemas embebidos para extender tu tecnología al mundo físico.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="proyectos" className="py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Nuestros Proyectos</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Soluciones reales que generan impacto en distintas industrias
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "FleetTrack", desc: "Monitoreo y optimización de flotas con IA", color: "bg-red-500/10", textColor: "text-red-500" },
              { name: "CloudBooks", desc: "Software contable en la nube para PYMEs", color: "bg-purple-500/10", textColor: "text-purple-500" },
              { name: "GeoMap", desc: "Servicio de mapas y geolocalización avanzada", color: "bg-blue-500/10", textColor: "text-blue-500" },
              { name: "BistroApp", desc: "Plataforma de gestión para el sector gastronómico", color: "bg-amber-500/10", textColor: "text-amber-500" },
              { name: "SwiftLog", desc: "Sistema inteligente de logística y entregas", color: "bg-yellow-500/10", textColor: "text-yellow-500" },
              { name: "Build2Go", desc: "Marketplace de ensamblaje técnico bajo demanda", color: "bg-emerald-500/10", textColor: "text-emerald-500" },
            ].map((proj) => (
              <div key={proj.name} className="rounded-xl border border-border bg-card p-6 transition-all hover:shadow-md">
                <div className={`mb-3 inline-flex rounded-lg ${proj.color} px-3 py-1`}>
                  <span className={`text-sm font-semibold ${proj.textColor}`}>{proj.name}</span>
                </div>
                <p className="text-sm text-muted-foreground">{proj.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="proceso" className="py-20 bg-card/50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Nuestro Proceso</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Metodología ágil y transparente de principio a fin
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "01", title: "Descubrimiento", desc: "Entendemos tu negocio, objetivos y usuarios para definir el alcance del proyecto." },
              { step: "02", title: "Diseño", desc: "Creamos wireframes y prototipos interactivos validados contigo antes de escribir código." },
              { step: "03", title: "Desarrollo", desc: "Sprints de 2 semanas con entregas incrementales y revisiones constantes." },
              { step: "04", title: "Lanzamiento", desc: "Deploy, monitoreo y soporte continuo para asegurar el éxito de tu producto." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-lg font-bold text-primary">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="tecnologias" className="py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Tecnologías</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Herramientas modernas para soluciones robustas y escalables
            </p>
          </div>
          <div className="mt-16 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {[
              "React", "Next.js", "TypeScript", "Tailwind CSS",
              "Supabase", "PostgreSQL", "Go", "Python",
              "Flutter", "Docker", "Vercel", "TensorFlow",
            ].map((tech) => (
              <div key={tech} className="flex items-center justify-center rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium transition-all hover:border-primary/30 hover:shadow-sm">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6">
          <div className="rounded-2xl bg-primary/10 p-8 md:p-12">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Comienza tu proyecto con nosotros</h2>
              <p className="mt-4 text-lg">
                ¿Tienes una idea o proyecto en mente? Estamos listos para convertirlo en realidad.
                Agenda una consulta gratuita y conoce cómo podemos ayudarte.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => setShowLoginForm(true)}
                  className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Iniciar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background">
        <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                  <span className="text-sm font-bold text-primary-foreground">PC</span>
                </div>
                <span className="text-lg font-semibold tracking-tight">Punto Cero</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Desarrollamos el software que transforma el futuro de tu negocio.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Servicios</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>Desarrollo Web & Móvil</li>
                <li>Sistemas a Medida</li>
                <li>Inteligencia Artificial</li>
                <li>Ciberseguridad</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Proyectos</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>Maps</li>
                <li>ContaPro</li>
                <li>Logitrack</li>
                <li>DrPollitoApp</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Legal</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>Términos de servicio</li>
                <li>Política de privacidad</li>
                <li>Cookies</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-border pt-8 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Punto Cero. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
