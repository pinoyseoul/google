export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    const domain = "pinoyseoul.com";

    const actions = {
      "drive.pinoyseoul.com":    `https://drive.google.com/drive/u/0/shared-drives`,
      "docs.pinoyseoul.com":     `https://docs.google.com/document/u/0/create`,
      "sheets.pinoyseoul.com":   `https://docs.google.com/spreadsheets/u/0/create`,
      "mail.pinoyseoul.com":     `https://mail.google.com/mail/u/0/?view=cm&fs=1`,
      "meet.pinoyseoul.com":     `https://meet.google.com/new`,
      "calendar.pinoyseoul.com": `https://calendar.google.com/calendar/u/0/r/eventedit`,
      "groups.pinoyseoul.com":   `https://groups.google.com/a/${domain}/g/admin`,
      "chat.pinoyseoul.com":     `https://chat.google.com/u/0/app/chat/AAQAotoa0bE`,
      "forms.pinoyseoul.com":    `https://docs.google.com/forms/u/0/create`,
      "sites.pinoyseoul.com":    `https://sites.google.com/u/0/new`,
      "keep.pinoyseoul.com":     `https://keep.google.com/u/0/`,
      "tasks.pinoyseoul.com":    `https://assistant.google.com/tasks`,
      "contacts.pinoyseoul.com": `https://contacts.google.com/new`,
      "scripts.pinoyseoul.com":  `https://script.google.com/home/all`,
      "blog.pinoyseoul.com":     `https://www.blogger.com/blog/post/edit/new`,
      "admin.pinoyseoul.com":    `https://admin.google.com/ac/users`
    };

    const targetUrl = actions[host];

    if (targetUrl) {
      /**
       * 🛡️ THE ENFORCER LOGIC:
       * We route through ServiceLogin with 'hd' (Hosted Domain).
       * If Google doesn't see a PINONSEOUL session, it WILL stop at the login screen.
       * It will NOT fallback to a personal @gmail.com account.
       */
      const secureRedirect = `https://accounts.google.com/ServiceLogin?hd=${domain}&continue=${encodeURIComponent(targetUrl)}&authuser=${domain}`;
      
      return Response.redirect(secureRedirect, 302);
    }

    return fetch(request);
  },
};
