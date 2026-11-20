# PrimeGrain - bulk idli website

A single-page static website (HTML, CSS, JavaScript). No build step is needed.

## Files

- `index.html` - the page
- `styles.css` - all styling (desktop, tablet and mobile)
- `main.js` - mobile menu, scroll effects and the enquiry form
- `*.webp`, `logo.svg`, `favicon.svg` - photos, logo and favicon
- `.nojekyll` - tells GitHub Pages to serve the files as they are

## Enquiry form

The form sends enquiries to **primegrainkitchens@gmail.com** using FormSubmit (free, no account needed).

- The very first enquiry triggers an activation email from FormSubmit to that inbox. Open it and click **Activate Form**. Enquiries are delivered after that.
- To send enquiries to a different inbox, change the email address in the `action` attribute of the `<form>` tag in `index.html`.

## Photo credits (Unsplash Licence - free for commercial use)

- Idlis on banana leaf with chutney - Shreyak Singh
- Idlis in a tray with sambar and coffee - Mayur Roxan
- Podi idli - Zoshua Colah

## Launch checklist

1. Create a GitHub repository and upload these files.
2. Turn on GitHub Pages (Settings > Pages > Deploy from branch > main / root).
3. Check the staging address (https://USERNAME.github.io/REPOSITORY/) on desktop and mobile, and send a test enquiry.
4. Only after staging looks right: add the custom domain in Settings > Pages, add the DNS records in GoDaddy, then tick **Enforce HTTPS** once the certificate is issued.
