# Punto Cero Core — Estado del Proyecto y Guía de Handoff

> Última actualización: 27 de febrero de 2026
> Repositorio: `https://github.com/puntocero-dot/puntocero.git`
> Rama principal: `main`
> Producción: `https://puntocero.dev` (Vercel)

---

## 1. Descripción General

**Punto Cero Core** es un sistema ERP/PM multi-tenant para una agencia de desarrollo de software. Permite gestionar proyectos, tareas (Kanban/Gantt), licencias, credenciales cifradas, dominios, inventario IoT/hardware y health checks de servicios, todo desde un dashboard centralizado.

### 1.1 Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Framework | Next.js (App Router) | 16.1.6 |
| Lenguaje | TypeScript | 5.x |
| UI | Tailwind CSS v4 + ShadcnUI | — |
| Iconos | Lucide React | 0.575.0 |
| Gráficos | Recharts | 3.7.0 |
| Estado global | Zustand | 5.0.11 |
| Backend/Auth | Supabase (PostgreSQL + RLS) | 2.97.0 |
| Cifrado | crypto-js (AES-256) | 4.2.0 |
| Deploy | Vercel | — |
| DNS | GoDaddy (puntocero.dev) | — |
| Tema | Dark mode por defecto | — |

### 1.2 Repositorio y Deploy

- **GitHub:** `https://github.com/puntocero-dot/puntocero.git`
- **Rama:** `main` (única rama activa)
- **Deploy automático:** Cada push a `main` dispara un build en Vercel
- **URL producción:** `https://puntocero.dev`
- **URL Vercel:** `https://puntocero.vercel.app`
- **Dev server local:** Puerto `3005` (3000 y 3001 estaban ocupados)

---

## 2. Estructura del Proyecto

```
punto-cero-core/
├── src/
│   ├── app/
│   │   ├── page.tsx                          # Landing page pública
│   │   ├── layout.tsx                        # Root layout (dark mode, fonts)
│   │   ├── globals.css                       # Estilos globales (Tailwind)
│   │   ├── login/page.tsx                    # Página de login independiente
│   │   ├── api/health-check/                 # API route para health checks
│   │   ├── showcase/[subdomain]/page.tsx     # Landing dinámica por proyecto
│   │   └── dashboard/
│   │       ├── layout.tsx                    # Layout con Sidebar + Header
│   │       ├── page.tsx                      # Overview (stats, proyectos, alertas)
│   │       ├── projects/
│   │       │   ├── page.tsx                  # Grid de proyectos + crear nuevo
│   │       │   └── [slug]/page.tsx           # Detalle: Kanban + Gantt + CRUD tareas
│   │       ├── licenses/page.tsx             # CRUD licencias/suscripciones
│   │       ├── credentials/page.tsx          # CRUD credenciales cifradas
│   │       ├── domains/page.tsx              # CRUD dominios/subdominios
│   │       ├── inventory/page.tsx            # CRUD inventario IoT/hardware
│   │       ├── health/page.tsx               # Monitoreo de servicios
│   │       └── settings/page.tsx             # Configuración general
│   ├── components/
│   │   ├── ui/                               # 18 componentes ShadcnUI
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── alert.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── select.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── textarea.tsx
│   │   │   └── tooltip.tsx
│   │   └── dashboard/                        # Componentes del dashboard
│   │       ├── sidebar.tsx                   # Navegación lateral colapsable
│   │       ├── header.tsx                    # Header con búsqueda, notificaciones, perfil
│   │       ├── project-card.tsx              # Tarjeta de proyecto con progreso
│   │       ├── stat-card.tsx                 # Tarjeta de estadísticas
│   │       ├── kanban-board.tsx              # Tablero Kanban con drag & drop
│   │       └── gantt-chart.tsx               # Gráfico de Gantt (visual)
│   ├── lib/
│   │   ├── constants.ts                      # PROJECTS, TASK_STATUS_CONFIG, etc.
│   │   ├── crypto.ts                         # encrypt() / decrypt() con AES-256
│   │   ├── utils.ts                          # cn() helper (clsx + tailwind-merge)
│   │   └── supabase/
│   │       ├── client.ts                     # createBrowserClient()
│   │       ├── server.ts                     # createServerClient()
│   │       └── middleware.ts                 # updateSession() para auth
│   ├── store/
│   │   └── use-project-store.ts              # Zustand store para proyectos
│   └── types/
│       └── index.ts                          # Todas las interfaces TypeScript
├── supabase/
│   └── schema.sql                            # Schema completo (idempotente)
├── docs/
│   └── PROJECT-STATUS.md                     # Este archivo
├── .env.local                                # Variables de entorno (NO en git)
├── .env.local.example                        # Plantilla de variables
├── next.config.ts                            # Config de Next.js
├── package.json                              # Dependencias
└── components.json                           # Config de ShadcnUI
```

