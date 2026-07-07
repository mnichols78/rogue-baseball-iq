# Rogue Baseball IQ — Backlog

Last updated: 2026-07-06

This backlog is the working memory for RBI. Keep it practical. Move items as the product changes.

## Current priority

### PitchGuard trustworthy MVP

The current goal is to make PitchGuard safe enough and useful enough for small-circle testing.

## P0 — Must do before testers

### Security and data ownership

- [ ] Verify Firestore rules prevent users from reading or writing another user's data.
- [ ] Document the active Firestore rules in `/docs/ARCHITECTURE.md` or a future `/docs/FIRESTORE_RULES.md`.
- [ ] Confirm unauthenticated users cannot access protected data.
- [ ] Confirm protected pages redirect correctly when signed out.

### Manual QA

- [ ] Create account.
- [ ] Sign in.
- [ ] Add athlete.
- [ ] Open PitchGuard from selected athlete profile.
- [ ] Confirm selected athlete preloads in PitchGuard.
- [ ] Log PitchGuard outing.
- [ ] Batch import multiple pitching rows.
- [ ] Confirm imported rows save under matched athletes.
- [ ] Refresh browser and confirm data remains.
- [ ] Log out and back in and confirm data remains.
- [ ] Test on mobile browser.
- [ ] Test empty states.

### PitchGuard corrections

- [ ] Add edit outing.
- [ ] Add delete outing.
- [ ] Add edit athlete.
- [ ] Add delete athlete.
- [ ] Add confirmation before destructive delete actions.

### PitchGuard rules

- [ ] Replace simplified rest logic with age-specific pitch count/rest thresholds.
- [ ] Show actual available-on date.
- [ ] Explain why a player is available, limited, caution, or rest recommended.
- [ ] Add safety/disclaimer language: RBI provides guidance and does not replace coaches, doctors, athletic trainers, league rules, or official tournament rules.

### Public copy cleanup

- [x] Update homepage roadmap: PitchGuard Cloud MVP should be marked live, not next.
- [x] Clarify next items: edit/delete, age rules, available-on date, QA/security verification.
- [x] Clarify Athlete Profiles as live foundation and Pathway as planned.
- [x] Remove duplicate athlete creation from PitchGuard.

## P1 — Should do after P0

### Athlete Profiles

- [ ] Add athlete profile edit mode.
- [ ] Add athlete profile delete flow.
- [ ] Improve selected athlete state.
- [ ] Add updatedAt on athlete updates.
- [ ] Add basic validation for grad year, height, weight, and birthdate.
- [x] Replace hard-coded `Products: 0` with clearer profile/source language.
- [x] Add profile-specific PitchGuard link.

### PitchGuard user experience

- [x] Add batch import / review-before-save flow.
- [ ] Improve outing history table on mobile.
- [ ] Add sort/filter by date.
- [ ] Add opponent optional field guidance.
- [ ] Add innings display cleanup.
- [ ] Add tournament/weekend workload summary.
- [ ] Add print/share summary for coaches/parents.

### Error handling

- [ ] Add visible loading states.
- [ ] Add visible save success/error messages.
- [ ] Handle Firestore read/write errors gracefully.
- [ ] Prevent duplicate submits while saving.

## P2 — Pathway MVP

- [ ] Add athlete goals.
- [ ] Add development priorities.
- [ ] Add milestone timeline.
- [ ] Add measurement history.
- [ ] Add coach/parent notes.
- [ ] Attach Pathway records to athlete profile.

## P3 — ScoutHub MVP

- [ ] Manual opponent note entry.
- [ ] Opponent roster notes.
- [ ] Pitcher tendencies.
- [ ] Hitter tendencies.
- [ ] Tournament prep report.
- [ ] Game-plan summary.

## P4 — PitchLab MVP

- [ ] Define mechanical checkpoint taxonomy.
- [ ] Define drill library.
- [ ] Map issues to drills.
- [ ] Create manual review workflow before AI automation.
- [ ] Attach PitchLab reports to athlete profile.
- [ ] Avoid overclaiming video/AI certainty.

## P5 — SwingLab MVP

- [ ] Define swing checkpoint taxonomy.
- [ ] Define hitting drill library.
- [ ] Map observed issues to drill sets.
- [ ] Attach SwingLab reports to athlete profile.

## P6 — RBI OS

- [ ] Team roster model.
- [ ] Coach/admin role model.
- [ ] Team workload dashboard.
- [ ] Team reports.
- [ ] Tournament planning tools.

## Technical debt

- [ ] Consider splitting PitchGuard rules into `js/pitchguard-rules.js`.
- [ ] Consider shared Firestore helpers.
- [ ] Consider shared form helpers.
- [ ] Consider common layout/header component if static pages keep growing.
- [ ] Add README updates pointing to `/docs`.
- [ ] Add manual deploy/test checklist.

## Parking lot / not now

- [ ] Stripe/payments.
- [ ] Native mobile app.
- [ ] AI video upload pipeline.
- [ ] Automated GameChanger ingestion.
- [ ] Public athlete profiles.
- [ ] Recruiting marketplace.
- [ ] Organization billing/admin console.
- [ ] Merch store.

## Done log

Use this section to record completed items when they are moved out of the active backlog.

- [x] Public landing page deployed.
- [x] Firebase account flow exists.
- [x] Athlete profile creation exists.
- [x] PitchGuard outing creation exists.
- [x] PitchGuard cloud persistence exists in Firestore.
- [x] Project status documentation exists.
- [x] Roadmap documentation exists.
- [x] Architecture documentation exists.
- [x] Decision log exists.
- [x] Pathway / PitchGuard product boundaries clarified in code and copy.
- [x] PitchGuard batch import review flow implemented.
