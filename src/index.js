/**
 * PinoySeoul Google Productivity Redirects (v3.0 SSO Integrated)
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    const path = url.pathname;
    const clientIp = request.headers.get("CF-Connecting-IP");
    const accessJwt = request.headers.get("Cf-Access-Jwt-Assertion");
    const userEmail = request.headers.get("Cf-Access-Authenticated-User-Email");
    const domain = "pinoyseoul.com";
    const blogId = "1152873755750876729";

    // --- Part 1: Quota Safety & Path Guard ---
    if (path !== "/") return fetch(request);

    // --- Part 2: Silent Network Unlock (SSO Logic) ---
    // If the user has passed Cloudflare Access, whitelist their IP in the background.
    if (accessJwt && clientIp) {
      ctx.waitUntil(this.updateWhitelist(clientIp, userEmail, env));
    }

    // --- Part 3: Google Workspace Redirect Logic ---
    const targets = {
      "drive.pinoyseoul.com":    "https://drive.google.com/drive/shared-drives",
      "docs.pinoyseoul.com":     "https://docs.google.com/document/create",
      "sheets.pinoyseoul.com":   "https://docs.google.com/spreadsheets/create",
      "slides.pinoyseoul.com":   "https://docs.google.com/presentation/create",
      "mail.pinoyseoul.com":     "https://mail.google.com/mail/?view=cm&fs=1",
      "meet.pinoyseoul.com":     "https://meet.google.com/new",
      "calendar.pinoyseoul.com": "https://calendar.google.com/calendar/u/0/r/eventedit",
      "groups.pinoyseoul.com":   "https://groups.google.com/a/" + domain + "/g/admin",
      "chat.pinoyseoul.com":     "https://chat.google.com/u/0/app/chat/AAQAotoa0bE",
      "forms.pinoyseoul.com":    "https://docs.google.com/forms/create",
      "sites.pinoyseoul.com":    "https://sites.google.com/new",
      "keep.pinoyseoul.com":     "https://keep.google.com/#create",
      "tasks.pinoyseoul.com":    "https://calendar.google.com/calendar/r/tasks",
      "contacts.pinoyseoul.com": "https://contacts.google.com/new",
      "script.pinoyseoul.com":   "https://script.google.com/home/all",
      "blog.pinoyseoul.com":     "https://www.blogger.com/blog/posts/" + blogId,
      "admin.pinoyseoul.com":    "https://admin.google.com/ac/users"
    };

    const actionTarget = targets[host];

    if (actionTarget) {
      // Ironclad Organizational Bouncer
      const enforcerUrl = "https://www.google.com/a/" + domain + "/ServiceLogin?continue=" + encodeURIComponent(actionTarget);
      return Response.redirect(enforcerUrl, 302);
    }

    return fetch(request);
  },

  async updateWhitelist(ip, email, env) {
    try {
      // Check if already in memory
      const existing = await env.SSO_STATE.get("ip:" + ip);
      if (existing) return;

      const apiUrl = "https://api.cloudflare.com/client/v4/accounts/" + env.CF_ACCOUNT_ID + "/gateway/lists/" + env.CF_LIST_ID;
      
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Authorization": "Bearer " + env.CF_API_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          append: [{ value: ip, description: "Unlocked by " + (email || "user") }]
        }),
      });

      if (response.ok) {
        const expiry = Date.now() + (30 * 24 * 60 * 60 * 1000);
        await env.SSO_STATE.put("ip:" + ip, JSON.stringify({ expiry, email: (email || "PinoySeoul User") }));
        console.log("[Google SSO] Network unlocked for: " + ip);
      }
    } catch (e) {
      console.error("[Google SSO] Error: " + e.message);
    }
  }
};
