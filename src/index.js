export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    const domain = "pinoyseoul.com";
    const blogId = "1152873755750876729";

    const targets = {
      // 📂 DRIVE: Jumps straight to TEAM SHARED DRIVES
      "drive.pinoyseoul.com":    `https://drive.google.com/drive/shared-drives`,

      // 📄 DOCS/SHEETS/SLIDES: Direct Creation
      "docs.pinoyseoul.com":     `https://docs.new`,
      "sheets.pinoyseoul.com":   `https://sheets.new`,
      "slides.pinoyseoul.com":   `https://slides.new`,

      // 📧 MAIL: NEW COMPOSE
      "mail.pinoyseoul.com":     `https://mail.google.com/mail/?view=cm&fs=1`,

      // 🎥 MEET: NEW MEETING
      "meet.pinoyseoul.com":     `https://meet.new`,

      // 🗓️ CALENDAR: NEW EVENT
      "calendar.pinoyseoul.com": `https://cal.new`,

      // 🧑‍🤝‍🧑 GROUPS: ADMIN GROUP
      "groups.pinoyseoul.com":   `https://groups.google.com/a/${domain}/g/admin`,

      // 💬 CHAT: DIRECT PINONYSEOUL CHAT
      "chat.pinoyseoul.com":     `https://chat.google.com/app/chat/AAQAotoa0bE`,

      // 📝 FORMS/SITES: Direct Creation
      "forms.pinoyseoul.com":    `https://forms.new`,
      "sites.pinoyseoul.com":    `https://sites.new`,

      // 💡 KEEP: NEW NOTE Action
      "keep.pinoyseoul.com":     `https://keep.new`,

      // ✅ TASKS: NEW TASK Action
      "tasks.pinoyseoul.com":    `https://tasks.new`,

      // 👤 CONTACTS/💻 SCRIPT
      "contacts.pinoyseoul.com": `https://contacts.google.com/new`,
      "script.pinoyseoul.com":   `https://script.google.com/home/all`,

      // ✍️ BLOGGER: Direct to the specific Blog Dashboard
      "blog.pinoyseoul.com":     `https://www.blogger.com/blog/posts/${blogId}`,

      // 🛡️ ADMIN: USER MANAGEMENT
      "admin.pinoyseoul.com":    `https://admin.google.com/ac/users`
    };

    const actionTarget = targets[host];

    if (actionTarget) {
      /**
       * 🛡️ THE SMART IDENTITY ENFORCER:
       * Using /a/domain/ServiceLogin ensures the correct Workspace session is used.
       */
      const enforcerUrl = `https://www.google.com/a/${domain}/ServiceLogin?continue=${encodeURIComponent(actionTarget)}`;
      
      return Response.redirect(enforcerUrl, 302);
    }

    return fetch(request);
  },
};
