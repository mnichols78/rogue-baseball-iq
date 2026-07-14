# REQ-0001 — Pathway / PitchGuard Product Boundaries

## Status

Done in branch `cleanup/pathway-pitchguard-boundaries`.

## Problem

RBI had confusing product boundaries between Athlete Profiles, Pathway, and PitchGuard:

- Dashboard labeled one card `Athletes / Pathway`, implying Pathway was live when only Athlete Profiles existed.
- PitchGuard had its own lightweight athlete creation form, which could create partial athlete records that differed from full Athlete Profiles.
- Athlete profile product cards looked connected but did not actually link to PitchGuard.
- Public and workspace roadmap copy still described PitchGuard cloud sync as future work even though PitchGuard already persists outings in Firestore.

## User story

As a coach or parent, I want RBI to clearly distinguish athlete profiles, PitchGuard, and planned modules so I understand where to create athletes, where to log outings, and what is not built yet.

## Scope

Included:

- Treat Athlete Profiles as the live foundation module.
- Treat PitchGuard as the first live product module attached to athlete profiles.
- Treat Pathway as planned/future, not partially live.
- Remove PitchGuard's duplicate athlete creation form.
- Make PitchGuard use existing athlete profiles only.
- Add a profile-specific link from Athlete Profiles to PitchGuard.
- Let PitchGuard accept an `athlete` query parameter and preselect that athlete when present.
- Update public/workspace roadmap copy to mark PitchGuard cloud log as live MVP.

## Out of scope

- Athlete edit/delete.
- PitchGuard outing edit/delete.
- Age-specific Pitch Smart rules.
- Firestore security rule verification.
- New Pathway timeline functionality.

## Acceptance criteria

- [x] Workspace no longer labels the live foundation as `Athletes / Pathway`.
- [x] Workspace presents Athlete Profiles as foundation and Pathway as planned.
- [x] PitchGuard no longer contains a duplicate Add Athlete form.
- [x] PitchGuard empty state directs the user to Athlete Profiles.
- [x] Athlete Profiles includes a real PitchGuard link for the selected athlete.
- [x] PitchGuard reads the `?athlete=` query parameter and selects that athlete when it belongs to the user.
- [x] Public roadmap no longer says PitchGuard cloud sync is next.
- [x] Workspace roadmap no longer says PitchGuard cloud sync is next.

## Data model impact

No Firestore schema changes.

This cleanup reduces future data inconsistency by making `users/{uid}/athletes/{athleteId}` the only athlete creation path.

## UI impact

Changed pages:

- `index.html`
- `dashboard.html`
- `pitchguard.html`
- `athletes.html` via `js/athletes.js`

Changed styles:

- `css/athletes.css`
- `css/pitchguard.css`

## QA checklist

Manual QA still required in preview deployment:

- [ ] Sign in.
- [ ] Create athlete from Athlete Profiles.
- [ ] Confirm selected profile shows PitchGuard link.
- [ ] Click PitchGuard link and confirm athlete is preselected.
- [ ] Confirm PitchGuard no longer shows duplicate Add Athlete form.
- [ ] Confirm PitchGuard shows useful empty state when no athletes exist.
- [ ] Confirm outing save still works for selected athlete.
- [ ] Confirm public and workspace roadmap copy is no longer stale.
