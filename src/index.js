export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    const domain = "pinoyseoul.com";
    const blogId = "1152873755750876729";

    const actions = {
      "drive.pinoyseoul.com":    `https://drive.google.com/drive/u/0/shared-drives`,
      "docs.pinoyseoul.com":     `https://docs.google.com/document/u/0/create`,
      "sheets.pinoyseoul.com":   `https://docs.google.com/spreadsheets/u/0/create`,
      "slides.pinoyseoul.com":   `https://docs.google.com/presentation/u/0/create`,
      "mail.pinoyseoul.com":     `https://mail.google.com/mail/u/0/?view=cm&fs=1`,
      "meet.pinoyseoul.com":     `https://meet.google.com/new`,
      "calendar.pinoyseoul.com": `https://calendar.google.com/calendar/u/0/r/eventedit`,
      "groups.pinoyseoul.com":   `https://groups.google.com/a/${domain}/g/admin`,
      "chat.pinoyseoul.com":     `https://chat.google.com/u/0/app/chat/AAQAotoa0bE`,
      "forms.pinoyseoul.com":    `https://docs.google.com/forms/u/0/create`,
      "sites.pinoyseoul.com":    `https://sites.google.com/u/0/new`,
      "keep.pinoyseoul.com":     `https://keep.google.com/u/0/`,
      "tasks.pinoyseoul.com":    `https://tasks.google.com/u/0/`,
      "contacts.pinoyseoul.com": `https://contacts.google.com/new`,
      "script.pinoyseoul.com":   `https://script.google.com/home/all`,
      "blog.pinoyseoul.com":     `https://www.blogger.com/blog-post.g?blogID=${blogId}`,
      "admin.pinoyseoul.com":    `https://admin.google.com/ac/users`
    };

    const targetUrl = actions[host];

    if (targetUrl) {
      /**
       * 🛡️ THE ENFORCER (Ironclad Method):
       * By using the /a/domain/ prefix, we force the browser to identify 
       * the session specifically for that Workspace organization.
       */
      const enforcerUrl = `https://www.google.com/a/${domain}/ServiceLogin?continue=${encodeURIComponent(targetUrl)}`;
      
      return Response.redirect(enforcerUrl, 302);
    }

    return fetch(request);
  },
};
