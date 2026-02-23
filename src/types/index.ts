// ============================================================
// Punto Cero Core – Domain Types
// ============================================================

export type UserRole = "admin" | "programmer" | "client";

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export type ProjectStatus = "active" | "paused" | "completed" | "archived";

export interface Project {
  id: string;
  name: string;
  slug: string;
  description?: string;
  status: ProjectStatus;
  color: string;
  icon_url?: string;
  subdomain?: string;
  repo_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Domain {
  id: string;
  project_id: string;
  subdomain: string;
  custom_domain?: string;
  is_active: boolean;
  ssl_status: "pending" | "active" | "error";
  created_at: string;
}

export type TaskStatus = "backlog" | "todo" | "in_progress" | "review" | "done";
export type TaskPriority = "low" | "medium" | "high" | "critical";

export interface Task {
  id: string;
  project_id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee_id?: string;
  due_date?: string;
  start_date?: string;
  order_index: number;
  created_at: string;
  updated_at: string;
  // joined
  assignee?: User;
  project?: Project;
}

export type LicenseStatus = "active" | "expiring_soon" | "expired";

export interface License {
  id: string;
  name: string;
  provider: string;
  cost_monthly?: number;
  cost_yearly?: number;
  renewal_date: string;
  status: LicenseStatus;
  project_id?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  // joined
  project?: Project;
}

export interface Credential {
  id: string;
  project_id: string;
  label: string;
  username?: string;
  encrypted_password: string;
  api_key?: string;
  url?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  // joined
  project?: Project;
}

export type HealthStatus = "healthy" | "degraded" | "down" | "unknown";

export interface HealthCheck {
  id: string;
  project_id: string;
  endpoint_url: string;
  status: HealthStatus;
  response_time_ms?: number;
  last_checked_at?: string;
  created_at: string;
}

export interface InventoryItem {
  id: string;
  project_id?: string;
  name: string;
  serial_number?: string;
  category: string;
  status: "available" | "deployed" | "maintenance" | "retired";
  warranty_expiry?: string;
  client_id?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

// Dashboard aggregated stats
export interface DashboardStats {
  total_projects: number;
  active_projects: number;
  total_tasks: number;
  tasks_done: number;
  tasks_in_progress: number;
  licenses_expiring: number;
  services_healthy: number;
  services_total: number;
}
