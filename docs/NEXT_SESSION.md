# Rogue Baseball IQ — Next Session

Last updated: 2026-07-14

## Current milestone

PitchGuard Trustworthy MVP

## Current branch and PR

- Branch: `feature/pitchguard-boundaries-import-v2`
- PR: #4
- Base: current `main`
- Cloudflare preview: deployment generated successfully
- Merge status: do not merge until authenticated Firebase QA passes

## Immediate next task

Run authenticated manual QA on the PR #4 preview.

## QA checklist

- [ ] Public homepage loads and distinguishes live versus planned modules.
- [ ] Signed-out users are redirected from protected pages.
- [ ] Account sign-in works.
- [ ] Athlete Profiles loads.
- [ ] An athlete can be created and selected.
- [ ] The selected athlete links to `/pitchguard.html?athlete={athleteId}`.
- [ ] PitchGuard preselects the correct athlete.
- [ ] Single-outing save works.
- [ ] Blank import fields do not shift columns.
- [ ] Quoted CSV fields containing commas parse correctly.
- [ ] Pipe- and tab-delimited rows parse correctly.
- [ ] Unmatched pitcher names require manual athlete selection.
- [ ] Imported rows save under the intended athlete.
- [ ] Refresh and logout/login preserve saved data.
- [ ] Mobile layout is usable.
- [ ] Firestore failures display useful errors.

## After QA

If QA passes, merge PR #4 and verify production. If it fails, fix the branch and repeat the affected checks.

## P0 after PR #4

1. Verify and document Firestore security rules.
2. Add edit/delete for PitchGuard outings.
3. Add edit/delete for athlete profiles.
4. Add age-specific rest rules.
5. Show actual available-on dates.
6. Add safety/disclaimer language.
7. Invite one trusted tester only after P0 is complete.
