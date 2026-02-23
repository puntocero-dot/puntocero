import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Code, Database, Globe, Lock, MonitorSmartphone, Server, Zap } from 'lucide-react';

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
            <a href="#servicios" className="text-sm font-medium text-foreground/80 hover:text-foreground">Servicios</a>
            <a href="#proyectos" className="text-sm font-medium text-foreground/80 hover:text-foreground">Proyectos</a>
            <a href="#proceso" className="text-sm font-medium text-foreground/80 hover:text-foreground">Proceso</a>
            <a href="#tecnologias" className="text-sm font-medium text-foreground/80 hover:text-foreground">Tecnologías</a>
          </nav>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowLoginForm(!showLoginForm)} 
              className="text-sm font-medium text-foreground/80 hover:text-foreground"
            >
              Iniciar Sesión
            </button>
            <a
              href="/dashboard"
              className="hidden sm:flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Área de Clientes
            </a>
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
                <small className="text-xs text-muted-foreground">
                  Usuarios de demostración:<br/>
                  admin@puntocero.dev<br/>
                  wruballo@puntocero.dev
                </small>
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
      <section className="py-20 md:py-32">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Desarrollo de <span className="text-primary">Software</span> a Medida
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                En Punto Cero creamos soluciones digitales de alta calidad para empresas y startups. 
                Combinamos tecnología de punta, UX impecable e inteligencia artificial para potenciar tu negocio.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a 
                  href="/dashboard" 
                  className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Ver proyectos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <a 
                  href="#servicios" 
                  className="inline-flex items-center rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium hover:bg-card/80 transition-colors"
                >
                  Nuestros servicios
                </a>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 text-sm">
                <p className="font-medium">Tecnologías preferidas:</p>
                <div className="flex gap-4 text-muted-foreground">
                  <span>React</span>
                  <span>Next.js</span>
                  <span>Supabase</span>
                  <span>Go</span>
                  <span>Python</span>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8 shadow-lg relative overflow-hidden">
              <div className="absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-primary/10 blur-3xl"></div>
              <p className="relative text-sm font-medium uppercase tracking-wider text-muted-foreground">Proyectos destacados</p>
              <ul className="relative mt-6 space-y-5">
                <li className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10">
                    <Globe className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="font-medium">Maps</p>
                    <p className="text-sm text-muted-foreground">Servicio de mapas y geolocalización</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10">
                    <Database className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium">ContaPro</p>
                    <p className="text-sm text-muted-foreground">Software contable en la nube</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
                    <Server className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <p className="font-medium">Logitrack</p>
                    <p className="text-sm text-muted-foreground">Rastreo y optimización de flotas</p>
                  </div>
                </li>
              </ul>
              <div className="relative mt-8">
                <Link 
                  href="https://maps.puntocero.dev" 
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  Ver demostración en vivo
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
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
                <a 
                  href="/dashboard" 
                  className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Área de clientes
                </a>
                <button 
                  onClick={() => setShowLoginForm(true)} 
                  className="rounded-md border border-primary bg-transparent px-5 py-2.5 text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
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
