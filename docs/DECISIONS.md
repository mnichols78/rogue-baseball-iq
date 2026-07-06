# Rogue Baseball IQ — Decisions Log

Last updated: 2026-07-06

This file records product and architecture decisions so future work does not depend on conversation memory.

## 2026-06-21 — GitHub is the project source of truth

Decision: RBI project memory should live in the GitHub repository, not only in ChatGPT conversations.

Reason: The project spans product decisions, Firebase data, Firestore rules, Cloudflare deployment, and source code. Conversation memory is not reliable enough to serve as the system of record.

## 2026-06-21 — Static app confirmed

Decision: Treat the current RBI build as a static HTML/CSS/JS Firebase app.

Reason: Repository inspection showed static files such as `index.html`, `account.html`, `athletes.html`, `pitchguard.html`, and shared JavaScript under `/js`. Earlier assumptions about Next.js were incorrect for the current implementation.

## 2026-06-21 — Founder account uses `isAdmin: true`

Decision: The founder/admin flag is `isAdmin: true` on the user's Firestore document.

Reason: Admin access should be explicit and stored on the user profile. This should not be confused with normal account type values such as parent, coach, athlete, or organization.

## 2026-07-06 — Athlete-centered architecture remains the product anchor

Decision: RBI modules should attach to the athlete profile instead of living as disconnected tools.

Reason: The strongest long-term product idea is a persistent athlete record. PitchGuard, Pathway, PitchLab, SwingLab, ScoutHub, and RBI OS should all add useful records to the athlete over time.

Implication: Avoid building standalone tools that cannot later attach to `users/{uid}/athletes/{athleteId}` or an equivalent future team/org model.

## 2026-07-06 — PitchGuard is the first product to harden

Decision: PitchGuard should be hardened before building PitchLab, SwingLab, ScoutHub, or monetization.

Reason: PitchGuard is easier to validate, safer to test, and already has working account/athlete/outing persistence. A trustworthy workload tool is a better MVP wedge than a broad but shallow product suite.

Implication: Next work should focus on edit/delete, age-specific rules, available-on dates, and Firestore security verification.

## 2026-07-06 — PitchGuard cloud sync is no longer merely “next”

Decision: Treat PitchGuard cloud persistence as live MVP functionality, not a future roadmap item.

Reason: Current PitchGuard code reads athletes from Firestore and writes outings under each selected athlete.

Implication: Public roadmap copy should be updated from `PitchGuard Cloud Sync — Next` to something closer to:

- PitchGuard Cloud MVP — Live
- PitchGuard Edit/Delete — Next
- PitchGuard Age Rules — Next

## 2026-07-06 — Do not overclaim mechanics analysis

Decision: Future PitchLab/SwingLab should be framed as coach-support and drill-mapping tools, not definitive biomechanical diagnosis.

Reason: Video analysis can easily overpromise. RBI should preserve credibility by mapping observed issues to structured drill recommendations and coach-friendly practice plans.

Implication: Avoid language like “AI perfectly analyzes mechanics.” Prefer language like “review checkpoints,” “identify likely issue,” “suggest drill set,” and “coach decision support.”

## 2026-07-06 — PWA/web-first remains the right path

Decision: Continue web/PWA-first instead of native mobile app-first.

Reason: The product needs speed of iteration, simple deployment, and low friction. App stores are unnecessary until user demand proves the need.

Implication: Keep improving mobile web experience, manifest, service worker, and installability before considering native apps.

## 2026-07-06 — No payments yet

Decision: Do not add Stripe, subscriptions, or pricing gates yet.

Reason: The product is not yet validated enough to justify billing complexity. The next value milestone is a trusted PitchGuard MVP with real small-circle use.

Implication: Build usefulness first. Monetization can be revisited after repeat usage is visible.
