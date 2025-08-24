import { useEffect } from 'react';

/**
 * Auto-updates when a new service worker is available.
 * Place near root (e.g., in App) so it runs once.
 */
export default function AutoUpgrade() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    let reg: ServiceWorkerRegistration | null = null;

    const check = async () => {
      try {
        reg = await navigator.serviceWorker.getRegistration();
        await reg?.update();
        reg?.addEventListener('updatefound', () => {
          const sw = reg?.installing;
          sw?.addEventListener('statechange', () => {
            if (sw?.state === 'installed' && navigator.serviceWorker.controller) {
              const ok = window.confirm('קיימת גרסה חדשה של האפליקציה. לרענן עכשיו?');
              if (ok) window.location.reload();
            }
          });
        });
      } catch {}
    };

    const id = setInterval(check, 60_000); // check every minute
    check();
    return () => clearInterval(id);
  }, []);

  return null;
}
