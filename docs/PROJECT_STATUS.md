# Rogue Baseball IQ — Project Status

Last updated: 2026-07-06

## Current phase

Rogue Baseball IQ (RBI) is past concept stage and is now a live MVP deployed to Cloudflare Pages.

The current build is a static front-end application using Firebase Authentication and Firestore for account and user-owned data persistence.

## Live deployment

- Production URL: https://rogue-baseball-iq.pages.dev/
- Repository: `mnichols78/rogue-baseball-iq`
- Default branch: `main`
- Current public positioning: athlete-centered baseball operating system for player development, workload tracking, scouting, mechanics, pathways, and team execution.

## What works now

### Public site

- Public landing page is deployed.
- Navigation exists for Home, Products, Athletes, Workspace, Account, and PitchGuard.
- Product suite is framed around six RBI modules:
  - PitchGuard
  - Pathway
  - PitchLab
  - SwingLab
  - ScoutHub
  - RBI OS

### PWA foundation

- `manifest.json` is linked from the main site.
- `sw.js` service worker registration exists on the landing page.
- Mobile/PWA direction is intentional: use web/PWA first instead of native app stores.

### RBI Accounts

- Firebase Auth is wired into the account flow.
- Users can create accounts and sign in with email/password.
- User profile records are written to Firestore under `users/{uid}`.
- Account type supports parent, coach, athlete, and organization.

### Athlete Profiles

- Auth-protected athlete profile page exists.
- Users can create athlete records.
- Athlete records are stored under `users/{uid}/athletes/{athleteId}`.
- Athlete fields include name, birthdate, grad year, team, positions, bats/throws, height, and weight.
- Athlete cards and selected profile details render from Firestore.

### PitchGuard

- Auth-protected PitchGuard page exists.
- PitchGuard reads athlete profiles from Firestore.
- Users can select an athlete and log pitching outings.
- Pitching outings are stored under `users/{uid}/athletes/{athleteId}/pitchguardOutings/{outingId}`.
- Current PitchGuard calculations include:
  - Last outing pitch count
  - 7-day pitch total
  - 30-day pitch total
  - Simple rest recommendation based on last outing count
  - Basic workload warning labels

## Important correction

The public roadmap currently says `PitchGuard Cloud Sync — Next`, but the code already writes PitchGuard outings to Firestore. The roadmap should be updated.

Better current status:

- PitchGuard Cloud MVP: Live
- PitchGuard Edit/Delete: Next
- PitchGuard Age-Specific Rules: Next
- PitchGuard Availability Date: Next

## Current risks / gaps

1. Firestore security rules must be verified before broader testing.
2. PitchGuard rest logic is currently simplified and not yet age-band accurate.
3. Users cannot edit or delete mistaken athlete records or outings.
4. There is no onboarding flow after account creation.
5. There is no admin/test data reset utility.
6. No formal test checklist exists yet.
7. Product roadmap on the live page is slightly behind the code.

## Next build priority

Do not jump to PitchLab yet.

The next priority is to make PitchGuard credible, boring, and trustworthy:

1. Verify Firestore rules.
2. QA the account → athlete → outing → refresh → logout/login persistence path.
3. Add edit/delete for athletes and PitchGuard outings.
4. Replace simplified rest logic with age-specific Pitch Smart-style rules.
5. Show the actual next available date.
6. Update public roadmap copy.

## Near-term definition of done

PitchGuard MVP is ready for small-circle testing when:

- A parent/coach can create an account.
- A parent/coach can add one or more athletes.
- A parent/coach can log outings for each athlete.
- Data survives refresh and login/logout.
- Mistakes can be edited or deleted.
- Availability guidance is age-aware.
- The system clearly says it is guidance, not medical advice.
- Firestore rules prevent users from accessing each other’s data.
