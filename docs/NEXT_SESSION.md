# Rogue Baseball IQ — Next Session

Last updated: 2026-07-06

## Current milestone

PitchGuard MVP Hardening

## Session start instruction

Before starting the next RBI work session, read these files in order:

1. `docs/PROJECT_STATUS.md`
2. `docs/NEXT_SESSION.md`
3. `docs/BACKLOG.md`
4. `docs/WORKFLOW.md`
5. `docs/ROADMAP.md`
6. `docs/ARCHITECTURE.md`
7. `docs/DECISIONS.md` if product or architecture direction is involved

## Next recommended task

Verify Firestore security rules and document the result.

## Why this is next

PitchGuard now stores user-owned athlete and outing data in Firestore. Before inviting outside testers, RBI must confirm that users can only access their own `users/{uid}` tree.

## Expected work

1. Inspect current Firebase/Firestore rules if accessible.
2. Confirm intended rule shape:

```text
users/{userId}: authenticated user can only access own document where request.auth.uid == userId
users/{userId}/athletes/{athleteId}: same owner rule
users/{userId}/athletes/{athleteId}/pitchguardOutings/{outingId}: same owner rule
```

3. If rules are not available in the repo, add a proposed rules document or `firestore.rules` file.
4. Update `docs/ARCHITECTURE.md` with the verified or proposed rules.
5. Update `docs/BACKLOG.md` P0 security status.
6. Add an `ENGINEERING_LOG.md` entry.
7. Rewrite this file with the next task.

## Likely files to inspect or modify

- `docs/ARCHITECTURE.md`
- `docs/BACKLOG.md`
- `docs/ENGINEERING_LOG.md`
- `docs/NEXT_SESSION.md`
- possible new file: `firestore.rules`
- possible new file: `docs/FIRESTORE_RULES.md`

## Current P0 sequence

1. Verify Firestore security rules.
2. QA deployed account → athlete → PitchGuard persistence.
3. Update homepage roadmap copy.
4. Add edit/delete for PitchGuard outings.
5. Add edit/delete for athlete profiles.
6. Add age-specific PitchGuard rules.
7. Add available-on date.
8. Add safety/disclaimer language.
9. Add manual QA checklist.
10. Invite one trusted tester only after P0 is complete.

## Session end requirement

Before ending the next work session, update:

- `docs/ENGINEERING_LOG.md`
- `docs/NEXT_SESSION.md`
- `docs/BACKLOG.md`

Also update these if relevant:

- `docs/PROJECT_STATUS.md`
- `docs/ROADMAP.md`
- `docs/ARCHITECTURE.md`
- `docs/DECISIONS.md`
