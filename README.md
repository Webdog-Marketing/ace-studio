# ACE Studio Barbershop website

A one-page Astro site for ACE Studio, 35 Longbrook Street, Exeter. It's hosted on Vercel, with prices, team and gallery managed in Airtable.

## Deploy (no terminal needed)

1. **GitHub:** create a new private repository called `ace-studio-barbershop`. On the empty repo page, click **uploading an existing file**. Drag in the *contents* of this folder (so `package.json` sits at the top level), then **Commit changes**.
2. **Vercel:** **Add New** → **Project** → import the repo. Vercel detects Astro, so leave the build settings as they are.
3. Before clicking **Deploy**, open **Environment Variables** and add the Airtable values (see `AIRTABLE-SETUP.md`). You can also add them later and redeploy. Without them the site uses the built-in fallback prices and team.
4. **Deploy.** Every commit to GitHub from now on redeploys automatically.

## Domain

In Vercel, go to **Settings** → **Domains** and add `acestudiobarbershop.com` and `www.acestudiobarbershop.com`. Vercel shows the exact DNS records to add. Add them wherever the domain's DNS is managed (Wix, if it's still registered there). The Wix holding page goes offline as soon as DNS points to Vercel.

## Analytics and Search Console

Optional environment variables in Vercel:

| Name | Value |
|---|---|
| `PUBLIC_GTM_ID` | Google Tag Manager container ID, for example `GTM-XXXXXXX`. Set up GA4 inside GTM |
| `PUBLIC_GSC_VERIFICATION` | Only if you verify Search Console with the HTML tag method. Paste the `content` value only |

The recommended Search Console setup is a **Domain** property verified by DNS TXT record. Once it's verified, submit `https://acestudiobarbershop.com/sitemap-index.xml`.

## Everyday edits

| What | Where |
|---|---|
| Prices, team, gallery photos | Airtable, then redeploy (see `AIRTABLE-SETUP.md`, step 6) |
| Opening hours, hero announcement, parking, links | `src/site.config.js`. Edit it on GitHub with the pencil icon and commit |
| Page copy (about, Uppercut Deluxe) | `src/pages/index.astro` |
| Colours, fonts, spacing | `src/styles/global.css` |

**After launch:** set `announcement: ''` in `src/site.config.js` to remove "Opening 10 October" from the hero. Add the opening hours to `hours` when confirmed; that section stays hidden until then.

## Logo and icons

The logo and icons in `public/` were cut from the WhatsApp images. When the designer's original files arrive, replace these files, keeping the same names:

- `public/images/logo.png`: full logo, cream on transparent, at least 1200 px wide
- `public/images/mark.png`: the A-mark, cream on transparent
- `public/favicon.ico`, `public/favicon-32.png`, `public/apple-touch-icon.png` (180×180), `public/icon-512.png`: the A-mark on the dark background
- `public/og-image.jpg` (1200×630): the image shown when the link is shared

## Structure

```
src/site.config.js      Business details, hours, parking, links
src/lib/airtable.js     Reads Airtable at build time
src/data/fallback.js    Backup prices and team if Airtable is unavailable
src/pages/index.astro   The page
src/styles/global.css   Styles
public/                 Logo, wall texture, icons
airtable-import/        CSVs for setting up the Airtable base
```
