export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    const domain = "pinoyseoul.com";
    const blogId = "1152873755750876729";

    // 1. DEFINE THE DIRECT ACTIONS (Pure targets, no hardcoding u/0)
    const targets = {
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

      // 📝 FORMS/SITES: Direct Creation
      "forms.pinoyseoul.com":    `https://docs.google.com/forms/create`,
      "sites.pinoyseoul.com":    `https://sites.google.com/new`,

      // 👤 CONTACTS/💻 SCRIPT
      "contacts.pinoyseoul.com": `https://contacts.google.com/new`,
      "script.pinoyseoul.com":   `https://script.google.com/home/all`,

      // ✍️ BLOGGER: Direct to the specific Blog Dashboard
      "blog.pinoyseoul.com":     `https://www.blogger.com/blog-post.g?blogID=${blogId}`,

      // 🛡️ ADMIN: USER MANAGEMENT
      "admin.pinoyseoul.com":    `https://admin.google.com/ac/users`
    };

    const actionTarget = targets[host];

    if (actionTarget) {
      /**
       * 🛡️ THE "SMART IDENTITY" ENFORCER:
       * We use the /a/domain/ prefix. This is the official Google Workspace entry point.
       * 
       * 1. It scans ALL logged-in sessions for one matching '@pinoyseoul.com'.
       * 2. If found, it uses that session index (u/1, u/5, etc.) automatically.
       * 3. If NOT found, it forces the user to log in to a PinoySeoul account.
       * 4. It prevents the "Hallucination" because it explicitly requires the Workspace context.
       */
      const enforcerUrl = `https://www.google.com/a/${domain}/ServiceLogin?continue=${encodeURIComponent(actionTarget)}`;
      
      return Response.redirect(enforcerUrl, 302);
    }

    return fetch(request);
  },
};
