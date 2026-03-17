export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    const domain = "pinoyseoul.com";
    const blogId = "1152873755750876729";

    const actions = {
      // 📂 DRIVE: TEAM SHARED DRIVES
      "drive.pinoyseoul.com":    `https://drive.google.com/drive/u/0/shared-drives`,

      // 📄 DOCS/SHEETS/SLIDES: BRAND NEW
      "docs.pinoyseoul.com":     `https://docs.google.com/document/u/0/create`,
      "sheets.pinoyseoul.com":   `https://docs.google.com/spreadsheets/u/0/create`,
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

      // 📝 FORMS/SITES: NEW
      "forms.pinoyseoul.com":    `https://docs.google.com/forms/u/0/create`,
      "sites.pinoyseoul.com":    `https://sites.google.com/u/0/new`,

      // 👤 CONTACTS/💻 SCRIPT
      "contacts.pinoyseoul.com": `https://contacts.google.com/new`,
      "script.pinoyseoul.com":   `https://script.google.com/home/all`,

      // ✍️ BLOGGER: DASHBOARD
      "blog.pinoyseoul.com":     `https://www.blogger.com/blog/posts/${blogId}`,

      // 🛡️ ADMIN: USER MANAGEMENT
      "admin.pinoyseoul.com":    `https://admin.google.com/ac/users`
    };

    const targetUrl = actions[host];

    if (targetUrl) {
      /**
       * 🛡️ THE INVISIBLE BOUNCER (Zero Friction Logic):
       * 1. AccountChooser + hd=domain: Google checks if a @pinoyseoul.com session is already active.
       * 2. If YES: Google bypasses everything and executes the 'continue' URL.
       * 3. If NO (only personal Gmail): Google stops at the "Choose an account" screen.
       * 4. If LOGGED OUT: Google shows the pinoyseoul.com branded login page.
       */
      const separator = targetUrl.includes('?') ? '&' : '?';
      const finalTarget = `${targetUrl}${separator}authuser=${domain}`;
      const enforcerUrl = `https://accounts.google.com/AccountChooser?hd=${domain}&continue=${encodeURIComponent(finalTarget)}`;
      
      return Response.redirect(enforcerUrl, 302);
    }

    return fetch(request);
  },
};
