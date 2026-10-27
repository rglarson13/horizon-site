# Horizon Site Development Guidelines

You are not building a finance app. You are helping explain and present a privacy-focused indie app to real people.

Structured deliberately like `~/runway-site/AGENTS.md` -- these are sister apps by the same developer, and the two sites are meant to stay recognisably the same thing. When a convention here is thinner than Runway's, that is usually because Horizon has not shipped yet, not because it differs.

## Purpose

This repository contains the website for the Horizon app.

The website exists to:
- Explain what Horizon does.
- Help users understand the app's privacy-first approach.
- Provide support resources.
- Satisfy Google Play's requirement for a publicly hosted privacy policy.
- Encourage downloads and feedback.

The website is not the app itself. Do not add app functionality, business logic, or product behavior here.

The goal of this site is to explain the app to humans.

## Product Context

Horizon is a privacy-focused net-worth projection app.

It was made by a single indie developer, who also makes [Runway](https://rglarson13.github.io/runway-site/).

The core user question is:

> "If I keep doing what I'm doing, where does this end up?"

Horizon helps users answer this by projecting every account forward from:
- balances they have recorded themselves,
- contributions, employer matches, and transfers they have described,
- growth assumptions they control.

Horizon intentionally avoids becoming a full budgeting platform. Do not describe it as:
- a budgeting app,
- a transaction tracker,
- a spending categorization tool,
- a cash-flow forecaster (that is Runway -- the two are deliberately different products, and blurring them makes both harder to explain).

**Recorded vs. Projected** is the idea the whole product rests on: a balance the user actually recorded is a fact and is never overwritten by a projection; everything else is derived from those facts, live. If a page describes Horizon's behaviour, it must not imply the app ever turns a guess into history.

## Content Philosophy

The website should communicate:

- Simplicity: Horizon is designed to answer one important question clearly.
- Privacy: User financial data stays on the user's device.
- Transparency: Users should understand how Horizon works.
- Trust: The site should feel like a thoughtful independent project, not a faceless financial service.

Avoid:
- exaggerated marketing claims,
- vague "AI-powered finance revolution" language,
- claims that imply bank-level services,
- promises about returns, outcomes, or prosperity -- Horizon projects what the user described; it does not deliver a result,
- unnecessary complexity.

Prefer:
- clear explanations,
- plain language,
- concise descriptions,
- honest limitations.

## Privacy Principles

Privacy is a core part of Horizon's identity.

Do not add content that suggests:
- user accounts are required,
- financial data is uploaded to servers,
- user information is sold or shared,
- analytics or tracking are present unless explicitly added.

`privacy-policy.md`'s content is **not authored here** -- it is mirrored from the app repo (`~/savingsplan/docs/privacy-policy.md`), which is the source of truth. Use the `sync-privacy-policy` skill to pull an update rather than editing this page's substance directly (formatting/voice fixes that don't change what's disclosed are fine to make here directly).

The reason for that arrangement: every claim in the policy has to be checkable against the code that implements it, and the code lives in the app repo. Horizon's policy currently claims the app makes **no network requests of its own** -- that is a strong claim, it is true today, and it stops being true the moment a dependency that phones home is added. The one exception it discloses is Google Play's, not Horizon's: the licence check Play adds to the copy it delivers (since the October 27, 2026 policy). Verify before restating either.

If privacy behavior changes in the future, update all relevant pages:
- privacy-policy.md
- index.md
- support/help documentation

## Website Structure

Important pages include:

- `index.md` - Main landing page
- `privacy-policy.md` - Privacy policy (mirrored -- see above)
- `get-help.md` - User support
- `request-a-feature.md` - Feature feedback
- `about-dev.md` - About the developer

Not present yet, deliberately:
- A support/donate page. Horizon has not shipped; there is nothing to support yet.
- Technical notes / release notes. Runway's equivalent starts at 1.0.0 and carries no pre-release history, for the same reason: it exists for users who weren't around for the churn. Horizon's `CHANGELOG.md` in the app repo is internal and is never published verbatim.

The nav (`header_pages` in `_config.yml`) is a shortlist, not an index. Get Help sits first because that is what someone in trouble is looking for. Pages left out of the nav must still be linked from the landing page's "Learn more" list -- otherwise they are reachable from nowhere.

## Feature Accuracy

Never invent Horizon features, capabilities, integrations, or supported platforms.

Before describing a feature:
- verify it exists in the app (`~/savingsplan/FEATURES.md` is the app repo's own inventory of what is actually built),
- avoid promising future functionality unless clearly labeled as planned.

## Writing Style

The website should be:

- Friendly
- Professional
- Approachable
- Written for normal users, not developers

Prefer:
- "Your data stays on your device."
- "See what your net worth looks like in twenty years."
- "Know when growth starts to outpace what you put in."

Avoid:
- technical implementation details unless they help users.

## Em-dashes

I use a lot of em-dashes in my natural writing, but because I'm a human being typing on a physical keyboard I need to use double-hyphens (--) instead. And because I value aesthetics over strict grammar rules, I always surround them with spaces (so, " -- "). Never, ever use a solid em-dash, and never, ever leave it tight against the words on either side.

## Design Guidelines

The website should be clean and simple.

Prioritize:
- readability,
- mobile-friendly layouts,
- clear navigation,
- screenshots and visual examples,
- consistent Horizon branding.

Avoid:
- unnecessary animations,
- clutter,
- overly complex layouts,
- generic startup aesthetics.

The palette and the stylesheet are shared with runway-site on purpose -- the served CSS is currently byte-for-byte identical. Diverging the two sites' look is a decision to make deliberately, not a side effect of editing one of them.

Store and hero artwork is **generated**, not hand-made: `assets/feature-graphic-source.js` renders it from the same geometry and palette as the app's own icons (`~/savingsplan/assets/icon-source.js`), so the listing and the installed app cannot drift apart. Change the tagline or the colour there and re-run it; do not edit the PNG.

## Accessibility

Accessibility matters.

Ensure:
- sufficient color contrast,
- readable font sizes,
- meaningful image alt text,
- clear link text,
- mobile-friendly layouts.

## Changes

Before making significant website changes:
- Preserve existing links. `privacy-policy.html`'s URL in particular is entered into the Google Play Console listing -- renaming that file breaks the store entry, not just a link.
- Avoid breaking GitHub Pages/Jekyll builds.
- Keep Markdown simple when possible.
- Verify that pages render correctly, and check the **live** site rather than the source -- a Jekyll build can succeed and still produce a page that is wrong.

When adding new features or sections:
- Consider whether users will understand why it exists.
- Prefer fewer, clearer pages over many small pages.

## Still outstanding

- **The contact address.** `HorizonNetWorthApp@gmail.com` appears on every page and in `_config.yml`, and did not exist when it was written. A single shared address across both apps was under consideration instead.
- **Screenshots.** The landing page has the feature graphic but no screenshots; Runway's has both, and Google Play requires at least two.

## A real person made this

Same as Runway: this is one person's work, and the site should read like it.