---

## 3. Flujos y Funcionalidades — Estado Detallado

### 3.1 Landing Page (`/` — `src/app/page.tsx`)

**Estado: ✅ Funcional**

- **Secciones:** Hero, Servicios (`#servicios`), Proyectos (`#proyectos`), Proceso (`#proceso`), Tecnologías (`#tecnologias`), CTA, Footer
- **Login modal:** Se abre con el botón "Iniciar Sesión" (navbar, hero, CTA)
- **Seguridad:** Se eliminaron TODOS los links directos a `/dashboard`. La única forma de entrar es a través del modal de login
- **Usuarios demo:** Eliminados de la UI pública por seguridad
- **⚠️ IMPORTANTE:** El login actual NO valida credenciales realmente. Solo hace `window.location.href = '/dashboard'` al enviar el formulario. La integración con Supabase Auth está pendiente

### 3.2 Página de Login (`/login` — `src/app/login/page.tsx`)

**Estado: ⚠️ Parcial (UI lista, sin integración real)**

- Formulario de login con email/password
- Tiene `TODO: Integrate with Supabase Auth` en el código
- Actualmente redirige a `/dashboard` sin validar
- NO se usa desde la landing (la landing usa su propio modal)

### 3.3 Dashboard Overview (`/dashboard` — `src/app/dashboard/page.tsx`)

**Estado: ✅ Funcional (datos demo)**

- 4 stat cards: proyectos activos, tareas completadas, licencias por vencer, servicios saludables
- Grid de 6 proyectos con `ProjectCard` (clickeable → `/dashboard/projects/[slug]`)
- Panel de licencias por vencer (próximos 30 días)
- Panel de estado de servicios (healthy/degraded/down/unknown)
- **Todo es data demo hardcodeada** — no lee de Supabase

### 3.4 Proyectos (`/dashboard/projects` — `src/app/dashboard/projects/page.tsx`)

**Estado: ✅ CRUD Funcional (estado local)**

- Grid de proyectos con progreso visual
- **Agregar proyecto:** Dialog con nombre, subdominio (con preview `.puntocero.dev`), y selector de color (8 colores)
- Click en tarjeta → navega a `/dashboard/projects/[slug]`

### 3.5 Detalle de Proyecto (`/dashboard/projects/[slug]`)

**Estado: ✅ CRUD Funcional (estado local)**

- **Tabs:** Kanban / Gantt
- **Kanban Board:** Columnas: Backlog, Por hacer, En progreso, Revisión, Completado
  - **Drag & drop** entre columnas (HTML5 native drag)
  - Botones de editar y eliminar en cada tarjeta
- **Agregar tarea:** Dialog con título, descripción, estado, prioridad, fecha inicio/fin
- **Editar tarea:** Dialog pre-poblado con datos actuales
- **Eliminar tarea:** AlertDialog de confirmación
- **Gantt Chart:** Visualización de fechas (componente visual, no interactivo)
- Usa `TaskStatus` type cast para compatibilidad TypeScript

### 3.6 Licencias y Suscripciones (`/dashboard/licenses`)

**Estado: ✅ CRUD Funcional (estado local)**

