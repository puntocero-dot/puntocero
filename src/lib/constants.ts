export const PROJECTS = [
  { 
    name: "DrPollitoApp", 
    slug: "drpollitoapp", 
    color: "#F59E0B", 
    subdomain: "drpollito",
    links: [
      { label: "Vercel", url: "https://vercel.com" },
      { label: "Supabase", url: "https://supabase.com" },
      { label: "GitHub", url: "https://github.com" }
    ]
  },
  { 
    name: "Maps", 
    slug: "maps", 
    color: "#3B82F6", 
    subdomain: "maps",
    links: [
      { label: "Google Maps API", url: "https://console.cloud.google.com" },
      { label: "Railway", url: "https://railway.app" }
    ]
  },
  { name: "Armados2Go", slug: "armados2go", color: "#10B981", subdomain: "armados2go" },
  { name: "TheYellowExpress", slug: "theyellowexpress", color: "#EAB308", subdomain: "theyellowexpress" },
  { name: "ContaPro", slug: "contapro", color: "#8B5CF6", subdomain: "contapro" },
  { name: "Logitrack", slug: "logitrack", color: "#EF4444", subdomain: "logitrack" },
] as const;

export const BASE_DOMAIN = "puntocero.dev";

export const TASK_STATUS_CONFIG = {
  backlog: { label: "Backlog", color: "bg-zinc-500" },
  todo: { label: "Por hacer", color: "bg-blue-500" },
  in_progress: { label: "En progreso", color: "bg-amber-500" },
  review: { label: "Revisión", color: "bg-purple-500" },
  done: { label: "Hecho", color: "bg-emerald-500" },
} as const;

export const PRIORITY_CONFIG = {
  low: { label: "Baja", color: "text-zinc-400" },
  medium: { label: "Media", color: "text-blue-400" },
  high: { label: "Alta", color: "text-amber-400" },
  critical: { label: "Crítica", color: "text-red-400" },
} as const;

export const LICENSE_PROVIDERS = [
  "Windsurf", "Gemini", "Railway", "Vercel", "Supabase",
  "GoDaddy", "Bluehost", "GitHub", "Figma", "AWS", "Cloudflare",
] as const;
