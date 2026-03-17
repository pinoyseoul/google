# PinoySeoul Google Productivity Redirects

This Cloudflare Worker handles one-to-one subdomain redirects for Google Workspace apps, mapping them to high-productivity actions (like creating new docs or accessing shared drives) rather than just the homepages.

## 🚀 Active Redirects

| Subdomain | Action |
| :--- | :--- |
| `drive.pinoyseoul.com` | Opens **Shared Drives** directly |
| `docs.pinoyseoul.com` | Creates a **New Document** instantly |
| `sheets.pinoyseoul.com` | Creates a **New Spreadsheet** instantly |
| `mail.pinoyseoul.com` | Opens a **New Email Compose** window |
| `meet.pinoyseoul.com` | Starts a **New Meeting** instantly |
| `calendar.pinoyseoul.com` | Opens **Create New Event** screen |
| `groups.pinoyseoul.com` | Jumps to **Admin Group** |
| `chat.pinoyseoul.com` | Opens **Specific Team Chat** |
| `keep.pinoyseoul.com` | Creates a **New Note** instantly |

## 🛠 Setup & Deployment

### 1. Link to Cloudflare
1. Go to your **Cloudflare Dashboard** > **Workers & Pages**.
2. Click **Create Application** > **Workers** > **Connect to GitHub**.
3. Select this repository (`pinoyseoul/google`).
4. Follow the setup prompts. Cloudflare will now auto-deploy every time you push to this repo.

### 2. Configure Custom Domains
For the worker to intercept these subdomains, you must add them as **Custom Domains**:
1. In the Worker settings, go to **Settings** > **Domains & Routes**.
2. Click **Add Custom Domain**.
3. Add `drive.pinoyseoul.com`, `docs.pinoyseoul.com`, etc.
4. Cloudflare will automatically manage the DNS and SSL.

---
*Maintained by PinoySeoul Tech Team.*