- 3 stat cards: costo mensual total, por vencer (30d), expiradas
- Tabla con columnas: Servicio, Proveedor, Proyecto, Costo/mes, Renovación, Estado, Acciones
- **Agregar:** Dialog con nombre, proveedor (select de `LICENSE_PROVIDERS`), proyecto, costo, fecha renovación, estado
- **Editar:** Dialog pre-poblado
- **Eliminar:** AlertDialog de confirmación
- Badges dinámicos: verde (Activa), ámbar (Xd restantes), rojo (Expirada)
- 8 licencias demo iniciales (Windsurf, Railway, Vercel, Supabase, GoDaddy, Gemini, GitHub, Figma)

### 3.7 Credenciales (`/dashboard/credentials`)

**Estado: ✅ CRUD Funcional (estado local)**

- Banner de seguridad AES-256
- Tabla: Etiqueta, Proyecto, Usuario, Contraseña, Acciones
- **Toggle visibilidad** de contraseñas (ojo/ojo cerrado)
- **Copiar al clipboard** (username o password)
- **Link externo** a la URL del servicio
- **Agregar:** Dialog con proyecto, etiqueta, usuario, contraseña, URL
- **Editar / Eliminar:** Dialogs correspondientes
- **⚠️ IMPORTANTE:** Actualmente las contraseñas son demo (`••••••••••••`). Cuando se revele, muestra `s3cur3P@ssw0rd!` hardcodeado. La integración real con `crypto.ts` (AES-256) y Supabase está pendiente

### 3.8 Dominios (`/dashboard/domains`)

**Estado: ✅ CRUD Funcional (estado local)**

- Card de dominio raíz (`puntocero.dev` con SSL activo)
- Tabla: Subdominio, Proyecto, Estado, SSL, Acciones
- **Agregar:** Dialog con subdominio + `.puntocero.dev` suffix, selector de proyecto
- **Editar:** Dialog con subdominio, proyecto, estado (activo/inactivo), SSL (activo/pendiente/error)
- **Eliminar:** AlertDialog de confirmación
- **Link externo** a cada subdominio
- 6 dominios iniciales generados desde `PROJECTS`

### 3.9 Inventario IoT/Hardware (`/dashboard/inventory`)

**Estado: ✅ CRUD Funcional (estado local)**

- 4 stat cards por estado: Disponible, Desplegado, Mantenimiento, Retirado
- Tabla: Equipo, N° Serie, Categoría, Proyecto, Cliente, Garantía, Estado, Acciones
- **Agregar:** Dialog con nombre, serial, categoría (8 opciones), proyecto, cliente, garantía, estado
- **Editar / Eliminar:** Dialogs correspondientes
- 6 items demo iniciales
- Categorías: IoT Sensor, SBC, Peripheral, Storage, Microcontroller, Server, Network, Other

### 3.10 Health Check (`/dashboard/health`)

**Estado: ⚠️ Solo UI (sin funcionalidad real)**

- 3 stat cards: servicios activos, tiempo promedio, alertas infra
- Grid de 6 servicios con status, uptime, response time
- Tabla de alertas de infraestructura
- Botón "Verificar ahora" — **NO funcional**
- Todo es data demo; no realiza pings reales
- El API route `/api/health-check/` existe pero no está conectado

### 3.11 Configuración (`/dashboard/settings`)

**Estado: ⚠️ Solo UI (formularios sin guardar)**

- **General:** Nombre de organización, dominio raíz
- **Notificaciones:** Telegram Bot Token, Chat ID, alertas activas
- **Seguridad:** Clave de cifrado AES-256
- **Apariencia:** Dark/Light (solo visual, dark por defecto)
- **Ningún botón "Guardar" realiza acción real**

### 3.12 Showcase (`/showcase/[subdomain]`)

**Estado: ✅ Funcional (estático)**

