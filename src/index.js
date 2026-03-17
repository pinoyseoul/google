export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    const domain = "pinoyseoul.com";

    const actions = {
      // 📂 DRIVE: Jumps straight to TEAM SHARED DRIVES
      "drive.pinoyseoul.com":    `https://drive.google.com/drive/u/0/shared-drives`,

      // 📄 DOCS: Creates a BRAND NEW DOCUMENT instantly
      "docs.pinoyseoul.com":     `https://docs.new`,

      // 📊 SHEETS: Creates a BRAND NEW SPREADSHEET instantly
      "sheets.pinoyseoul.com":   `https://sheets.new`,

      // 📧 MAIL: Opens a NEW COMPOSE WINDOW (Full screen)
      "mail.pinoyseoul.com":     `https://mail.google.com/mail/u/0/?view=cm&fs=1`,

      // 🎥 MEET: Instantly generates a NEW MEETING link
      "meet.pinoyseoul.com":     `https://meet.new`,

      // 🗓️ CALENDAR: Opens the "CREATE NEW EVENT" screen instantly
      "calendar.pinoyseoul.com": `https://cal.new`,

      // 🧑‍🤝‍🧑 GROUPS: Jumps straight into the SPECIFIC Group
      "groups.pinoyseoul.com":     `https://groups.google.com/a/pinoyseoul.com/g/admin`,

      // 💬 CHAT: Jumps straight into the WORKSPACE CHAT
      "chat.pinoyseoul.com":     `https://chat.google.com/u/0/app/chat/AAQAotoa0bE`,

      // 🖼️ SLIDES: Creates a BRAND NEW PRESENTATION instantly
      "slides.pinoyseoul.com":   `https://slides.new`,

      // 📝 FORMS: Creates a BRAND NEW FORM instantly
      "forms.pinoyseoul.com":    `https://forms.new`,

      // 🏠 SITES: Creates a BRAND NEW GOOGLE SITE instantly
      "sites.pinoyseoul.com":    `https://sites.new`,

      // 💡 KEEP: Creates a NEW NOTE instantly
      "keep.pinoyseoul.com":     `https://keep.new`,

      // 🛡️ ADMIN: Direct access to USER MANAGEMENT
      "admin.pinoyseoul.com":    `https://admin.google.com/ac/users`
    };

    const target = actions[host];

    if (target) {
      return Response.redirect(target, 302);
    }

    // Default behavior if not a mapped subdomain
    return fetch(request);
  },
};
