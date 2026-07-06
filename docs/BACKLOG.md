# Rogue Baseball IQ — Backlog

Last updated: 2026-07-06

This backlog is the working list for RBI. Keep it blunt, prioritized, and tied to actual product progress.

## Priority 0 — Do before outside testers

### Verify Firestore security rules

Status: Not confirmed

Requirement:

- Authenticated users can read/write only their own `users/{uid}` document.
- Authenticated users can read/write only their own athlete subcollection.
- Authenticated users can read/write only PitchGuard outings attached to their own athletes.
- No public read/write access to user data.

Acceptance criteria:

- A signed-in user cannot read another user’s data.
- An unsigned user cannot read/write protected data.
- Rules are documented in the repo.

### QA deployed persistence flow

Status: Needed

Manual test:

1. Create test account.
2. Add athlete.
3. Add PitchGuard outing.
4. Refresh browser.
5. Confirm athlete persists.
6. Confirm outing persists.
7. Log out.
8. Log back in.
9. Confirm same data persists.
10. Test on mobile browser.

### Update public roadmap copy

Status: Needed

Problem:

The landing page still presents `PitchGuard Cloud Sync` as next, but current code already saves PitchGuard outings to Firestore.

Update to:

- PitchGuard Cloud MVP — Live
- PitchGuard Edit/Delete — Next
- PitchGuard Age Rules — Next

## Priority 1 — PitchGuard hardening

### Add edit/delete for PitchGuard outings

Status: Needed

Requirement:

Users must be able to correct bad entries.

Acceptance criteria:

- Each outing row has edit action.
- Each outing row has delete action.
- Delete requires confirmation.
- Edit updates Firestore and re-renders current status.
- `updatedAt` is written on edit.

### Add edit/delete for athlete profiles

Status: Needed

Requirement:

Users must be able to correct athlete details and remove bad test records.

Acceptance criteria:

- Selected athlete can be edited.
- Selected athlete can be deleted.
- Delete requires confirmation.
- Deleting athlete handles or warns about attached PitchGuard outings.

### Add age-specific PitchGuard rules

Status: Needed

Requirement:

Current simplified rules must be replaced or expanded with age-aware pitch count/rest thresholds.

Acceptance criteria:

- Athlete age is calculated from birthdate when available.
- If birthdate is missing, user is prompted to add age/birthdate.
- Rest guidance depends on age band.
- UI explains which age band is being used.

### Add available-on date

Status: Needed

Requirement:

Users should see a calendar date, not only “rest X days.”

Acceptance criteria:

- If rest is required, UI shows next available date.
- Available date updates after new outing or edit.
- Date math is based on outing date, not current date alone.

### Add safety/disclaimer language

Status: Needed

Suggested language:

> PitchGuard is a workload decision-support tool. It does not replace medical advice, league rules, tournament rules, or coach/parent judgment.

Acceptance criteria:

- Disclaimer appears on PitchGuard page.
- Disclaimer does not ruin the UI.

## Priority 2 — Product polish

### Improve empty states

Status: Needed

Examples:

- No athletes yet
- No selected athlete
- No outings logged
- Missing birthdate/age
- Firestore load failed

### Add error handling

Status: Needed

Requirement:

Firestore failures should not silently fail.

Acceptance criteria:

- Failed athlete save shows message.
- Failed outing save shows message.
- Failed load shows message.
- Buttons should not allow double-submit during save.

### Add manual QA checklist doc

Status: Needed

Possible file:

- `docs/QA_CHECKLIST.md`

Should cover:

- Account creation
- Login/logout
- Athlete creation
- PitchGuard logging
- Persistence
- Mobile behavior
- Security rules smoke test

## Priority 3 — Pathway MVP

Status: Planned, not next

Possible backlog items:

- Add athlete goals
- Add development notes
- Add milestones
- Add measurements over time
- Add current priorities
- Add parent/coach summary

## Priority 4 — ScoutHub MVP

Status: Future

Possible backlog items:

- Opponent note records
- Pitcher tendency notes
- Hitter tendency notes
- Tournament prep summary
- Game plan export

## Priority 5 — PitchLab MVP

Status: Future

Possible backlog items:

- Mechanical checkpoint form
- Drill mapping table
- Pitch review record under athlete
- Practice plan generator
- Video upload/link placeholder

## Parking lot

Ideas worth keeping but not building yet:

- Stripe subscriptions
- Native app
- Team/org hierarchy
- Public athlete pages
- AI video analysis
- GameChanger ingestion
- PDF report exports
- Coach invite flow
- Parent invite flow
- Multi-athlete team dashboard
