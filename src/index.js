export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    const domain = "pinoyseoul.com";
    const blogId = "1152873755750876729";

    // Append ?authuser=pinoyseoul.com to force the target app to select the correct session
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
      "keep.pinoyseoul.com":     `https://keep.google.com/?authuser=${domain}#create`,
      "tasks.pinoyseoul.com":    `https://calendar.google.com/calendar/r/tasks?authuser=${domain}`,
      "contacts.pinoyseoul.com": `https://contacts.google.com/new?authuser=${domain}`,
      "script.pinoyseoul.com":   `https://script.google.com/home/all?authuser=${domain}`,
      "blog.pinoyseoul.com":     `https://www.blogger.com/blog/post/edit/new/${blogId}?authuser=${domain}`,
      "admin.pinoyseoul.com":    `https://admin.google.com/ac/users`
    };

    const targetUrl = actions[host];

    if (targetUrl) {
      /**
       * 🛡️ THE ULTIMATE ZERO-FRICTION ENFORCER:
       * We use the standard Accounts ServiceLogin (not the /a/domain/ one to prevent 403s on Keep/Blogger).
       * 1. 'hd=pinoyseoul.com' forces Google to verify a PinoySeoul session exists. If not, it shows the login screen.
       * 2. If already logged in, ServiceLogin skips the prompt entirely (Zero Friction).
       * 3. The 'continue' URL contains 'authuser=pinoyseoul.com', which guarantees that once the user 
       *    lands on Docs/Drive/Blogger, it doesn't accidentally fall back to their personal Gmail.
       */
      const enforcerUrl = `https://accounts.google.com/ServiceLogin?hd=${domain}&continue=${encodeURIComponent(targetUrl)}`;
      
      return Response.redirect(enforcerUrl, 302);
    }

    return fetch(request);
  },
};
