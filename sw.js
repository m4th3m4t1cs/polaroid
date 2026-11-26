// Polaroid service worker: shows phone notifications.
const PUSH = "https://polaroid-push.m4th3m4t1cs.workers.dev";
const WHO = new URL(self.location.href).searchParams.get("who") || "";

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));

self.addEventListener("push", e => e.waitUntil((async () => {
  let m = { title: "polaroid", body: "something new for you ♡" };
  try { const r = await fetch(`${PUSH}/last?who=${WHO}`, { cache: "no-store" }); if (r.ok) m = await r.json(); } catch {}
  await self.registration.showNotification(m.title, { body: m.body, icon: "icon-180.png?v=4", badge: "icon-180.png?v=4", tag: "polaroid", renotify: true });
})()));

self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil((async () => {
    const wins = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    if (wins.length) return wins[0].focus();
    return self.clients.openWindow(`./?me=${WHO}`);
  })());
});
