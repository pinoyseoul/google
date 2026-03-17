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
      "forms.pinoyseoul.com":    `https://docs.google.com/forms/u/0/create`,
      "sites.pinoyseoul.com":    `https://sites.google.com/u/0/new`,
      "mail.pinoyseoul.com":     `https://mail.google.com/mail/u/0/?view=cm&fs=1`,
      "calendar.pinoyseoul.com": `https://calendar.google.com/calendar/u/0/r/eventedit`,
      "groups.pinoyseoul.com":   `https://groups.google.com/a/${domain}/g/admin`,
      "admin.pinoyseoul.com":    `https://admin.google.com/ac/users`,
      "meet.pinoyseoul.com":     `https://meet.google.com/new`,
      "chat.pinoyseoul.com":     `https://chat.google.com/u/0/app/chat/AAQAotoa0bE`,
      "contacts.pinoyseoul.com": `https://contacts.google.com/new`,
      "script.pinoyseoul.com":   `https://script.google.com/home/all`,
      "blog.pinoyseoul.com":     `https://www.blogger.com/blog/posts/${blogId}`
    };

    const targetUrl = actions[host];

    if (targetUrl) {
      /**
       * 🛡️ THE "NO HALLUCINATION" ENFORCER:
       * By routing through AccountChooser and injecting the `Email` parameter, 
       * we explicitly tell Google's UI: "This action REQUIRES an @pinoyseoul.com account."
       * 
       * - If logged into PinoySeoul: Google auto-selects the account and proceeds instantly.
       * - If logged into Personal Gmail ONLY: Google shows the Account Chooser screen 
       *   with a message saying "Sign in with a different account" because it knows 
       *   the personal Gmail isn't @pinoyseoul.com.
       * - If logged out: Shows the login screen.
       */
      const enforcerUrl = `https://accounts.google.com/AccountChooser?Email=@${domain}&continue=${encodeURIComponent(targetUrl)}`;
      
      return Response.redirect(enforcerUrl, 302);
    }

    return fetch(request);
  },
};
