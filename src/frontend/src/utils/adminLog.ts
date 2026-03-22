export interface AdminLogEntry {
  timestamp: string;
  action: string;
}

const LOG_KEY = "pip-admin-log";

export function logAdminAction(action: string): void {
  try {
    const existing: AdminLogEntry[] = JSON.parse(
      localStorage.getItem(LOG_KEY) ?? "[]",
    );
    existing.unshift({
      timestamp: new Date().toISOString(),
      action,
    });
    // Keep last 200 entries
    localStorage.setItem(LOG_KEY, JSON.stringify(existing.slice(0, 200)));
  } catch {
    // Silent fail
  }
}

export function loadAdminLog(): AdminLogEntry[] {
  try {
    return JSON.parse(localStorage.getItem(LOG_KEY) ?? "[]") as AdminLogEntry[];
  } catch {
    return [];
  }
}

export function clearAdminLog(): void {
  localStorage.removeItem(LOG_KEY);
}

export function getAdminPassword(): string {
  return localStorage.getItem("pip-admin-password") ?? "2024ForrealDanBowie";
}
