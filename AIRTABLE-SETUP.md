# Airtable setup: ACE Studio website

Airtable holds the three things that change: **prices**, **the team** and **gallery photos**. Everything else (address, parking, hours, links) lives in `src/site.config.js`.

The site reads Airtable when it builds. After editing Airtable, the site needs a rebuild to show the changes (step 6).

---

## 1. Create the base

1. In Airtable, click **Create** → **Import** → **CSV file** and upload `airtable-import/Services.csv`. Name the base **ACE Studio Website** and make sure the table is named **Services**.
2. In the same base, click **+ Add or import** → **CSV file** and upload `airtable-import/Team.csv`. Name the table **Team**.
3. Click **+ Add or import** → **Start from scratch** and name the table **Gallery**.

Table and field names must match exactly, including capitals, because the website looks them up by name.

## 2. Set the field types

The CSV import brings every field in as text. Change these types: click the field name → **Edit field**.

**Services**

| Field | Type |
|---|---|
| Name | Single line text |
| Price | Currency (£, 2 decimal places optional) |
| Student Price | Currency |
| Price From | Checkbox. Adds "from" before the price |
| Coming Soon | Checkbox. Shows a "Coming soon" badge instead of a price |
| Description | Long text |
| Order | Number. Lower numbers show first |
| Show | Checkbox. Only ticked rows appear on the site |

**Team**

| Field | Type |
|---|---|
| Name | Single line text |
| Role | Single line text (for example Owner or Barber) |
| Instagram | Single line text. Handle only, with or without the @ |
| Photo | Attachment. Add this field; it isn't in the CSV |
| Order | Number |
| Show | Checkbox |

The two "Barber TBC" rows are unticked, so they stay hidden. Fill in the name, add a photo and tick **Show** when they join.

**Gallery**

| Field | Type |
|---|---|
| Photo | Attachment |
| Alt Text | Single line text. A short description for screen readers and Google, for example "Skin fade with textured crop" |
| Order | Number |
| Show | Checkbox |

The gallery section and its menu link stay hidden until at least one row has a photo and **Show** ticked.

**Photo sizes:** headshots in portrait (3:4), at least 900 px wide. Gallery photos are cropped square, at least 1000 px wide. Only the first attachment in each Photo cell is used. You can upload full-size phone photos; the site resizes and compresses them.

## 3. Create an access token

1. Go to https://airtable.com/create/tokens → **Create token**.
2. Name: `ACE Studio website (Vercel)`.
3. Scope: **data.records:read** only.
4. Access: **ACE Studio Website** base only.
5. Create it and copy the token (it starts with `pat`). Airtable shows it only once.

The token can only read this one base, so it's low-risk, but keep it out of GitHub.

## 4. Find the base ID

Open the base. The URL looks like `https://airtable.com/appXXXXXXXXXXXXXX/tbl...`. The part starting with `app` is the base ID.

## 5. Add both to Vercel

Vercel → the project → **Settings** → **Environment Variables**. Add:

| Name | Value |
|---|---|
| `AIRTABLE_TOKEN` | the token from step 3 |
| `AIRTABLE_BASE_ID` | the `app...` ID from step 4 |

Then **Deployments** → the latest deployment → **⋯** → **Redeploy**. In the build log you should *not* see `[airtable] Not configured`. If Airtable can't be reached, the site still builds using the prices and team in `src/data/fallback.js`, and the build log says so.

## 6. Publishing changes

**Simple way:** after editing Airtable, open Vercel → **Deployments** → **⋯** → **Redeploy**. The site updates in about a minute.

**Letting the client publish (optional):** this lets Jake tick a box in Airtable to update the site. It uses Airtable's "Run a script" automation action, so check it's included in the Airtable plan.

1. Vercel → **Settings** → **Git** → **Deploy Hooks**. Create one called `airtable` on the `main` branch and copy the URL.
2. In Airtable, add a table called **Publish** with one row and a checkbox field **Publish now**.
3. **Automations** → **Create automation**:
   - Trigger: **When a record matches conditions**. Table: Publish. Condition: Publish now is checked.
   - Action 1: **Run a script**:
     ```js
     await fetch('PASTE_DEPLOY_HOOK_URL_HERE', { method: 'POST' });
     ```
   - Action 2: **Update record**. Table: Publish, record ID from the trigger, and set Publish now to unchecked.
4. Turn the automation on.

After that, Jake edits prices or photos, ticks **Publish now**, and the site rebuilds itself.

Treat the deploy hook URL like a password. Anyone with it can trigger rebuilds, but they can't change content.
