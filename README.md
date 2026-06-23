# Altrove

Una lettera dal Mesco. The live site for Altrove vineyards and honey.

## Setup

### Email capture (Google Sheets)

The form posts to a Google Apps Script webhook that writes each submission to a Google Sheet.

1. Create a new Google Sheet.
2. Go to Extensions > Apps Script.
3. Paste the contents of `google-apps-script.gs` into the editor.
4. Deploy > New deployment > Web app.
   - Execute as: Me
   - Who has access: Anyone
5. Copy the Web App URL.
6. In `index.html`, replace `GOOGLE_SCRIPT_URL_PLACEHOLDER` with that URL.
7. Push to GitHub.

### Custom domain

To point `altrovevineyards.com` at this site:

1. In your DNS (Namecheap), add a CNAME record:
   - Host: `www`
   - Value: `morganb180.github.io`
2. Add an A record for the apex domain (optional, for `altrovevineyards.com` without www):
   - Host: `@`
   - Value: `185.199.108.153` (and repeat for 109, 110, 111)
3. In this repo: Settings > Pages > Custom domain, enter `altrovevineyards.com`.
4. Enable "Enforce HTTPS".

### Deploy

Push to `main`. The GitHub Actions workflow deploys automatically.
