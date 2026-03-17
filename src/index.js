export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    const domain = "pinoyseoul.com";
    const blogId = "1152873755750876729";

    const actions = {
      "drive.pinoyseoul.com":    `https://drive.google.com/drive/u/pinoyseoul.com/shared-drives`,
      "docs.pinoyseoul.com":     `https://docs.google.com/document/create?ouid=pinoyseoul.com`,
      "sheets.pinoyseoul.com":   `https://docs.google.com/spreadsheets/create?ouid=pinoyseoul.com`,
      "slides.pinoyseoul.com":   `https://docs.google.com/presentation/create?ouid=pinoyseoul.com`,
      "mail.pinoyseoul.com":     `https://mail.google.com/mail/u/pinoyseoul.com/?view=cm&fs=1`,
      "meet.pinoyseoul.com":     `https://meet.google.com/new?authuser=pinoyseoul.com`,
      "calendar.pinoyseoul.com": `https://calendar.google.com/calendar/u/pinoyseoul.com/r/eventedit`,
      "groups.pinoyseoul.com":   `https://groups.google.com/a/${domain}/g/admin`,
      "chat.pinoyseoul.com":     `https://chat.google.com/u/pinoyseoul.com/app/chat/AAQAotoa0bE`,
      "forms.pinoyseoul.com":    `https://docs.google.com/forms/create?ouid=pinoyseoul.com`,
      "sites.pinoyseoul.com":    `https://sites.google.com/u/pinoyseoul.com/new`,
      "contacts.pinoyseoul.com": `https://contacts.google.com/new?authuser=pinoyseoul.com`,
      "script.pinoyseoul.com":   `https://script.google.com/home/all?authuser=pinoyseoul.com`,
      "blog.pinoyseoul.com":     `https://www.blogger.com/blog/posts/${blogId}?authuser=pinoyseoul.com`,
      "admin.pinoyseoul.com":    `https://admin.google.com/a/pinoyseoul.com/ac/users`
    };

    const targetUrl = actions[host];

    if (targetUrl) {
      /**
       * 🛡️ THE ONLY WAY TO HARD-BLOCK PERSONAL ACCOUNTS:
       * Google's "AccountChooser" endpoint specifically designed to force an organization login.
       * If you only have @gmail.com, this link throws an error or forces the Google login screen 
       * with the @pinoyseoul.com requirement pre-filled.
       */
      const enforcerUrl = `https://accounts.google.com/AccountChooser?hd=${domain}&continue=${encodeURIComponent(targetUrl)}`;
      return Response.redirect(enforcerUrl, 302);
    }

    return fetch(request);
  },
};
