export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    const domain = "pinoyseoul.com";
    const blogId = "1152873755750876729";

    // Mappings: Use authuser=domain to tell Google "Switch to this session if it exists"
    const actions = {
      "drive.pinoyseoul.com":    `https://drive.google.com/drive/shared-drives?authuser=${domain}`,
      "docs.pinoyseoul.com":     `https://docs.google.com/document/create?authuser=${domain}`,
      "sheets.pinoyseoul.com":   `https://docs.google.com/spreadsheets/create?authuser=${domain}`,
      "slides.pinoyseoul.com":   `https://docs.google.com/presentation/create?authuser=${domain}`,
      "mail.pinoyseoul.com":     `https://mail.google.com/mail/?view=cm&fs=1&authuser=${domain}`,
      "meet.pinoyseoul.com":     `https://meet.google.com/new?authuser=${domain}`,
      "calendar.pinoyseoul.com": `https://calendar.google.com/calendar/r/eventedit?authuser=${domain}`,
      "groups.pinoyseoul.com":   `https://groups.google.com/a/${domain}/g/admin`,
      "chat.pinoyseoul.com":     `https://chat.google.com/app/chat/AAQAotoa0bE?authuser=${domain}`,
      "forms.pinoyseoul.com":    `https://docs.google.com/forms/create?authuser=${domain}`,
      "sites.pinoyseoul.com":    `https://sites.google.com/new?authuser=${domain}`,
      "contacts.pinoyseoul.com": `https://contacts.google.com/new?authuser=${domain}`,
      "script.pinoyseoul.com":   `https://script.google.com/home/all?authuser=${domain}`,
      "blog.pinoyseoul.com":     `https://www.blogger.com/blog/posts/${blogId}?authuser=${domain}`,
      "admin.pinoyseoul.com":    `https://admin.google.com/a/${domain}/ac/users`
    };

    const targetUrl = actions[host];

    if (targetUrl) {
      /**
       * 🛡️ THE "SMART LOGIN" ENFORCER:
       * 1. Google's 'ServiceLogin' checks if the user has an active session for the 'hd' (Hosted Domain).
       * 2. IF YES: It skips the login screen completely (Zero Friction) and forwards to the targetUrl.
       * 3. IF NO: It stops them at the Google Login screen with "Sign in to pinoyseoul.com" pre-filled.
       * 4. IF ONLY @GMAIL IS ACTIVE: The 'hd' parameter explicitly blocks the personal account from passing through.
       */
      const smartLoginUrl = `https://accounts.google.com/ServiceLogin?hd=${domain}&continue=${encodeURIComponent(targetUrl)}`;
      return Response.redirect(smartLoginUrl, 302);
    }

    return fetch(request);
  },
};
