-- ============================================================
-- Punto Cero Core – Supabase Schema
-- Run this in the Supabase SQL Editor
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- ENUM TYPES (safe re-run with DO blocks)
-- ============================================================
DO $$ BEGIN CREATE TYPE user_role AS ENUM ('admin', 'programmer', 'client'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE project_status AS ENUM ('active', 'paused', 'completed', 'archived'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE task_status AS ENUM ('backlog', 'todo', 'in_progress', 'review', 'done'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE task_priority AS ENUM ('low', 'medium', 'high', 'critical'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE license_status AS ENUM ('active', 'expiring_soon', 'expired'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE health_status AS ENUM ('healthy', 'degraded', 'down', 'unknown'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE ssl_status AS ENUM ('pending', 'active', 'error'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE inventory_status AS ENUM ('available', 'deployed', 'maintenance', 'retired'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ============================================================
-- USERS (profiles linked to Supabase Auth)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL DEFAULT '',
  role user_role NOT NULL DEFAULT 'client',
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- PROJECTS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  status project_status NOT NULL DEFAULT 'active',
  color TEXT NOT NULL DEFAULT '#3B82F6',
  icon_url TEXT,
  subdomain TEXT UNIQUE,
  repo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- DOMAINS (subdomain routing)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.domains (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  subdomain TEXT UNIQUE NOT NULL,
  custom_domain TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  ssl_status ssl_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TASKS (Kanban & Gantt)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status task_status NOT NULL DEFAULT 'backlog',
  priority task_priority NOT NULL DEFAULT 'medium',
  assignee_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  due_date DATE,
  start_date DATE,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- LICENSES & SUBSCRIPTIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.licenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  provider TEXT NOT NULL,
  cost_monthly NUMERIC(10,2),
  cost_yearly NUMERIC(10,2),
  renewal_date DATE NOT NULL,
  status license_status NOT NULL DEFAULT 'active',
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- CREDENTIALS (encrypted secrets)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.credentials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  username TEXT,
  encrypted_password TEXT NOT NULL,
  api_key TEXT,
  url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- HEALTH CHECKS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.health_checks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  endpoint_url TEXT NOT NULL,
  status health_status NOT NULL DEFAULT 'unknown',
  response_time_ms INTEGER,
  last_checked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- INVENTORY (IoT / Hardware)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.inventory (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  serial_number TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  status inventory_status NOT NULL DEFAULT 'available',
  warranty_expiry DATE,
  client_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_tasks_project ON public.tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON public.tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_assignee ON public.tasks(assignee_id);
CREATE INDEX IF NOT EXISTS idx_licenses_renewal ON public.licenses(renewal_date);
CREATE INDEX IF NOT EXISTS idx_domains_subdomain ON public.domains(subdomain);
CREATE INDEX IF NOT EXISTS idx_health_checks_project ON public.health_checks(project_id);
CREATE INDEX IF NOT EXISTS idx_credentials_project ON public.credentials(project_id);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;

-- Admin: full access to everything (DROP + CREATE for idempotency)
DO $$ BEGIN
  DROP POLICY IF EXISTS "admin_full_access_users" ON public.users;
  DROP POLICY IF EXISTS "admin_full_access_projects" ON public.projects;
  DROP POLICY IF EXISTS "admin_full_access_domains" ON public.domains;
  DROP POLICY IF EXISTS "admin_full_access_tasks" ON public.tasks;
  DROP POLICY IF EXISTS "admin_full_access_licenses" ON public.licenses;
  DROP POLICY IF EXISTS "admin_full_access_credentials" ON public.credentials;
  DROP POLICY IF EXISTS "admin_full_access_health_checks" ON public.health_checks;
  DROP POLICY IF EXISTS "admin_full_access_inventory" ON public.inventory;
  DROP POLICY IF EXISTS "programmer_read_projects" ON public.projects;
  DROP POLICY IF EXISTS "programmer_tasks" ON public.tasks;
  DROP POLICY IF EXISTS "user_read_own_profile" ON public.users;
END $$;

CREATE POLICY "admin_full_access_users" ON public.users
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin')
  );

CREATE POLICY "admin_full_access_projects" ON public.projects
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin')
  );

CREATE POLICY "admin_full_access_domains" ON public.domains
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin')
  );

CREATE POLICY "admin_full_access_tasks" ON public.tasks
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin')
  );

CREATE POLICY "admin_full_access_licenses" ON public.licenses
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin')
  );

CREATE POLICY "admin_full_access_credentials" ON public.credentials
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin')
  );

CREATE POLICY "admin_full_access_health_checks" ON public.health_checks
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin')
  );

CREATE POLICY "admin_full_access_inventory" ON public.inventory
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin')
  );

-- Programmer: read projects, read/write own tasks
CREATE POLICY "programmer_read_projects" ON public.projects
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'programmer')
  );

CREATE POLICY "programmer_tasks" ON public.tasks
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'programmer')
    AND (assignee_id = auth.uid() OR assignee_id IS NULL)
  );

-- Client: read own profile only
CREATE POLICY "user_read_own_profile" ON public.users
  FOR SELECT USING (id = auth.uid());

-- ============================================================
-- TRIGGERS: auto-update updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_users_updated_at ON public.users;
CREATE TRIGGER tr_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS tr_projects_updated_at ON public.projects;
CREATE TRIGGER tr_projects_updated_at BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS tr_tasks_updated_at ON public.tasks;
CREATE TRIGGER tr_tasks_updated_at BEFORE UPDATE ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS tr_licenses_updated_at ON public.licenses;
CREATE TRIGGER tr_licenses_updated_at BEFORE UPDATE ON public.licenses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS tr_credentials_updated_at ON public.credentials;
CREATE TRIGGER tr_credentials_updated_at BEFORE UPDATE ON public.credentials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS tr_inventory_updated_at ON public.inventory;
CREATE TRIGGER tr_inventory_updated_at BEFORE UPDATE ON public.inventory
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- SEED: Initial Projects
-- ============================================================
INSERT INTO public.projects (name, slug, description, status, color, subdomain) VALUES
  ('DrPollitoApp', 'drpollitoapp', 'Plataforma veterinaria inteligente', 'active', '#F59E0B', 'drpollito'),
  ('Maps', 'maps', 'Servicio de mapas y geolocalización', 'active', '#3B82F6', 'maps'),
  ('Armados2Go', 'armados2go', 'Marketplace de armado de PCs', 'active', '#10B981', 'armados2go'),
  ('TheYellowExpress', 'theyellowexpress', 'Logística de última milla', 'active', '#EAB308', 'theyellowexpress'),
  ('ContaPro', 'contapro', 'Software contable en la nube', 'active', '#8B5CF6', 'contapro'),
  ('Logitrack', 'logitrack', 'Rastreo y optimización de flotas', 'active', '#EF4444', 'logitrack')
ON CONFLICT (slug) DO NOTHING;

-- Seed domains for each project
INSERT INTO public.domains (project_id, subdomain, is_active, ssl_status)
SELECT id, subdomain, TRUE, 'active' FROM public.projects WHERE subdomain IS NOT NULL
ON CONFLICT (subdomain) DO NOTHING;