- Landing page dinámica por proyecto basada en `PROJECTS` de `constants.ts`
- Detecta `subdomain` desde la URL → busca en `PROJECTS`
- Muestra hero con nombre/color del proyecto, features genéricas, CTA
- Si el subdomain no existe → `notFound()`
- **Nota:** El middleware de subdominios (`*.puntocero.dev`) debería rutear aquí, pero Next.js 16 muestra warning de que `middleware` está deprecado en favor de `proxy`

---

## 4. Componentes del Dashboard

### 4.1 Sidebar (`src/components/dashboard/sidebar.tsx`)

- Navegación lateral con 8 items
- **Colapsable** (botón chevron)
- Logo "PC" / "Punto Cero" clickeable → `/dashboard`
- Highlight de ruta activa
- Items: Overview, Proyectos, Licencias, Credenciales, Health Check, Dominios, Inventario, Configuración

### 4.2 Header (`src/components/dashboard/header.tsx`)

- **Búsqueda:** Input con placeholder (no funcional, solo UI)
- **Notificaciones:** Bell icon con badge "3" → abre Dialog con 3 notificaciones demo
- **Perfil dropdown:**
  - "Perfil" → `alert("Funcionalidad de perfil - En construcción")`
  - "Cerrar sesión" → `router.push("/")` (redirige a landing)
- Avatar hardcodeado: "AD" / "Admin"

### 4.3 Kanban Board (`src/components/dashboard/kanban-board.tsx`)

- 5 columnas configurables desde `TASK_STATUS_CONFIG`
- Props: `tasks`, `onEditTask`, `onDeleteTask`, `onMoveTask`
- **Drag & drop:** HTML5 native (`draggable`, `onDragStart`, `onDrop`)
- Cada tarjeta muestra: título, badge prioridad, badges fecha, botones editar/eliminar

### 4.4 Gantt Chart (`src/components/dashboard/gantt-chart.tsx`)

- Visualización de barras horizontales por tarea
- Colores por status
- No interactivo (solo lectura)

---

## 5. Tipos TypeScript (`src/types/index.ts`)

```typescript
UserRole       = "admin" | "programmer" | "client"
ProjectStatus  = "active" | "paused" | "completed" | "archived"
TaskStatus     = "backlog" | "todo" | "in_progress" | "review" | "done"
TaskPriority   = "low" | "medium" | "high" | "critical"
LicenseStatus  = "active" | "expiring_soon" | "expired"
HealthStatus   = "healthy" | "degraded" | "down" | "unknown"

Interfaces: User, Project, Domain, Task, License, Credential,
            HealthCheck, InventoryItem, DashboardStats
```

---

## 6. Base de Datos — Supabase Schema

**Archivo:** `supabase/schema.sql` (291 líneas, completamente idempotente)

### 6.1 Tablas

| Tabla | Descripción | FK principales |
|-------|-------------|----------------|
| `users` | Perfiles (linked to `auth.users`) | `auth.users(id)` |
| `projects` | Proyectos de la agencia | — |
| `domains` | Subdominios por proyecto | `projects(id)` |
| `tasks` | Tareas con Kanban status | `projects(id)`, `users(id)` |
| `licenses` | Licencias y suscripciones | `projects(id)` |
| `credentials` | Credenciales cifradas | `projects(id)` |
| `health_checks` | Resultados de health checks | `projects(id)` |
| `inventory` | Equipos IoT/hardware | `projects(id)`, `users(id)` |

### 6.2 ENUMs

`user_role`, `project_status`, `task_status`, `task_priority`, `license_status`, `health_status`, `ssl_status`, `inventory_status`

### 6.3 RLS Policies

- **Admin:** Full access a TODAS las tablas
- **Programmer:** SELECT en `projects`, ALL en `tasks` (propias o sin asignar)
- **Client:** Solo SELECT en su propio perfil (`users`)

### 6.4 Triggers

`updated_at` se actualiza automáticamente en: `users`, `projects`, `tasks`, `licenses`, `credentials`, `inventory`

### 6.5 Seed Data

- 6 proyectos iniciales: DrPollitoApp, Maps, Armados2Go, TheYellowExpress, ContaPro, Logitrack
- 6 dominios correspondientes (generados desde los proyectos)

