# Side Quest — setup guide

You have three files:

- **`index.html`** — the website itself (the only file you host).
- **`Code.gs`** — the backend script that lives inside your Google Sheet.
- **`SETUP.md`** — this guide.

The site works in **preview mode** the moment you open `index.html` — all 82 games show with cover art. To make reviews load and votes/comments save for everyone, do the backend steps below. Total time: about 15 minutes, one time only.

Here's the shape of what you're building:

```
  index.html  ←→  Apps Script web app  ←→  Google Sheet
  (on GitHub)      (read / write API)       (your data)
       │
   Google sign-in  →  identifies who's posting
```

---

## Part 1 — The Google Sheet + backend (≈8 min)

1. Go to [sheets.new](https://sheets.new) to create a blank Google Sheet. Name it something like **Side Quest data**.
2. In the menu: **Extensions ▸ Apps Script**. A code editor opens in a new tab.
3. Delete the sample `function myFunction(){}` text, then open `Code.gs` (the file I gave you), copy *everything*, and paste it in.
4. Near the top you'll see two things to fill in — leave them blank for now, you'll come back after Part 2:
   ```js
   const CLIENT_ID = "";
   const ALLOWED_EMAILS = [ ];
   ```
5. Click the **save** icon (or Ctrl/Cmd-S).
6. Switch back to your Sheet tab and **reload the page**. A new **Side Quest** menu appears in the menu bar (next to Help). If it doesn't show, wait a few seconds and reload again.
7. Click **Side Quest ▸ Set up sheets**. The first time, Google asks you to authorize the script — click through **Review permissions ▸ [your account] ▸ Advanced ▸ Go to (project) ▸ Allow**. (This warning is normal for personal scripts.) Run it once more if needed; it creates four tabs: Games, Comments, Upvotes, Users.
8. Click **Side Quest ▸ Import starter games**. This pulls all 82 games in and fetches each one's Steam review score, release date, and trailer. It takes a minute or two — let it finish, then check the Games tab filled in.

---

## Part 2 — Google sign-in (≈5 min)

This is what lets the site know who's commenting and voting.

1. Go to the [Google Cloud Console](https://console.cloud.google.com/). At the top, create a new project (call it **Side Quest**) and select it.
2. In the search bar, go to **APIs & Services ▸ OAuth consent screen**.
   - Choose **External**, click Create.
   - App name: **Side Quest**. Add your email where required. Save and continue through the screens.
   - On **Audience / Test users**, add the Google emails of all four of you (Álvaro, Blake, Lia, you). While the app is in "Testing", only these accounts can sign in — which is exactly the guest list you want.
3. Go to **APIs & Services ▸ Credentials ▸ Create credentials ▸ OAuth client ID**.
   - Application type: **Web application**.
   - Under **Authorized JavaScript origins**, add the address where the site will live. ⚠️ This must be the **origin only** — the scheme + domain with **no path and no trailing slash**. For GitHub Pages that means `https://YOURNAME.github.io` — *not* `https://YOURNAME.github.io/side-quest/`. Adding the path is the single most common reason sign-in silently fails. For local testing you can also add `http://localhost:8000`.
   - Leave **Authorized redirect URIs** empty (this sign-in method doesn't use them).
   - Click Create. Copy the **Client ID** (ends in `.apps.googleusercontent.com`).

Now wire it up:

4. Open `index.html` in a text editor. Near the top of the `<script>` section find:
   ```js
   const CONFIG = {
     APPS_SCRIPT_URL: "",
     GOOGLE_CLIENT_ID: "",
   };
   ```
   Paste your Client ID into `GOOGLE_CLIENT_ID`.
5. Back in the Apps Script editor, paste the same Client ID into `CLIENT_ID`, and fill `ALLOWED_EMAILS` with everyone's lowercase Google emails:
   ```js
   const CLIENT_ID = "1234....apps.googleusercontent.com";
   const ALLOWED_EMAILS = ["you@gmail.com","blake@gmail.com","lia@gmail.com","alvaro@gmail.com"];
   ```
   Save.

---

## Part 3 — Deploy the backend + host the site (≈4 min)

**Deploy the Apps Script as a web app:**

1. In the Apps Script editor, click **Deploy ▸ New deployment**.
2. Click the gear next to "Select type" and pick **Web app**.
3. Set **Execute as: Me**, and **Who has access: Anyone**. (This lets the site read/write; only people on `ALLOWED_EMAILS` can actually post, because the script checks their sign-in.)
4. Click Deploy, authorize if asked, and copy the **Web app URL** (ends in `/exec`).
5. Paste it into `index.html` ▸ `CONFIG.APPS_SCRIPT_URL`. Save.

> Whenever you change `Code.gs` later, do **Deploy ▸ Manage deployments ▸ edit ▸ Version: New version** so the changes go live. The URL stays the same.

**Host `index.html` on GitHub Pages:**

1. At [github.com](https://github.com), create a new repository — public, named e.g. `side-quest`.
2. Click **Add file ▸ Upload files**, drag in your final `index.html`, and commit.
3. Go to the repo's **Settings ▸ Pages**. Under "Build and deployment", set Source to **Deploy from a branch**, branch **main**, folder **/ (root)**, and Save.
4. After a minute, your site is live at `https://YOURNAME.github.io/side-quest/`.
5. Copy that exact address and make sure it's listed under **Authorized JavaScript origins** back in the Google Cloud Console (Part 2, step 3) — sign-in only works on origins listed there. Add it if it's not, and save.

Done. Share the link with the crew.

---

## Everyday use

- **Add a game:** click **Add game**, paste a Steam link, tag who it's for, pick genres/mode/players, hit add. It pulls the cover, review score, release date, and trailer automatically and goes live for everyone immediately.
- **Add a game from the Sheet instead:** add a row to the Games tab. Use comma-separated values for people/genres/modes (people must be `alvaro`, `blake`, `lia`, or `lynn`). Leave the Steam fields (reviewPct, trailer, etc.) blank, then run **Side Quest ▸ Refresh Steam data** to fill them in.
- **Watch trailers:** open a game and click **Watch trailer** — it plays inline without leaving the site. Trailers come from Steam and are filled in on import/refresh, so they appear once the backend is connected (not in preview mode).
- **Personal notes:** the `note` column in the Games tab is yours to fill in per game. It shows in the card's detail view.
- **Upvotes & comments:** anyone signed in (and on the guest list) can vote once per game and post in each game's discussion. People can delete their own comments and toggle their own vote.
- **Display names:** on first sign-in, each person picks how their name appears. They can change it later by clicking their name in the top-right.
- **Backfilling trailers/reviews:** if you added games before this feature, or scores drift over time, run **Side Quest ▸ Refresh Steam data** to re-pull reviews and trailers for every game. (It auto-adds the new `trailer` column if your sheet predates it.)

## Adding or removing a friend later

- Add their email to `ALLOWED_EMAILS` in `Code.gs` **and** to Test users in the OAuth consent screen, then redeploy a new version.
- To add them as a taggable person on cards, that's a small code change in two spots (the `PEOPLE` list in `app.js` and using their id in the Sheet) — paste me the name and I'll hand you the edit.

## If something's off

- **"Couldn't reach the backend"** — check `APPS_SCRIPT_URL` ends in `/exec` and the deployment access is "Anyone".
- **The sign-in button does nothing / no popup** — almost always the origin. In Google Cloud ▸ Credentials ▸ your OAuth client, **Authorized JavaScript origins** must list your site's origin with no path and no trailing slash (e.g. `https://yourname.github.io`, never `.../side-quest/`). Also confirm the signed-in Google account is added as a Test user, that `GOOGLE_CLIENT_ID` in `app.js` matches, and that you're visiting the page over `https://` (not opening the file directly). Changes to origins can take a few minutes to take effect.
- **No trailer on a game** — that game may not have a Steam trailer, or it was added in preview mode. Run **Refresh Steam data**.
- **Reviews show "No reviews yet"** — that game may have too few Steam reviews, or Steam was briefly unreachable during import. **Refresh Steam data** re-fetches.
- **Changed `Code.gs` but nothing updated** — you need to deploy a **new version** (Manage deployments), not just save.
