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

## Immediate next task

Manual QA the cleanup branch, including PitchGuard batch import.

## Branch to test

`cleanup/pathway-pitchguard-boundaries`

## Why this is next

The branch now changes live navigation, product labels, athlete profile links, PitchGuard athlete selection, and PitchGuard batch import. The code has been updated, but the browser flow still needs manual verification before merge.

## QA checklist

- [ ] Cloudflare preview deploys successfully.
- [ ] Public homepage loads.
- [ ] Workspace dashboard loads after sign-in.
- [ ] Workspace clearly shows Athlete Profiles as foundation.
- [ ] Workspace clearly shows Pathway as planned.
- [ ] Athlete Profiles page loads.
- [ ] Create or select an athlete profile.
- [ ] Selected profile shows a PitchGuard link.
- [ ] PitchGuard link opens `/pitchguard.html?athlete={athleteId}`.
- [ ] PitchGuard preselects the correct athlete.
- [ ] PitchGuard no longer shows its own Add Athlete form.
- [ ] Save single outing still writes under the selected athlete.
- [ ] Paste comma-delimited import rows and parse.
- [ ] Paste pipe-delimited import rows and parse.
- [ ] Confirm exact athlete name matching works.
- [ ] Confirm unmatched pitcher names require manual athlete selection.
- [ ] Save matched import rows.
- [ ] Confirm imported rows appear under matched athletes.
- [ ] Refresh keeps selected athlete and outing history.
- [ ] Mobile layout is acceptable.

## After QA

If QA passes:

1. Merge PR #1 first if still open, because the cleanup branch was based on project-memory docs.
2. Merge the cleanup PR after PR #1.
3. Start Firestore security rules verification.

If QA fails:

1. Fix the failing branch behavior.
2. Update `REQ-0001` or `REQ-0002` QA status.
3. Update this file again.

## Current P0 sequence

1. QA Pathway / PitchGuard cleanup and batch import branch.
2. Verify Firestore security rules.
3. Add edit/delete for PitchGuard outings.
4. Add edit/delete for athlete profiles.
5. Add age-specific PitchGuard rules.
6. Add available-on date.
7. Add safety/disclaimer language.
8. Add manual QA checklist.
9. Invite one trusted tester only after P0 is complete.

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
