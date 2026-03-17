export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    const domain = "pinoyseoul.com";
    const blogId = "1152873755750876729";

    const actions = {
      // 📂 DRIVE: TEAM SHARED DRIVES
      "drive.pinoyseoul.com":    `https://drive.google.com/drive/u/0/shared-drives`,

      // 📄 DOCS: Creates a BRAND NEW DOCUMENT instantly
      "docs.pinoyseoul.com":     `https://docs.google.com/document/u/0/create`,

      // 📊 SHEETS: Creates a BRAND NEW SPREADSHEET instantly
      "sheets.pinoyseoul.com":   `https://docs.google.com/spreadsheets/u/0/create`,

      // 🖼️ SLIDES: Creates a BRAND NEW PRESENTATION instantly
      "slides.pinoyseoul.com":   `https://docs.google.com/presentation/u/0/create`,

      // 📧 MAIL: NEW COMPOSE WINDOW
      "mail.pinoyseoul.com":     `https://mail.google.com/mail/u/0/?view=cm&fs=1`,

      // 🎥 MEET: NEW MEETING
      "meet.pinoyseoul.com":     `https://meet.google.com/new`,

      // 🗓️ CALENDAR: CREATE NEW EVENT
      "calendar.pinoyseoul.com": `https://calendar.google.com/calendar/u/0/r/eventedit`,

      // 🧑‍🤝‍🧑 GROUPS: ADMIN GROUP
      "groups.pinoyseoul.com":   `https://groups.google.com/a/${domain}/g/admin`,

      // 💬 CHAT: DIRECT PINONYSEOUL CHAT
      "chat.pinoyseoul.com":     `https://chat.google.com/u/0/app/chat/AAQAotoa0bE`,

      // 📝 FORMS: BRAND NEW FORM
      "forms.pinoyseoul.com":    `https://docs.google.com/forms/u/0/create`,

      // 🏠 SITES: BRAND NEW SITE
      "sites.pinoyseoul.com":    `https://sites.google.com/u/0/new`,

      // 💡 KEEP: NEW NOTE
      "keep.pinoyseoul.com":     `https://keep.google.com/u/0/`,

      // ✅ TASKS
      "tasks.pinoyseoul.com":    `https://assistant.google.com/tasks`,

      // 👤 CONTACTS: NEW CONTACT
      "contacts.pinoyseoul.com": `https://contacts.google.com/new`,

      // 💻 SCRIPTS: ALL PROJECTS
      "scripts.pinoyseoul.com":  `https://script.google.com/home/all`,

      // ✍️ BLOGGER: NEW BLOG POST (Specific Blog ID)
      "blog.pinoyseoul.com":     `https://www.blogger.com/blog/post/edit/new/${blogId}`,

      // 🛡️ ADMIN: USER MANAGEMENT
      "admin.pinoyseoul.com":    `https://admin.google.com/ac/users`
    };

    const targetUrl = actions[host];

    if (targetUrl) {
      /**
       * 🛡️ THE HARD REDIRECT:
       * Google's 'ServiceLogin' with 'Email' hint and 'hd' domain restriction.
       * 1. 'Email' hint of @domain forces Google to at least suggest/look for that account.
       * 2. 'hd' (Hosted Domain) tells Google the resource belongs to pinoyseoul.com.
       * 3. 'continue' ensures they land on the tool after login.
       */
      const secureLogin = `https://accounts.google.com/ServiceLogin?Email=@${domain}&hd=${domain}&continue=${encodeURIComponent(targetUrl)}`;
      
      return Response.redirect(secureLogin, 302);
    }

    return fetch(request);
  },
};
