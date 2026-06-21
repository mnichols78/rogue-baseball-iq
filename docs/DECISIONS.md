# RBI Decisions Log

This file records product and architecture decisions so future work does not depend on conversation memory.

## 2026-06-21 — GitHub is the project source of truth

Decision: RBI project memory should live in the GitHub repository, not only in ChatGPT conversations.

Reason: The project spans product decisions, Firebase data, Firestore rules, Cloudflare deployment, and source code. Conversation memory is not reliable enough to serve as the system of record.

## 2026-06-21 — Static app confirmed

Decision: Treat the current RBI build as a static HTML/CSS/JS Firebase app.

Reason: Repository inspection showed static files such as `index.html`, `admin.html`, `/js/rbi-auth.js`, and `/js/admin.js`. Earlier assumptions about Next.js were incorrect for the current implementation.

## 2026-06-21 — Founder account uses `isAdmin: true`

Decision: The founder/admin flag is `isAdmin: true` on the user's Firestore document.

Reason: The admin code checks `profile.isAdmin`. The founder user document for `michael-nichols@msn.com` is expected to include `isAdmin: true`, `role: "founder"`, and `accountType: "founder"`.

## 2026-06-21 — Admin console requires Firestore admin reads

Decision: Firestore rules must allow admin users to read the broader user/athlete records needed by `/admin.html`.

Reason: The admin page can verify the founder user but also calls `collection('users').limit(50).get()` and reads nested athlete collections. Without admin read rules, Firestore returns `Missing or insufficient permissions`.

## 2026-06-21 — One Athlete of Record

Decision: RBI should use one canonical Athlete of Record that multiple user accounts can access.

Reason: Duplicate athlete records across parent, coach, and athlete accounts would break the long-term value of RBI. Pitch counts, development history, mechanics reviews, scouting context, and pathway data should attach to one durable athlete profile.

## 2026-06-21 — Nested athletes are temporary

Decision: The current nested path `users/{userId}/athletes/{athleteId}` is technical debt and should not be the long-term model.

Reason: It makes one account the data owner and encourages duplicate athletes. The desired future model is `athletes/{athleteId}` plus `athleteAccess/{accessId}`.

## 2026-06-21 — Product owner / builder split

Decision: Mike remains product owner and baseball SME. ChatGPT/Codex-style tooling handles technical build work, repo documentation, and implementation mechanics.

Reason: Mike does not need to become a software engineer to lead the product. The repo should make the build process durable enough that the technical assistant can inspect and continue work across sessions.