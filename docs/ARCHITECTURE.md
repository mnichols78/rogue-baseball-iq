# Rogue Baseball IQ — Architecture

Last updated: 2026-07-06

## Current architecture

RBI is currently a static web app deployed through Cloudflare Pages.

Current stack:

- GitHub repository: `mnichols78/rogue-baseball-iq`
- Hosting: Cloudflare Pages
- Frontend: static HTML, CSS, and JavaScript
- Authentication: Firebase Auth
- Database: Firestore
- Deployment branch: `main`

## Current implementation style

This project is not currently a framework app. It is not Next.js, React, Vue, or a full backend app at this stage.

That is acceptable for the MVP. Static HTML/CSS/JS plus Firebase is enough to validate the product direction before adding framework complexity.

## Known frontend structure

Important pages:

- `index.html` — public landing page and product positioning
- `account.html` — sign in / create account
- `dashboard.html` — RBI Workspace shell
- `athletes.html` — athlete profile management
- `pitchguard.html` — pitching workload tool

Important JavaScript:

- `js/firebase-config.js` — Firebase project configuration
- `js/rbi-auth.js` — shared Firebase app/auth/db setup and auth UI behavior
- `js/athletes.js` — athlete profile creation and rendering
- `js/pitchguard.js` — athlete selection, outing logging, and workload calculations

Important CSS:

- `css/home.css`
- `css/athletes.css`
- `css/pitchguard.css`

## Firebase

### Firebase Auth

Current sign-in method:

- Email/password

Account creation writes basic profile data to Firestore.

### Firestore data model

Current user-owned data model:

```text
users/{uid}
  email
  firstName
  lastName
  displayName
  accountType
  role
  onboardingComplete
  createdAt
  updatedAt

users/{uid}/athletes/{athleteId}
  name
  birthdate
  gradYear
  team
  primaryPosition
  secondaryPosition
  bats
  throws
  height
  weight
  createdAt
  updatedAt

users/{uid}/athletes/{athleteId}/pitchguardOutings/{outingId}
  date
  opp
  count
  inn
  notes
  createdAt
```

## Auth pattern

Protected pages use `RBIAuth.requireAuth()`.

If no user is signed in, the page redirects to:

```text
/account.html?next={currentPath}
```

Shared auth UI uses `[data-auth-status]` nodes to show either:

- Sign In link
- Signed-in user display name plus Logout button

## Product model

RBI is intentionally athlete-centered.

The athlete profile is the permanent record. Product modules attach records back to the athlete.

Current product linkage:

```text
RBI Account
  -> Athlete Profile
    -> PitchGuard outings
    -> Future Pathway records
    -> Future PitchLab records
    -> Future SwingLab records
    -> Future ScoutHub notes
```

## Current PitchGuard logic

Current simplified rest function:

```text
0-20 pitches: 0 rest days
21-35 pitches: 1 rest day
36-50 pitches: 2 rest days
51-65 pitches: 3 rest days
66+ pitches: 4 rest days
```

Current workload warnings:

- 7-day total >= 90: Light Usage / moderate workload
- 7-day total >= 130: Caution / high workload
- 30-day total >= 450: Monitor / elevated workload

This logic is useful for MVP testing but must be replaced or expanded with age-specific rules before broader user testing.

## Security requirements

Before external testing, verify Firestore rules enforce user ownership.

Minimum expected rule shape:

```text
users/{userId}: only authenticated user where request.auth.uid == userId
users/{userId}/athletes/{athleteId}: same owner rule
users/{userId}/athletes/{athleteId}/pitchguardOutings/{outingId}: same owner rule
```

Do not invite outside testers until this is confirmed.

## Why no backend yet

A custom backend is not needed yet because:

- Auth is handled by Firebase.
- User-owned data is simple.
- There are no paid subscriptions yet.
- There are no trusted server-side calculations yet.
- There is no external API ingestion yet.

A backend may be needed later for:

- Stripe billing
- AI/video processing
- GameChanger-style ingestion
- Organization/team permissions
- Role-based access control
- Admin reporting

## Near-term architecture improvements

1. Add Firestore rules documentation.
2. Add a `docs/DATA_MODEL.md` later if the data model grows.
3. Consider extracting PitchGuard rules into a separate JS module.
4. Add edit/delete operations with predictable Firestore updates.
5. Add `updatedAt` to PitchGuard outings.
6. Add basic client-side validation and error states.
