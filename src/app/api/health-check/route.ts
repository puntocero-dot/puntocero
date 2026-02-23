import { NextResponse } from "next/server";

interface HealthResult {
  project: string;
  endpoint: string;
  status: "healthy" | "degraded" | "down";
  responseTime: number;
  checkedAt: string;
}

const ENDPOINTS = [
  { project: "Maps", url: "https://maps.puntocero.dev" },
  { project: "Logitrack", url: "https://logitrack.puntocero.dev" },
  { project: "DrPollitoApp", url: "https://drpollito.puntocero.dev" },
  { project: "Armados2Go", url: "https://armados2go.puntocero.dev" },
  { project: "ContaPro", url: "https://contapro.puntocero.dev" },
  { project: "TheYellowExpress", url: "https://theyellowexpress.puntocero.dev" },
];

async function checkEndpoint(project: string, url: string): Promise<HealthResult> {
  const start = Date.now();
  try {
    const res = await fetch(url, {
      method: "HEAD",
      signal: AbortSignal.timeout(5000),
    });
    const elapsed = Date.now() - start;
    return {
      project,
      endpoint: url,
      status: res.ok ? (elapsed > 1000 ? "degraded" : "healthy") : "down",
      responseTime: elapsed,
      checkedAt: new Date().toISOString(),
    };
  } catch {
    return {
      project,
      endpoint: url,
      status: "down",
      responseTime: Date.now() - start,
      checkedAt: new Date().toISOString(),
    };
  }
}

export async function GET() {
  const results = await Promise.all(
    ENDPOINTS.map((ep) => checkEndpoint(ep.project, ep.url))
  );

  const downServices = results.filter((r) => r.status === "down");

  // TODO: Send Telegram alert if any service is down
  // if (downServices.length > 0) {
  //   await sendTelegramAlert(downServices);
  // }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    summary: {
      total: results.length,
      healthy: results.filter((r) => r.status === "healthy").length,
      degraded: results.filter((r) => r.status === "degraded").length,
      down: downServices.length,
    },
    results,
  });
}
