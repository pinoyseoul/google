export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    const domain = "pinoyseoul.com";
    const blogId = "1152873755750876729";

    // 🛡️ NATIVE WORKSPACE ROUTING
    // Using /a/domain/ natively forces Google's enterprise security checks.
    // - PinoySeoul User: Instant access.
    // - Personal Gmail User: 403 Forbidden (Blocked).
    // - Logged Out User: Redirected to login.
    
    const actions = {
      // Core Apps (Support /a/ routing for hard enforcement)
      "drive.pinoyseoul.com":    `https://drive.google.com/a/${domain}/drive/shared-drives`,
      "docs.pinoyseoul.com":     `https://docs.google.com/a/${domain}/document/create`,
      "sheets.pinoyseoul.com":   `https://docs.google.com/a/${domain}/spreadsheets/create`,
      "slides.pinoyseoul.com":   `https://docs.google.com/a/${domain}/presentation/create`,
      "forms.pinoyseoul.com":    `https://docs.google.com/a/${domain}/forms/create`,
      "sites.pinoyseoul.com":    `https://sites.google.com/a/${domain}/new`,
      "mail.pinoyseoul.com":     `https://mail.google.com/a/${domain}/mail/?view=cm&fs=1`,
      "calendar.pinoyseoul.com": `https://calendar.google.com/a/${domain}/calendar/r/eventedit`,
      "groups.pinoyseoul.com":   `https://groups.google.com/a/${domain}/g/admin`,
      "admin.pinoyseoul.com":    `https://admin.google.com/a/${domain}/ac/users`,
      
      // Secondary Apps (Do not support /a/ routing natively, fallback to authuser hints)
      "meet.pinoyseoul.com":     `https://meet.google.com/new?authuser=${domain}`,
      "chat.pinoyseoul.com":     `https://chat.google.com/app/chat/AAQAotoa0bE?authuser=${domain}`,
      "contacts.pinoyseoul.com": `https://contacts.google.com/new?authuser=${domain}`,
      "script.pinoyseoul.com":   `https://script.google.com/home/all?authuser=${domain}`,
      "blog.pinoyseoul.com":     `https://www.blogger.com/blog/posts/${blogId}?authuser=${domain}`
    };

    const targetUrl = actions[host];

    if (targetUrl) {
      // Direct redirect. We let Google's enterprise servers handle the security.
      return Response.redirect(targetUrl, 302);
    }

    return fetch(request);
  },
};
