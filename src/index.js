export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    const domain = "pinoyseoul.com";
    const blogId = "1152873755750876729";

    const actions = {
      // 📂 DRIVE: TEAM SHARED DRIVES
      "drive.pinoyseoul.com":    `https://drive.google.com/drive/u/0/shared-drives`,

      // 📄 DOCS/SHEETS/SLIDES: NEW Actions
      "docs.pinoyseoul.com":     `https://docs.google.com/document/u/0/create`,
      "sheets.pinoyseoul.com":   `https://docs.google.com/spreadsheets/u/0/create`,
      "slides.pinoyseoul.com":   `https://docs.google.com/presentation/u/0/create`,

      // 📧 MAIL: NEW COMPOSE
      "mail.pinoyseoul.com":     `https://mail.google.com/mail/u/0/?view=cm&fs=1`,

      // 🎥 MEET: NEW MEETING
      "meet.pinoyseoul.com":     `https://meet.google.com/new`,

      // 🗓️ CALENDAR: NEW EVENT
      "calendar.pinoyseoul.com": `https://calendar.google.com/calendar/u/0/r/eventedit`,

      // 🧑‍🤝‍🧑 GROUPS: ADMIN GROUP
      "groups.pinoyseoul.com":   `https://groups.google.com/a/${domain}/g/admin`,

      // 💬 CHAT: DIRECT WORKSPACE CHAT
      "chat.pinoyseoul.com":     `https://chat.google.com/u/0/app/chat/AAQAotoa0bE`,

      // 📝 FORMS/SITES: NEW Actions
      "forms.pinoyseoul.com":    `https://docs.google.com/forms/u/0/create`,
      "sites.pinoyseoul.com":    `https://sites.google.com/u/0/new`,

      // 💡 KEEP: NEW NOTE Action (Force full-screen creation)
      "keep.pinoyseoul.com":     `https://keep.google.com/u/0/#create`,

      // ✅ TASKS: FULL SCREEN TASK DASHBOARD (with focus on creation)
      "tasks.pinoyseoul.com":    `https://tasks.google.com/embed/?origin=https://mail.google.com&fullWidth=1`,

      // 👤 CONTACTS: NEW CONTACT
      "contacts.pinoyseoul.com": `https://contacts.google.com/new`,

      // 💻 SCRIPT: ALL PROJECTS
      "script.pinoyseoul.com":   `https://script.google.com/home/all`,

      // ✍️ BLOGGER: NEW BLOG POST (Using the Edit URL logic)
      "blog.pinoyseoul.com":     `https://www.blogger.com/blog/post/edit/new/${blogId}`,

      // 🛡️ ADMIN: USER MANAGEMENT
      "admin.pinoyseoul.com":    `https://admin.google.com/ac/users`
    };

    const targetUrl = actions[host];

    if (targetUrl) {
      /**
       * 🛡️ THE ENFORCER (Ironclad Method):
       * Bypasses personal accounts and forces Workspace login.
       */
      const enforcerUrl = `https://www.google.com/a/${domain}/ServiceLogin?continue=${encodeURIComponent(targetUrl)}`;
      
      return Response.redirect(enforcerUrl, 302);
    }

    return fetch(request);
  },
};
