export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    const path = url.pathname;
    const domain = "pinoyseoul.com";
    const blogId = "1152873755750876729";

    // --- Part 1: Quota Safety ---
    // Only run the redirect logic for the root path (/).
    // This stops the worker from burning credits on favicons, scripts, etc.
    if (path !== "/") return fetch(request);

    const targets = {
      "drive.pinoyseoul.com":    "https://drive.google.com/drive/shared-drives",
      "docs.pinoyseoul.com":     "https://docs.google.com/document/create",
      "sheets.pinoyseoul.com":   "https://docs.google.com/spreadsheets/create",
      "slides.pinoyseoul.com":   "https://docs.google.com/presentation/create",
      "mail.pinoyseoul.com":     "https://mail.google.com/mail/?view=cm&fs=1",
      "meet.pinoyseoul.com":     "https://meet.google.com/new",
      "calendar.pinoyseoul.com": "https://calendar.google.com/calendar/u/0/r/eventedit",
      "groups.pinoyseoul.com":   "https://groups.google.com/a/" + domain + "/g/admin",
      "chat.pinoyseoul.com":     "https://chat.google.com/u/0/app/chat/AAQAotoa0bE",
      "forms.pinoyseoul.com":    "https://docs.google.com/forms/create",
      "sites.pinoyseoul.com":    "https://sites.google.com/new",
      "keep.pinoyseoul.com":     "https://keep.google.com/#create",
      "tasks.pinoyseoul.com":    "https://calendar.google.com/calendar/r/tasks",
      "contacts.pinoyseoul.com": "https://contacts.google.com/new",
      "script.pinoyseoul.com":   "https://script.google.com/home/all",
      "blog.pinoyseoul.com":     "https://www.blogger.com/blog/posts/" + blogId,
      "admin.pinoyseoul.com":    "https://admin.google.com/ac/users"
    };

    const actionTarget = targets[host];

    if (actionTarget) {
      const enforcerUrl = "https://www.google.com/a/" + domain + "/ServiceLogin?continue=" + encodeURIComponent(actionTarget);
      return Response.redirect(enforcerUrl, 302);
    }

    return fetch(request);
  },
};
