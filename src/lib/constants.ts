export const PROJECTS = [
  {
    name: 'My_Dr',
    slug: 'my-dr',
    color: '#0f172a',
    subdomain: 'drpollito',
    links: [
      {
        label: 'Production Frontend',
        url: 'https://frontend-production-c880.up.railway.app'
      },
      {
        label: 'Custom Domain',
        url: 'https://drpollito.puntocero.dev'
      },
      {
        label: 'Railway Backend',
        url: 'https://backend-production-e373.up.railway.app'
      },
      {
        label: 'GitHub',
        url: 'https://github.com/puntocero-dot/drpollito'
      }
    ],
    credentials: [
      {
        label: 'Admin Portal',
        username: 'admin@mydr.com',
        url: 'https://drpollito.puntocero.dev/dashboard',
        encrypted_password: 'U2FsdGVkX19afFzIm58UPF/hI7gvHzhjP1yrbeFdZgQ='
      },
      {
        label: 'Doctor Access',
        username: 'doctor@mydr.com',
        url: 'https://drpollito.puntocero.dev/dashboard',
        encrypted_password: 'U2FsdGVkX1/OsEgI2Nf4083jxts6mZ99/IeVanXi5NQ='
      }
    ]
  },
  {
    name: 'Conta2Go',
    slug: 'conta2go',
    color: '#1e3a8a',
    subdomain: 'conta2go',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/puntocero-dot/conta2go'
      }
    ],
    credentials: [
      {
        label: 'Super Admin',
        username: 'admin@conta2go.com',
        url: 'https://conta2go.up.railway.app/login',
        encrypted_password: 'U2FsdGVkX18rJ/beWgGdvpv2dGslY2QBAuIYP1Z1Uig='
      },
      {
        label: 'Contador',
        username: 'contador@conta2go.com',
        url: 'https://conta2go.up.railway.app/login',
        encrypted_password: 'U2FsdGVkX19lQU100EmtrZ44acW4H892e0B9TkQTS88='
      }
    ]
  },
  {
    name: 'QR_Pass',
    slug: 'qr-pass',
    color: '#f59e0b',
    subdomain: 'qr-pass',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/puntocero-dot/QR_Pass'
      }
    ],
    credentials: [
      {
        label: 'Vendor Portal',
        username: 'vendedor',
        url: 'https://qrpass.up.railway.app/vendor.html',
        encrypted_password: 'U2FsdGVkX19YkkLDgBcBZQ5PLyV8ihX3+6gSxDPQ8+4='
      },
      {
        label: 'Admin Console',
        username: 'admin',
        url: 'https://qrpass.up.railway.app/admin',
        encrypted_password: 'U2FsdGVkX18Kh3PMn1C52P3xDjFivWi7Sciaj0Nnnso='
      }
    ]
  },
  {
    name: 'Oh Pair',
    slug: 'ohpair',
    color: '#F9F7F2',
    subdomain: 'ohpair',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/puntocero-dot/ohpair.sv'
      }
    ],
    credentials: [
      {
        label: 'Admin Backoffice',
        username: 'admin',
        url: 'https://ohpair.up.railway.app/admin.html',
        encrypted_password: 'U2FsdGVkX19KTF8jykXqhdv384HBTb0n550k0RY5wwg='
      }
    ]
  },
  {
    name: 'Logitrack',
    slug: 'logitrack',
    color: '#000000',
    subdomain: 'logitrack',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/puntocero-dot/logitrack'
      }
    ],
    credentials: [
      {
        label: 'API Gateway',
        username: 'superadmin',
        url: 'https://logitrack-gateway.up.railway.app',
        encrypted_password: 'U2FsdGVkX1/VQz1IDCXZlomjzr5l9lA8Jz+KCmigXhX0VKG9oBKVvqVtISRv45rQ'
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