### 6.6 Estado

**⚠️ PENDIENTE: El schema NO ha sido ejecutado en Supabase.** Se debe copiar y pegar `supabase/schema.sql` en el SQL Editor de Supabase para crear las tablas.

---

## 7. Variables de Entorno

**Archivo:** `.env.local` (NO en git, protegido por `.gitignore`)

```env
NEXT_PUBLIC_SUPABASE_URL=https://[project-id].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon-key]
CREDENTIALS_ENCRYPTION_KEY=[tu-clave-aqui]
NEXT_PUBLIC_ROOT_DOMAIN=puntocero.dev
```

**Plantilla:** `.env.local.example` incluye también campos opcionales para Telegram (bot token, chat ID).

---

## 8. DNS — GoDaddy

| Tipo | Host | Valor | Propósito |
|------|------|-------|-----------|
| A | @ | 76.76.21.21 | Root domain → Vercel |
| CNAME | www | cname.vercel-dns.com | www subdomain |
| CNAME | * | cname.vercel-dns.com | Wildcard subdomains |
| MX | @ | (Zoho records) | Email |
| TXT | @ | (Zoho verification) | Email verification |

---

## 9. Proyectos Gestionados

| Proyecto | Slug | Subdominio | Color |
|----------|------|-----------|-------|
| DrPollitoApp | `drpollitoapp` | `drpollito.puntocero.dev` | `#F59E0B` |
| Maps | `maps` | `maps.puntocero.dev` | `#3B82F6` |
| Armados2Go | `armados2go` | `armados2go.puntocero.dev` | `#10B981` |
| TheYellowExpress | `theyellowexpress` | `theyellowexpress.puntocero.dev` | `#EAB308` |
| ContaPro | `contapro` | `contapro.puntocero.dev` | `#8B5CF6` |
| Logitrack | `logitrack` | `logitrack.puntocero.dev` | `#EF4444` |

Definidos en `src/lib/constants.ts` como `PROJECTS`.

---

## 10. Lo que FUNCIONA (Estado Actual)

| Funcionalidad | Estado | Notas |
|---------------|--------|-------|
| Landing page pública | ✅ | Con todas las secciones y links |
| Login modal (UI) | ✅ | Sin validación real |
| Dashboard overview | ✅ | Data demo |
| Crear proyecto | ✅ | Estado local (no persiste) |
| Tareas: agregar, editar, eliminar | ✅ | Estado local |
| Kanban drag & drop | ✅ | HTML5 native |
| Gantt chart (visual) | ✅ | Solo lectura |
| Licencias: CRUD completo | ✅ | Estado local |
| Credenciales: CRUD + show/hide | ✅ | Estado local, passwords demo |
| Dominios: CRUD completo | ✅ | Estado local |
| Inventario: CRUD completo | ✅ | Estado local |
| Health check (UI) | ✅ | Data demo, sin pings reales |
| Settings (UI) | ✅ | Sin persistencia |
| Sidebar colapsable | ✅ | — |
| Notificaciones (UI) | ✅ | 3 notificaciones demo |
| Logout | ✅ | Redirige a `/` |
| Showcase pages | ✅ | Landing dinámica por proyecto |
| Vercel deploy | ✅ | Auto-deploy desde `main` |
| DNS wildcard | ✅ | `*.puntocero.dev` → Vercel |

---

## 11. PENDIENTE (Priorizado)

### 🔴 Prioridad Alta

1. **Ejecutar `schema.sql` en Supabase SQL Editor**
   - Copiar contenido de `supabase/schema.sql` → Supabase Dashboard → SQL Editor → Run
   - Esto creará todas las tablas, indexes, RLS, triggers y seed data

2. **Integrar Supabase Auth (login real)**
   - Archivo clave: `src/app/login/page.tsx` (tiene `TODO` en línea 24)
   - Landing modal en `src/app/page.tsx` (línea 56-58 redirige sin validar)
   - Crear usuarios en Supabase Auth según sea necesario
   - Conectar `src/lib/supabase/client.ts` y `middleware.ts`
   - Proteger rutas `/dashboard/*` → redirigir a login si no hay sesión

