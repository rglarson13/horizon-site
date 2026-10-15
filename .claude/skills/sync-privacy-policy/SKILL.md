---
name: sync-privacy-policy
description: Sync Horizon's privacy policy from the app repo (~/savingsplan/docs/privacy-policy.md, the source of truth) to the public website repo (~/horizon-site/privacy-policy.md), adapting it for Jekyll, and check sibling website pages for privacy claims that are now stale. Use when docs/privacy-policy.md changes in the app repo, when asked to publish/sync the privacy policy to the website, or when the site's privacy policy looks out of date.
---

# Sync the privacy policy to the website

`~/savingsplan/docs/privacy-policy.md` is the source of truth. `~/horizon-site/privacy-policy.md`
is the public-facing copy, rendered by Jekyll/GitHub Pages. They drift because they're edited
independently in two different repos -- this skill is the repeatable process for bringing the
site back in sync, not just a copy-paste.

Both repos are local, in the same WSL environment, at fixed paths (`~/savingsplan`,
`~/horizon-site`) -- this works regardless of which repo the current session's working directory
is in.

The published URL is entered in the Google Play Console listing, so this page being wrong is not
a cosmetic problem.

## Steps

1. **Diff before touching anything.** Read both files and understand exactly what changed in
   the app repo's version since the site was last synced -- don't blindly overwrite; know what
   you're porting and why.

2. **Port the content, with three structural adaptations** (these are the only three -- otherwise
   port the app repo's wording verbatim, it's the canonical text):
   - Drop the HTML comment at the top of the app repo's copy. It explains the arrangement to
     developers and has no business on a public page.
   - Keep the site's Jekyll front matter (`layout: page`, `title: Privacy Policy`) at the top --
     the app repo's copy doesn't have this, don't drop it.
   - The site's own convention is a clickable contact link:
     `[HorizonNetWorthApp@gmail.com](mailto:HorizonNetWorthApp@gmail.com)` -- the app repo's copy
     is plain text. Convert it; don't port the plain-text version.
   - Carry the effective date over exactly as written in the app repo -- it's the authoritative
     version.

3. **Verify the strong claims against the code, don't just move the words.** This policy makes
   claims that are unusually absolute, and they were true when written because they were
   checked. Re-check the ones that a new dependency could quietly falsify:
   - *"Horizon makes no network requests of its own"* -- grep `~/savingsplan/src` for `fetch(`,
     `XMLHttpRequest`, `WebSocket`, and `http`; check `package.json` for anything that phones
     home (an analytics SDK, a crash reporter, `expo-updates`, billing).
   - *"no analytics or tracking", "no crash reporter", "no ads"* -- same check.
   - *"Horizon requests no runtime permissions"* -- check `app.json` and any new native module.
   - *The Android backup and transfer paragraph* -- it is written to match `android.allowBackup`
     (`false`) and the `./plugins/withNoDataExtraction` plugin in `~/savingsplan/app.json`, which
     excludes every storage domain from device-to-device transfer. If either changes, this
     paragraph is wrong until it's rewritten. `privacyPolicyMatchesCode.test.ts` in the app repo
     pins both.
   - *The diagnostics-log paragraph* -- it claims the log records no account names or figures,
     and lists what it does record (database opens, app open/background/resume times, failed
     operations). Names and figures are kept out by `labelFor` in
     `~/savingsplan/src/data/statementLabel.ts`, tested in `statementLabel.test.ts`. If logging
     grows, confirm the list is still complete.

4. **Check sibling pages for now-stale privacy claims.** This is the part that's easy to skip
   and is exactly why this is a skill and not just a copy command. `~/horizon-site/AGENTS.md`
   already states the rule directly (see its "Privacy Principles" section) -- follow that rule,
   don't duplicate it here. At minimum, read:
   - `index.md` -- it makes flat privacy claims as feature bullets ("No cloud sync required.",
     "No collecting your personal information."). If an opt-in feature ever involves the user's
     own cloud storage or any network call, the fix is to make the claim accurate rather than to
     delete it.
   - `get-help.md` -- it tells people the diagnostics log records no account names or figures.

5. **Verify the published page**, not just the file. Push, wait for the Pages build, then fetch
   `https://rglarson13.github.io/horizon-site/privacy-policy.html` and confirm it returns 200 and
   renders the new effective date. A Jekyll build can succeed and still produce a broken page.
