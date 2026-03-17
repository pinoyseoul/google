export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    const domain = "pinoyseoul.com";
    
    // This helper ensures Google selects the right account automatically
    const auth = `?authuser=${domain}&hd=${domain}`;

    const actions = {
      // 📂 DRIVE: TEAM SHARED DRIVES
      "drive.pinoyseoul.com":    `https://drive.google.com/drive/u/0/shared-drives${auth}`,

      // 📄 DOCS/SHEETS/SLIDES: BRAND NEW
      "docs.pinoyseoul.com":     `https://docs.google.com/document/u/0/create${auth}`,
      "sheets.pinoyseoul.com":   `https://docs.google.com/spreadsheets/u/0/create${auth}`,
      "slides.pinoyseoul.com":   `https://docs.google.com/presentation/u/0/create${auth}`,

      // 📧 MAIL: NEW COMPOSE WINDOW
      "mail.pinoyseoul.com":     `https://mail.google.com/mail/u/0/?view=cm&fs=1&authuser=${domain}`,

      // 🎥 MEET: NEW MEETING
      "meet.pinoyseoul.com":     `https://meet.google.com/new${auth}`,

      // 🗓️ CALENDAR: CREATE NEW EVENT
      "calendar.pinoyseoul.com": `https://calendar.google.com/calendar/u/0/r/eventedit${auth}`,

      // 🧑‍🤝‍🧑 GROUPS: ADMIN GROUP
      "groups.pinoyseoul.com":   `https://groups.google.com/a/${domain}/g/admin`,

      // 💬 CHAT: DIRECT PINONYSEOUL CHAT
      "chat.pinoyseoul.com":     `https://chat.google.com/u/0/app/chat/AAQAotoa0bE?hd=${domain}`,

      // 📝 FORMS/SITES: NEW
      "forms.pinoyseoul.com":    `https://docs.google.com/forms/u/0/create${auth}`,
      "sites.pinoyseoul.com":    `https://sites.google.com/u/0/new${auth}`,

      // 💡 KEEP/TASKS/CONTACTS
      "keep.pinoyseoul.com":     `https://keep.google.com/u/0/${auth}`,
      "tasks.pinoyseoul.com":    `https://assistant.google.com/tasks?hd=${domain}`,
      "contacts.pinoyseoul.com": `https://contacts.google.com/new?authuser=${domain}`,
      "scripts.pinoyseoul.com":  `https://script.google.com/home/all?authuser=${domain}`,

      // 🛡️ ADMIN: Direct access to USER MANAGEMENT
      "admin.pinoyseoul.com":    `https://admin.google.com/ac/users`
    };

    const target = actions[host];

    if (target) {
      return Response.redirect(target, 302);
    }

    return fetch(request);
  },
};