3. **Conectar CRUD a Supabase (persistencia real)**
   - Actualmente TODO el CRUD es `useState` local — se pierde al recargar
   - Cada página necesita reemplazar `useState<X[]>(DEMO_DATA)` por queries a Supabase:
     - `licenses/page.tsx` → tabla `licenses`
     - `credentials/page.tsx` → tabla `credentials` + `encrypt()`/`decrypt()`
     - `domains/page.tsx` → tabla `domains`
     - `inventory/page.tsx` → tabla `inventory`
     - `projects/page.tsx` → tabla `projects`
     - `projects/[slug]/page.tsx` → tabla `tasks`
   - Dashboard overview → queries agregadas

4. **Cifrado real de credenciales**
   - `src/lib/crypto.ts` tiene `encrypt()`/`decrypt()` listos
   - Usar `CREDENTIALS_ENCRYPTION_KEY` de `.env.local`
   - En `credentials/page.tsx`: cifrar al guardar, descifrar al revelar

### 🟡 Prioridad Media

5. **Health check funcional**
   - Implementar pings reales en `/api/health-check/`
   - Conectar botón "Verificar ahora" en `health/page.tsx`
   - Guardar resultados en tabla `health_checks`
   - Cron job o Edge Function para verificaciones periódicas

6. **Middleware de subdominios**
   - Next.js 16 muestra warning: middleware está deprecado, usar `proxy`
   - El archivo `src/lib/supabase/middleware.ts` existe pero no hay `middleware.ts` en la raíz del proyecto para ruteo de subdominios
   - Necesita: detectar `*.puntocero.dev` → rewrite a `/showcase/[subdomain]`

7. **Notificaciones reales**
   - Integrar Telegram Bot API (tokens en `.env.local.example`)
   - Alertas: licencias por vencer, health check failures, build fails
   - Reemplazar las 3 notificaciones demo en `header.tsx`

8. **Búsqueda funcional**
   - El input de búsqueda en el header es solo UI
   - Implementar búsqueda global por proyectos, tareas, credenciales

9. **Settings con persistencia**
   - Los formularios de configuración no guardan nada
   - Crear tabla `settings` en Supabase o usar `localStorage`

### 🟢 Prioridad Baja

10. **Perfil de usuario**
    - Botón "Perfil" muestra un `alert()` placeholder
    - Crear página `/dashboard/profile` con datos del usuario autenticado

11. **Tema Light/Dark toggle**
    - Dark mode está hardcodeado en `layout.tsx` (`<html className="dark">`)
    - Implementar toggle real con `next-themes` o similar

12. **Mobile responsive**
    - El sidebar no tiene versión mobile (hamburger menu)
    - Considerar `Sheet` component para mobile

13. **Roles en frontend**
    - Los tipos definen `admin`, `programmer`, `client` pero no se usan
    - Implementar vista diferenciada según rol del usuario autenticado

---

## 12. Constantes Importantes

### Archivo: `src/lib/constants.ts`

```typescript
// Proyectos
PROJECTS = [
  { name: "DrPollitoApp", slug: "drpollitoapp", color: "#F59E0B", subdomain: "drpollito" },
  { name: "Maps",         slug: "maps",         color: "#3B82F6", subdomain: "maps" },
  // ... 6 total
]

// Estados de tareas (Kanban)
TASK_STATUS_CONFIG = {
  backlog:     { label: "Backlog",      color: "bg-zinc-500" },
  todo:        { label: "Por hacer",    color: "bg-blue-500" },
  in_progress: { label: "En progreso",  color: "bg-amber-500" },
  review:      { label: "Revisión",     color: "bg-purple-500" },
  done:        { label: "Hecho",        color: "bg-emerald-500" },
}

// Prioridades
PRIORITY_CONFIG = {
  low:      { label: "Baja",     color: "text-zinc-400" },
  medium:   { label: "Media",    color: "text-blue-400" },
  high:     { label: "Alta",     color: "text-amber-400" },
  critical: { label: "Crítica",  color: "text-red-400" },
}

// Proveedores de licencias
LICENSE_PROVIDERS = [
  "Windsurf", "Gemini", "Railway", "Vercel", "Supabase",
  "GoDaddy", "Bluehost", "GitHub", "Figma", "AWS", "Cloudflare",
]

BASE_DOMAIN = "puntocero.dev"
```

