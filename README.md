# Comfort Dental Clinic — Website

A static website with no database. Each treatment has its own WhatsApp button and pre-written message.

## Edit
- `js/main.js`: WhatsApp number, list of treatments, and the message each button sends.
- `index.html`: search for `EDIT` to find the clinic hours, qualifications and address. Add the Google Map embed in the `.map` block.

## Deploy (Cloudflare Pages)
1. Upload all files in this folder to a new GitHub repo, with `index.html` at the top level.
2. Cloudflare → Workers & Pages → Create → **Pages** tab → Import an existing Git repository.
3. Framework preset: None. Build command: leave empty. Build output directory: `/`
4. Save and Deploy. Every push to GitHub updates the site.
