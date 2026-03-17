export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    const path = url.pathname.toLowerCase();
    const domain = "pinoyseoul.com";
    const blogId = "1152873755750876729";

    // --- 1. LOGOUT / RESET ROUTE ---
    // Staff can type docs.pinoyseoul.com/reset to clear their saved email
    if (path === "/reset" || path === "/logout") {
      return new Response("Workspace session cleared. Redirecting...", {
        status: 302,
        headers: {
          "Set-Cookie": "ps_email=; max-age=0; path=/; domain=.pinoyseoul.com",
          "Location": `https://${host}`
        }
      });
    }

    // --- 2. COOKIE VERIFICATION ---
    // Check if the user has verified their PinoySeoul identity on this device
    const cookies = request.headers.get("Cookie") || "";
    const match = cookies.match(/ps_email=([^;]+)/);
    const userEmail = match ? decodeURIComponent(match[1]) : null;

    // --- 3. THE JS GATEWAY (For hackers, normal users, or first-time staff) ---
    if (!userEmail) {
      const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>PinoySeoul Workspace Gateway</title>
          <style>
              body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f4f6f8; margin: 0; }
              .card { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); text-align: center; max-width: 360px; width: 100%; border-top: 4px solid #1a73e8; }
              h2 { margin-top: 0; color: #202124; font-size: 22px; }
              p { color: #5f6368; font-size: 14px; margin-bottom: 24px; line-height: 1.5; }
              input { width: 90%; padding: 12px 16px; margin-bottom: 20px; border: 1px solid #dadce0; border-radius: 6px; font-size: 16px; outline: none; transition: 0.2s; box-sizing: border-box; }
              input:focus { border-color: #1a73e8; box-shadow: 0 0 0 2px rgba(26,115,232,0.2); }
              button { background: #1a73e8; color: white; border: none; padding: 12px 24px; width: 100%; border-radius: 6px; font-size: 16px; font-weight: 500; cursor: pointer; transition: 0.2s; }
              button:hover { background: #1557b0; }
              .error { color: #d93025; font-size: 13px; margin-bottom: 15px; display: none; }
          </style>
      </head>
      <body>
          <div class="card">
              <h2>Workspace Gateway</h2>
              <p>Enter your <b>@pinoyseoul.com</b> email to activate 1-click productivity shortcuts on this device.</p>
              <div id="error" class="error">Access Denied: Must be a PinoySeoul account.</div>
              <input type="email" id="email" placeholder="you@pinoyseoul.com" required>
              <button onclick="activate()">Activate Shortcuts</button>
          </div>
          <script>
              function activate() {
                  const email = document.getElementById('email').value.trim().toLowerCase();
                  const error = document.getElementById('error');
                  
                  // HARD BLOCK: Rejects non-pinoyseoul emails instantly using JS
                  if (!email.endsWith('@pinoyseoul.com')) {
                      error.style.display = 'block';
                      return;
                  }
                  
                  // Save cookie for the entire domain so they only login ONCE
                  document.cookie = "ps_email=" + encodeURIComponent(email) + "; max-age=31536000; path=/; domain=.pinoyseoul.com";
                  
                  // Reload page to execute the Workspace Redirect
                  window.location.reload();
              }
              // Allow pressing Enter
              document.getElementById('email').addEventListener('keypress', function (e) {
                  if (e.key === 'Enter') activate();
              });
          </script>
      </body>
      </html>
      `;
      return new Response(html, { headers: { "Content-Type": "text/html" } });
    }

    // --- 4. THE ZERO-FRICTION EXECUTION ---
    // Because we know their exact email, Google physically cannot hallucinate a personal account.
    const actions = {
      "drive.pinoyseoul.com":    `https://drive.google.com/drive/shared-drives?authuser=${userEmail}`,
      "docs.pinoyseoul.com":     `https://docs.google.com/document/create?authuser=${userEmail}`,
      "sheets.pinoyseoul.com":   `https://docs.google.com/spreadsheets/create?authuser=${userEmail}`,
      "slides.pinoyseoul.com":   `https://docs.google.com/presentation/create?authuser=${userEmail}`,
      "mail.pinoyseoul.com":     `https://mail.google.com/mail/?view=cm&fs=1&authuser=${userEmail}`,
      "meet.pinoyseoul.com":     `https://meet.google.com/new?authuser=${userEmail}`,
      "calendar.pinoyseoul.com": `https://calendar.google.com/calendar/r/eventedit?authuser=${userEmail}`,
      "groups.pinoyseoul.com":   `https://groups.google.com/a/${domain}/g/admin`,
      "chat.pinoyseoul.com":     `https://chat.google.com/app/chat/AAQAotoa0bE?authuser=${userEmail}`,
      "forms.pinoyseoul.com":    `https://docs.google.com/forms/create?authuser=${userEmail}`,
      "sites.pinoyseoul.com":    `https://sites.google.com/new?authuser=${userEmail}`,
      "contacts.pinoyseoul.com": `https://contacts.google.com/new?authuser=${userEmail}`,
      "script.pinoyseoul.com":   `https://script.google.com/home/all?authuser=${userEmail}`,
      "blog.pinoyseoul.com":     `https://www.blogger.com/blog/posts/${blogId}?authuser=${userEmail}`,
      "admin.pinoyseoul.com":    `https://admin.google.com/ac/users?authuser=${userEmail}`
    };

    const targetUrl = actions[host];

    if (targetUrl) {
      return Response.redirect(targetUrl, 302);
    }

    return fetch(request);
  },
};