---

## 13. Zustand Store

### `src/store/use-project-store.ts`

```typescript
interface ProjectStore {
  currentProject: Project | null;
  projects: Project[];
  setCurrentProject: (project: Project | null) => void;
  setProjects: (projects: Project[]) => void;
}
```

**Nota:** Este store existe pero NO se usa activamente en ninguna página. Las páginas usan `useState` local con data demo. Cuando se integre Supabase, este store debería usarse para compartir estado entre componentes.

---

## 14. Reglas de Desarrollo

1. **Minimalismo incremental** — Solo construir lo necesario para la fase actual
2. **Backend primero** — Definir endpoints y lógica antes de UI
3. **JWT con roles reales** — Admin puede gestionar catálogos; Programmer opera tareas
4. **No borrar en cascada** — Inactivar antes de eliminar; FKs protegen datos
5. **IA con fallback** — Si no hay datos reales, usar defaults
6. **Dark mode consistente** — Badges, botones primarios/secundarios
7. **Microservicios desacoplados** — Cada servicio con su Dockerfile (aplica a Logitrack)
8. **`.env.local` NUNCA en git** — Protegido por `.gitignore`

---

## 15. Comandos Útiles

```bash
# Instalar dependencias
npm install

# Desarrollo local (puerto 3005)
npm run dev -- -p 3005

# Build de producción
npm run build

# Lint
npm run lint

# Deploy (automático vía push a main)
git push origin main
```

---

## 16. Errores Resueltos (Historial)

| Error | Causa | Fix |
|-------|-------|-----|
| `Module not found: @/components/ui/alert-dialog` | Archivo no existía | Creado `alert-dialog.tsx` con estilo ShadcnUI |
| `Type 'string' not assignable to 'TaskStatus'` | `moveTask` usaba `string` | Cast `as TaskStatus` en 3 lugares + import del tipo |
| `React hooks en Server Component` | Faltaba `"use client"` | Agregado directive en `page.tsx` |
| Zustand import warning | Sintaxis antigua `import create` | Cambiado a `import { create }` |
| DNS no propagado | Records incorrectos en GoDaddy | Corregido A, CNAME, wildcard |
| Botones no funcionales | Sin `onClick` handlers | Agregados handlers y estado |

---

## 17. Archivos Clave para Modificar (Próxima Fase)

Para integrar Supabase, estos son los archivos que necesitan cambios:

1. `src/app/page.tsx` — Login modal → Supabase Auth
2. `src/app/login/page.tsx` — Login page → Supabase Auth
3. `src/app/dashboard/page.tsx` — Overview → Supabase queries
4. `src/app/dashboard/projects/page.tsx` — `useState` → Supabase `projects`
5. `src/app/dashboard/projects/[slug]/page.tsx` — `useState` → Supabase `tasks`
6. `src/app/dashboard/licenses/page.tsx` — `useState` → Supabase `licenses`
7. `src/app/dashboard/credentials/page.tsx` — `useState` → Supabase `credentials` + crypto
8. `src/app/dashboard/domains/page.tsx` — `useState` → Supabase `domains`
9. `src/app/dashboard/inventory/page.tsx` — `useState` → Supabase `inventory`
10. `src/app/dashboard/health/page.tsx` — Pings reales + Supabase `health_checks`
11. `src/components/dashboard/header.tsx` — User real, notificaciones reales

---

*Documento generado para continuidad de desarrollo. Cualquier modelo o desarrollador puede retomar el proyecto con esta guía.*
