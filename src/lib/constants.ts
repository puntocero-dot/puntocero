export const PROJECTS = [
  {
    name: 'Proyecto Alpha',
    slug: 'proyecto-alpha',
    color: '#0f172a',
    subdomain: 'alpha',
    links: [
      {
        label: 'Production Frontend',
        url: 'https://alpha-frontend.demo.app'
      },
      {
        label: 'GitHub',
        url: 'https://github.com/demo-org/alpha'
      }
    ],
    credentials: [
      {
        label: 'Admin Portal',
        username: 'admin@demo.com',
        url: 'https://alpha.demo.app/dashboard',
        encrypted_password: 'U2FsdGVkX19kZW1vX2RhdGFfX19kZW1vX2RhdGFfX19kZW1vX2RhdGE='
      }
    ]
  },
  {
    name: 'ERP Contable',
    slug: 'erp-contable',
    color: '#1e3a8a',
    subdomain: 'contable',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/demo-org/erp-contable'
      }
    ],
    credentials: [
      {
        label: 'Super Admin',
        username: 'admin@contable.demo',
        url: 'https://contable.demo.app/login',
        encrypted_password: 'U2FsdGVkX19kZW1vX2RhdGFfX19kZW1vX2RhdGFfX19kZW1vX2RhdGE='
      }
    ]
  },
  {
    name: 'Sistema QR',
    slug: 'sistema-qr',
    color: '#f59e0b',
    subdomain: 'qr-system',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/demo-org/qr-system'
      }
    ],
    credentials: [
      {
        label: 'Vendor Portal',
        username: 'vendedor_demo',
        url: 'https://qr.demo.app/vendor',
        encrypted_password: 'U2FsdGVkX19kZW1vX2RhdGFfX19kZW1vX2RhdGFfX19kZW1vX2RhdGE='
      }
    ]
  }
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
