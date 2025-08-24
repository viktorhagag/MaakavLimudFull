/**
 * Local storage helper with schema versioning + export/import.
 */
export const SCHEMA_VERSION = 2;

type KV = Record<string, unknown>;

const KEY_ROOT = 'torah-tracker';
const KEY_VERSION = `${KEY_ROOT}:schemaVersion`;
const KEY_SETTINGS = `${KEY_ROOT}:settings`;
const KEY_PROGRESS = `${KEY_ROOT}:progress`;

/** Public types used by other modules */
export type ProgressEntry = {
  bookId: string;
  unitId: string;      // e.g., 'ברכות-דף_ב' or 'משנ"ב-סימן_א-סעיף_2'
  done: boolean;
  completedAt?: string; // ISO string
  updatedAt: string;    // ISO string
};

export type Settings = {
  theme: 'light'|'dark'|'sepia'|'ocean'|'royal';
  cloudSync: boolean;
};

export type ExportBundle = {
  schemaVersion: number;
  exportedAt: string;
  settings: Settings;
  progress: ProgressEntry[];
};

export function nowISO() { return new Date().toISOString(); }

export function getVersion(): number {
  const raw = localStorage.getItem(KEY_VERSION);
  return raw ? parseInt(raw, 10) : 0;
}

export function setVersion(v: number) {
  localStorage.setItem(KEY_VERSION, String(v));
}

export function getSettings(): Settings {
  const raw = localStorage.getItem(KEY_SETTINGS);
  if (!raw) return { theme: 'light', cloudSync: false };
  try { return JSON.parse(raw) as Settings; } catch { return { theme: 'light', cloudSync: false }; }
}

export function setSettings(s: Settings) {
  localStorage.setItem(KEY_SETTINGS, JSON.stringify(s));
}

export function getProgress(): ProgressEntry[] {
  const raw = localStorage.getItem(KEY_PROGRESS);
  if (!raw) return [];
  try { return JSON.parse(raw) as ProgressEntry[]; } catch { return []; }
}

export function setProgress(arr: ProgressEntry[]) {
  localStorage.setItem(KEY_PROGRESS, JSON.stringify(arr));
}

/** Upgrades schema if needed. For now, simple reset if version mismatches. */
export function autoUpgrade() {
  const v = getVersion();
  if (v !== SCHEMA_VERSION) {
    // Try minimal migration; currently do reset to avoid inconsistencies
    const settings = getSettings();
    localStorage.removeItem(KEY_PROGRESS);
    setSettings(settings);
    setVersion(SCHEMA_VERSION);
  }
}

export function resetAll() {
  localStorage.removeItem(KEY_SETTINGS);
  localStorage.removeItem(KEY_PROGRESS);
  setVersion(SCHEMA_VERSION);
}

export function exportBundle(): ExportBundle {
  return {
    schemaVersion: SCHEMA_VERSION,
    exportedAt: nowISO(),
    settings: getSettings(),
    progress: getProgress(),
  };
}

export function importBundle(b: ExportBundle) {
  // minimal compatibility check
  if (!b || !Array.isArray(b.progress)) throw new Error('קובץ ייבוא לא תקין');
  setSettings(b.settings ?? { theme: 'light', cloudSync: false });
  setProgress(b.progress ?? []);
  setVersion(SCHEMA_VERSION);
}

/** Utilities for mutating a single entry */
export function upsertProgress(e: Omit<ProgressEntry,'updatedAt'>) {
  const arr = getProgress();
  const i = arr.findIndex(x => x.bookId === e.bookId && x.unitId === e.unitId);
  const record: ProgressEntry = { ...e, updatedAt: nowISO() };
  if (i >= 0) arr[i] = { ...arr[i], ...record };
  else arr.push(record);
  setProgress(arr);
}

export function removeProgress(bookId: string, unitId: string) {
  const arr = getProgress().filter(x => !(x.bookId === bookId && x.unitId === unitId));
  setProgress(arr);
}
