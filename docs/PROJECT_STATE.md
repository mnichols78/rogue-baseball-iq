# RBI Project State

Last updated: 2026-06-21

## Product

Rogue Baseball Intelligence (RBI) is a youth baseball decision-support platform built around a permanent athlete profile. The platform is intended to help parents, coaches, athletes, and organizations protect players, develop skills, prepare for games, and operate teams.

## Current build status

RBI is in early MVP/prototype stage. The live app is deployed through Cloudflare Pages from GitHub.

Current public deployment:

- Cloudflare Pages app: `rogue-baseball-iq.pages.dev`
- Repository: `mnichols78/rogue-baseball-iq`
- Default branch: `main`

## Module status

| Module | Purpose | Status |
|---|---|---|
| PitchGuard | Pitch count, workload, rest guidance, pitcher availability | MVP started/live locally in app |
| Pathway | Athlete profile and long-term development record | MVP started/live |
| PitchLab | Pitching mechanics analysis and drill mapping | Planned |
| SwingLab | Hitting mechanics analysis and drill mapping | Planned |
| ScoutHub | Opponent scouting, matchups, tournament prep | Planned |
| RBI OS | Team/organization operating system | Planned |

## Current technical stack

- Static HTML/CSS/JavaScript
- Firebase Auth
- Firestore
- GitHub repository
- Cloudflare Pages hosting

This is not currently a Next.js/React app. It is a static site with Firebase client-side integration.

## Current known pages

- `/index.html` public website
- `/account.html` account/sign-in
- `/dashboard.html` workspace
- `/athletes.html` athlete profile area
- `/pitchguard.html` PitchGuard
- `/admin.html` founder/admin console

## Founder/admin account

Founder/admin test account:

- Email: `michael-nichols@msn.com`
- Firestore user fields expected:
  - `isAdmin: true`
  - `role: "founder"`
  - `accountType: "founder"`

## Current important issue resolved

The admin page originally showed `Missing or insufficient permissions`. The root cause was Firestore rules: the founder user document allowed the admin identity to be known, but the admin page could not list broader user/athlete records. Updating Firestore rules to allow admin reads fixed the admin console.

## Current technical debt

The current athlete storage appears to be nested under users:

```text
users/{userId}/athletes/{athleteId}
```

That works for an MVP, but it does not match the long-term Athlete of Record model. The future model should move toward canonical athlete records plus access relationships:

```text
athletes/{athleteId}
athleteAccess/{accessId}
```

## Next recommended build step

Before building more features, refactor or plan the athlete model so RBI does not create duplicate athlete records per user. The next meaningful product step is the Athlete of Record access model.