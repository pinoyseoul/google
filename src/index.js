export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    const domain = "pinoyseoul.com";
    
    /**
     * GOOGLE ACCOUNT CONTINUITY STRATEGY:
     * 1. authuser={email} forces Google to look for that specific logged-in session.
     * 2. hd={domain} tells Google which Workspace directory to prioritize.
     * 3. continue={target} ensures that if the user IS NOT logged in, Google 
     *    presents the login screen and then takes them to the correct action 
     *    AFTER authentication.
     */
    
    // Base login wrapper to handle unauthenticated users
    const loginWrapper = (target) => `https://accounts.google.com/AccountChooser?hd=${domain}&continue=${encodeURIComponent(target)}`;

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

      // 💡 KEEP/TASKS/CONTACTS
      "keep.pinoyseoul.com":     `https://keep.google.com/u/0/`,
      "tasks.pinoyseoul.com":    `https://assistant.google.com/tasks`,
      "contacts.pinoyseoul.com": `https://contacts.google.com/new`,
      "scripts.pinoyseoul.com":  `https://script.google.com/home/all`,

      // ✍️ BLOGGER: NEW BLOG POST
      "blog.pinoyseoul.com":     `https://www.blogger.com/blog/post/edit/new`,

      // 🛡️ ADMIN: Direct access to USER MANAGEMENT
      "admin.pinoyseoul.com":    `https://admin.google.com/ac/users`
    };

    const targetUrl = actions[host];

    if (targetUrl) {
      // We wrap the target in AccountChooser to force the @pinoyseoul.com login flow
      // if no session is found, or switch to it if it exists.
      return Response.redirect(loginWrapper(targetUrl), 302);
    }

    return fetch(request);
  },
};
