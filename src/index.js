export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    const domain = "pinoyseoul.com";
    const blogId = "1152873755750876729";

    const actions = {
      // 📂 DRIVE: Jumps straight to TEAM SHARED DRIVES
      "drive.pinoyseoul.com":    `https://drive.google.com/drive/shared-drives`,

      // 📄 DOCS/SHEETS/SLIDES: Direct Creation
      "docs.pinoyseoul.com":     `https://docs.google.com/document/create`,
      "sheets.pinoyseoul.com":   `https://docs.google.com/spreadsheets/create`,
      "slides.pinoyseoul.com":   `https://docs.google.com/presentation/create`,

      // 📧 MAIL: NEW COMPOSE
      "mail.pinoyseoul.com":     `https://mail.google.com/mail/?view=cm&fs=1`,

      // 🎥 MEET: NEW MEETING
      "meet.pinoyseoul.com":     `https://meet.google.com/new`,

      // 🗓️ CALENDAR: NEW EVENT
      "calendar.pinoyseoul.com": `https://calendar.google.com/calendar/r/eventedit`,

      // 🧑‍🤝‍🧑 GROUPS: ADMIN GROUP
      "groups.pinoyseoul.com":   `https://groups.google.com/a/${domain}/g/admin`,

      // 💬 CHAT: DIRECT PINONYSEOUL CHAT
      "chat.pinoyseoul.com":     `https://chat.google.com/app/chat/AAQAotoa0bE`,

      // 📝 FORMS/SITES: NEW
      "forms.pinoyseoul.com":    `https://docs.google.com/forms/create`,
      "sites.pinoyseoul.com":    `https://sites.google.com/new`,

      // 👤 CONTACTS/💻 SCRIPT
      "contacts.pinoyseoul.com": `https://contacts.google.com/new`,
      "script.pinoyseoul.com":   `https://script.google.com/home/all`,

      // ✍️ BLOGGER: DASHBOARD (Safe URL to avoid 403)
      "blog.pinoyseoul.com":     `https://www.blogger.com/blog/posts/${blogId}`,

      // 🛡️ ADMIN: USER MANAGEMENT
      "admin.pinoyseoul.com":    `https://admin.google.com/ac/users`
    };

    const targetUrl = actions[host];

    if (targetUrl) {
      /**
       * 🛡️ THE SILENT BOUNCER LOGIC:
       * 1. We use ServiceLogin with hd=domain to force the organizational context.
       * 2. We add authuser=domain as a hint to help Google auto-select the session.
       * 3. This combination is the "Gold Standard" for bypassing the Account Chooser
       *    for already logged-in Workspace users.
       */
      const separator = targetUrl.includes('?') ? '&' : '?';
      const finalTarget = `${targetUrl}${separator}authuser=${domain}`;
      const directUrl = `https://accounts.google.com/ServiceLogin?hd=${domain}&authuser=${domain}&continue=${encodeURIComponent(finalTarget)}`;
      
      return Response.redirect(directUrl, 302);
    }

    return fetch(request);
  },
};
