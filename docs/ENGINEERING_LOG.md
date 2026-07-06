# Rogue Baseball IQ — Engineering Log

This file records meaningful RBI work sessions so the project can resume cleanly even when chat context is unavailable.

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
