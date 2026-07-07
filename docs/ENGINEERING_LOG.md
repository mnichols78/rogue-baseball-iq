# Rogue Baseball IQ — Engineering Log

This file records meaningful RBI work sessions so the project can resume cleanly even when chat context is unavailable.

## 2026-07-06 — PitchGuard batch import added

### Completed

- Added a PitchGuard Batch Import panel.
- Added paste-and-parse support for comma, pipe, and tab delimited rows.
- Added review-before-save table.
- Added athlete name matching against existing Athlete Profiles.
- Added manual athlete match correction before saving.
- Added Firestore batch save for matched import rows.
- Added `source: batch-import` for imported outings and `source: manual` for manual outings.
- Added requirement document `REQ-0002`.

### Changed files

- `pitchguard.html`
- `js/pitchguard.js`
- `css/pitchguard.css`
- `docs/requirements/REQ-0002-pitchguard-batch-import.md`
- `docs/ENGINEERING_LOG.md`

### Decisions

- Batch import is review-before-save, not automatic scraping.
- Imported pitcher names must map to existing athlete profiles before saving.
- RBI will not create athletes automatically from imported names in this MVP.

### QA

- Code review only. Manual preview QA still required.

### Risks / follow-ups

- Duplicate detection is not implemented.
- Import parser expects simple rows and will need real GameChanger samples to improve.
- Mobile review table needs practical testing.

### Next recommended task

- QA the branch preview for athlete profile creation, PitchGuard preselection, batch import parsing, manual match correction, and batch save.

## 2026-07-06 — Pathway / PitchGuard boundary cleanup

### Completed

- Created cleanup branch `cleanup/pathway-pitchguard-boundaries` from the project-memory docs branch.
- Clarified that Athlete Profiles are the live foundation module.
- Clarified that PitchGuard is the first live athlete-linked product module.
- Clarified that Pathway is planned, not currently live.
- Removed PitchGuard's duplicate athlete creation form.
- Added profile-specific PitchGuard links from Athlete Profiles.
- Added `?athlete=` preselection support in PitchGuard.
- Updated public and workspace roadmap copy so PitchGuard cloud log is marked live MVP.
- Added requirement document `REQ-0001`.

### Changed files

- `index.html`
- `dashboard.html`
- `pitchguard.html`
- `js/pitchguard.js`
- `js/athletes.js`
- `css/pitchguard.css`
- `css/athletes.css`
- `docs/requirements/REQ-0001-pathway-pitchguard-boundaries.md`
- `docs/BACKLOG.md`
- `docs/NEXT_SESSION.md`
- `docs/ENGINEERING_LOG.md`

### Decisions

- Athlete creation should happen through Athlete Profiles, not inside PitchGuard.
- PitchGuard should consume athlete profiles and attach outings to them.
- Pathway should stay planned until an actual timeline/development workflow exists.

### QA

- Code review only in this session. Manual preview QA still required after Cloudflare deploys the cleanup branch.

### Risks / follow-ups

- Need manual browser QA on the branch preview.
- Existing users who created partial athletes from PitchGuard may have records missing birthdate, grad year, position, bats/throws, height, and weight. Edit profile support is still needed.
- Firestore rules still need verification before outside testers.

### Next recommended task

- QA the branch preview for account → athlete profile → PitchGuard athlete preselection → outing save.

## 2026-07-06 — Project memory workflow added

### Completed

- Confirmed RBI project memory should live in GitHub, not only in ChatGPT conversations.
- Added `docs/WORKFLOW.md` to define start/end session discipline.
- Added `docs/NEXT_SESSION.md` as the standing handoff file.
- Added `docs/ENGINEERING_LOG.md` for session history.
- Continued docs branch: `docs/project-memory-2026-07-06`.

### Changed files

- `docs/WORKFLOW.md`
- `docs/NEXT_SESSION.md`
- `docs/ENGINEERING_LOG.md`

### Decisions

- Every meaningful RBI session should start by reading repo docs.
- Every meaningful RBI session should end by updating repo docs.
- Documentation update is part of the definition of done.
- `NEXT_SESSION.md` should be rewritten at the end of each session as a handoff.

### QA

- Documentation-only change. No app runtime QA performed.

### Risks / follow-ups

- This process only works if future sessions actually follow `docs/WORKFLOW.md`.
- Existing PR should be updated/merged so the docs become part of `main`.

### Next recommended task

- Verify Firestore security rules and document the result.
