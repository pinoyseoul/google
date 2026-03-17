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
      // .new shortcuts support /a/domain/ and authuser in the URL path
      "docs.pinoyseoul.com":     `https://docs.new/a/${domain}/`,
      "sheets.pinoyseoul.com":   `https://sheets.new/a/${domain}/`,
      "slides.pinoyseoul.com":   `https://slides.new/a/${domain}/`,

      // 📧 MAIL: NEW COMPOSE
      "mail.pinoyseoul.com":     `https://mail.google.com/mail/u/0/?view=cm&fs=1`,

      // 🎥 MEET: NEW MEETING
      "meet.pinoyseoul.com":     `https://meet.new/a/${domain}/`,

      // 🗓️ CALENDAR: NEW EVENT
      "calendar.pinoyseoul.com": `https://cal.new/a/${domain}/`,

      // 🧑‍🤝‍🧑 GROUPS: ADMIN GROUP
      "groups.pinoyseoul.com":   `https://groups.google.com/a/${domain}/g/admin`,

      // 💬 CHAT: DIRECT WORKSPACE CHAT
      "chat.pinoyseoul.com":     `https://chat.google.com/u/0/app/chat/AAQAotoa0bE`,

      // 📝 FORMS/SITES: NEW Actions
      "forms.pinoyseoul.com":    `https://forms.new/a/${domain}/`,
      "sites.pinoyseoul.com":    `https://sites.new/a/${domain}/`,

      // 💡 KEEP: NEW NOTE Action
      "keep.pinoyseoul.com":     `https://keep.new/a/${domain}/`,

      // ✅ TASKS: NEW TASK
      "tasks.pinoyseoul.com":    `https://tasks.new/a/${domain}/`,

      // 👤 CONTACTS: NEW CONTACT
      "contacts.pinoyseoul.com": `https://contacts.google.com/new`,

      // 💻 SCRIPT: ALL PROJECTS
      "script.pinoyseoul.com":   `https://script.google.com/home/all`,

      // ✍️ BLOGGER: NEW BLOG POST
      // Blogger uses a different auth pattern. Switching to a direct service URL that triggers account check.
      "blog.pinoyseoul.com":     `https://www.blogger.com/blog-post.g?blogID=${blogId}`,

      // 🛡️ ADMIN: USER MANAGEMENT
      "admin.pinoyseoul.com":    `https://admin.google.com/ac/users`
    };

    const targetUrl = actions[host];

    if (targetUrl) {
      /**
       * 🛡️ THE ENFORCER (Ironclad Method):
       * By using the /a/domain/ prefix on the ServiceLogin, we force Google to 
       * recognize the session for that Workspace organization.
       */
      const enforcerUrl = `https://www.google.com/a/${domain}/ServiceLogin?continue=${encodeURIComponent(targetUrl)}`;
      
      return Response.redirect(enforcerUrl, 302);
    }

    return fetch(request);
  },
};
