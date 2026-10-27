---
layout: page
title: Privacy Policy
---

**Effective date: October 27, 2026**

Horizon is a net-worth tracking app. This policy is short because the honest answer to "what do you do with my data?" is: nothing. We never see it.

## The one-sentence version

Your financial data is stored only on your device, is never transmitted to us or anyone else, and the only way it ever leaves your phone is if you export it yourself.

## What we collect

Nothing. We have nothing to collect because your financial data never comes to us.

- **No account.** There is no sign-up, no email, no password, and no user ID. We have no way to know who you are.
- **No servers of ours.** Horizon has no backend. Your accounts, balances, income, goals, and settings are stored in a local database on your device and nowhere else.
- **No analytics or tracking.** The app does not collect or use your data for analytics or advertising, contains no crash reporter that phones home, and performs no telemetry of any kind.
- **No bank access.** Horizon never connects to your bank. Every number in the app is one you typed in yourself.
- **No ads.** There is no advertising in Horizon and no advertising SDK in it.

## Network connections the app makes

None. Horizon makes no network requests of its own -- not at launch, not in the background, not ever. It contains no code that contacts a server, and it does not check for updates to itself.

App installs and updates through Google Play are handled by Google Play itself and are covered by Google's own policies, not by anything Horizon does. Google Play also adds a licence check to the copy of Horizon it delivers: when the app starts, it asks the Play Store app on your phone whether this copy was installed from Google Play. That question is answered by the Play Store app and Google, not sent by Horizon, and none of your data is part of it.

## Where your data lives

All of your data is kept in a local database on your device. If you delete the app, that database is deleted with it.

**Because of this, exporting is your only backup.** Exports are created only when you choose to make one, in one of three places: a full backup from Settings → Back up your data; a spreadsheet of the accounts-by-years table from that table's own "Export as a spreadsheet" button; or, if Horizon ever hits a problem it can't recover from, a full backup from the "Export a backup" button on the screen it shows instead -- offered whenever its database can still be read, which is every case except the database failing to open at all. Either way, Horizon writes the file and hands it to your phone's own share sheet -- you choose where it goes. Restoring works the same way in reverse, through your device's own file picker, or by pasting a backup's text into Horizon yourself. What you do with an export file -- save it, email it, move it to another phone -- is entirely your choice and happens through your device's features, not through any service of ours.

A full backup contains everything Horizon knows about your finances, in plain readable text; a spreadsheet contains the accounts, balances, and money in and out shown in the table. Treat either the way you would treat any document containing your account balances.

**Android's own backup and transfer.** Horizon opts out of Android's automatic app backup, and excludes all of its data from Android's device-to-device transfer, so none of it -- neither your finances nor its diagnostics log -- is copied into the device backup associated with your Google account or carried across when you move to a new phone. This is also why exporting really is your only backup: moving to a new phone means exporting from the old one and restoring on the new one.

## Diagnostics

Horizon keeps a small log on your device to help diagnose problems with its own database -- what failed, and what the app was doing at the time. It is stored in a plain file on your device and **is never sent anywhere automatically**.

It deliberately records no account names, no balances, and no values you have entered. What it does record, each with the time it happened: when the app opened its database, when the app was opened, sent to the background and brought back, and -- when something goes wrong -- the shape of the operation that failed, such as `run UPDATE rollup_members SET`. The times are there so a failure can be understood in context; they also mean the log shows when you used the app. It keeps the most recent few hundred entries from the current session and the one before it. You can view how many problems have been recorded, share the log, or delete it, from Settings → Diagnostics; the screen Horizon shows if it hits a problem it can't recover from also offers to share it. If you choose to share it, it goes wherever you send it, through your phone's share sheet.

## Permissions

Horizon requests no runtime permissions. It has no access to your camera, microphone, location, contacts, or photos. Reading and writing backup files happens through the system file picker and share sheet, which grant access to the single file you pick, at the moment you pick it. A handful of install-time permissions -- including internet access -- come bundled with libraries Horizon uses for other things, but nothing in Horizon calls for them, and the app is built to block every one that grants access to anything at the operating-system level rather than merely leaving them unused. The one left in place is internal to Android: a signature-level permission its libraries use so the app's own messages to itself can't be read by other apps. No other app can hold it, and it grants nothing. Google Play adds one more when it delivers the app, for the licence check described above: it lets the app ask the Play Store app whether it was installed from Google Play, and gives no access to anything else on your phone.

## What we will never do

- We will never upload, sync, back up, or otherwise copy your financial data off your device.
- We will never sell or share data we do not have.
- If a future feature ever needs to move any of your data anywhere, it will be strictly opt-in, clearly explained before anything happens, and this policy will be updated first.

## Children

Horizon does not collect personal information from anyone, including children.

## Changes to this policy

If this policy changes, the new version will be published at the same location as this one, with an updated effective date. Since the app collects nothing, changes would realistically only ever describe new optional features.

## Contact

Questions about this policy: [HorizonNetWorthApp@gmail.com](mailto:HorizonNetWorthApp@gmail.com)
