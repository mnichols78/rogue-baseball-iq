# Rogue Baseball IQ — Next Session

Last updated: 2026-07-14

## Current milestone

PitchGuard Trustworthy MVP

## Repository state

- `main` is the production source branch.
- PR #1 is conflicted and should be superseded by the clean project-memory consolidation PR.
- PR #2 is stacked on PR #1 and contains product changes that still require authenticated QA.
- Cloudflare reported a successful preview deployment for PR #2, but deployment success is not functional verification.

## Immediate next task

Stabilize the branch structure, then QA the product branch before merging it.

## Required sequence

1. Merge the clean project-memory consolidation PR.
2. Rebase or recreate the PR #2 product changes from current `main`.
3. Confirm the rebuilt product preview deploys.
4. Sign in with a test account and execute the QA checklist below.
5. Fix failures before merging.
6. After product QA, verify and document Firestore security rules.

## Product QA checklist

- [ ] Public homepage loads and copy accurately distinguishes live versus planned modules.
- [ ] Signed-out users are redirected from protected pages.
- [ ] Account sign-in works.
- [ ] Athlete Profiles loads.
- [ ] An athlete can be created and selected.
- [ ] The selected athlete shows a PitchGuard link.
- [ ] The link opens `/pitchguard.html?athlete={athleteId}`.
- [ ] PitchGuard preselects the correct athlete.
- [ ] Single-outing save works.
- [ ] Comma-, pipe-, and tab-delimited imports parse.
- [ ] Exact athlete matching works.
- [ ] Unmatched names require manual selection.
- [ ] Matched rows save under the correct athlete.
- [ ] Refresh and logout/login preserve data.
- [ ] Empty states and mobile layout are usable.
- [ ] Failures display useful errors instead of silently failing.

## P0 after branch stabilization

1. Verify Firestore security rules.
2. Add edit/delete for PitchGuard outings.
3. Add edit/delete for athlete profiles.
4. Add age-specific PitchGuard rules.
5. Show the actual available-on date.
6. Add safety/disclaimer language.
7. Add a durable QA checklist.
8. Invite one trusted tester only after P0 is complete.
