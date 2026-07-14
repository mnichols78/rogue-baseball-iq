# Rogue Baseball IQ — Engineering Log

This file records meaningful RBI work so the project can resume without depending on a particular chat.

## 2026-07-14 — Repository state audit and consolidation

### Completed

- Inspected `main`, open PR #1, open PR #2, and the Cloudflare deployment comments.
- Confirmed PR #1 contains project-memory documentation but conflicts with `main`.
- Confirmed PR #2 contains the Pathway/PitchGuard boundary cleanup and batch import, is stacked on PR #1, and has a successful Cloudflare preview deployment.
- Confirmed `main` contains `docs/BACKLOG.md` but not `docs/WORKFLOW.md`, `docs/NEXT_SESSION.md`, or `docs/ENGINEERING_LOG.md`.
- Created a clean consolidation branch from current `main`.
- Restored the project-memory workflow without forcing the conflicted PR.

### QA

- GitHub branch, PR metadata, file contents, and Cloudflare deployment comments were inspected.
- Authenticated browser QA of the Firebase flows was not performed.
- The Cloudflare preview URL could not be rendered in the current browser environment, so runtime behavior remains unverified.

### Risks / follow-ups

- PR #2 must not be merged based only on code review and a successful deployment.
- Firestore security rules are not stored in the repository and remain unverified.
- The batch importer uses simple delimiter splitting and may mis-handle quoted CSV values.
- PitchGuard does not yet support outing correction or deletion.

### Next recommended task

- Merge the clean project-memory consolidation PR.
- Rebase or recreate the product change from current `main`.
- Perform authenticated manual QA before merging product behavior.

## 2026-07-06 — PitchGuard batch import implemented on preview branch

- Added paste-and-parse support for comma, pipe, and tab-delimited rows.
- Added review-before-save and athlete matching.
- Added Firestore batch saving under matched athlete profiles.
- Runtime QA remained outstanding.

## 2026-07-06 — Pathway/PitchGuard boundary cleanup implemented on preview branch

- Made Athlete Profiles the live foundation.
- Kept Pathway labeled as planned.
- Removed duplicate athlete creation from PitchGuard.
- Added athlete-specific PitchGuard links and `?athlete=` preselection.
- Updated roadmap copy on the preview branch.
- Runtime QA remained outstanding.
