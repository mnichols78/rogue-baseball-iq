# Rogue Baseball IQ — Roadmap

Last updated: 2026-07-06

## Build philosophy

Build narrow and useful before expanding.

RBI should not become a six-module shell with shallow features. The first priority is a durable account and athlete foundation, followed by one trustworthy product module.

Current best module to harden first: **PitchGuard**.

Do not jump to PitchLab, SwingLab, ScoutHub, or monetization until PitchGuard is credible enough for small-circle testing.

## Phase 0 — Project memory and stability

Status: In progress / mostly complete

Goals:

- Document product canon
- Document current architecture
- Document data model
- Document decisions
- Keep GitHub as source of truth
- Avoid relying on conversation memory

Acceptance criteria:

- `/docs/PROJECT_STATUS.md` exists
- `/docs/ROADMAP.md` exists
- `/docs/ARCHITECTURE.md` exists
- `/docs/DECISIONS.md` exists
- `/docs/BACKLOG.md` exists

## Phase 1 — Foundation MVP

Status: Mostly complete

Completed or live:

- Public landing page
- Product positioning
- PWA direction
- Firebase project
- Firebase Auth
- Firestore connection
- Account page
- Protected page pattern
- Athlete profile MVP
- PitchGuard MVP

Remaining cleanup:

- Verify Firestore security rules
- Confirm PWA manifest/service worker behavior
- Clean outdated roadmap copy on public site
- Add basic manual QA checklist

## Phase 2 — PitchGuard MVP hardening

Status: Current priority

Goal: Turn PitchGuard from a working prototype into a trustworthy small-circle test product.

### Required

- Edit athlete profile
- Delete athlete profile
- Edit PitchGuard outing
- Delete PitchGuard outing
- Age-specific pitch count/rest rules
- Next available date display
- Clear explanation text for each recommendation
- Better empty states
- Basic error handling for failed Firestore reads/writes
- Small safety/disclaimer language

### Acceptance criteria

- User can create account, add athlete, log outing, refresh, and still see data.
- User can log out, sign back in, and still see the same athlete and outing data.
- User can correct mistaken athlete or outing entries.
- User sees age-aware guidance.
- User sees both the recommendation and the reason.
- User understands RBI is decision support, not medical advice or an official governing body ruling.
- Firestore rules prevent users from accessing each other’s data.

## Phase 3 — Pathway Timeline MVP

Status: Planned

Goal: Make the athlete profile feel like a persistent development record, not just a form.

Possible features:

- Goals
- Milestones
- Measurements over time
- Position priorities
- Development notes
- Throwing/hitting/pitching focus areas
- Simple coach/parent summary

Pathway should answer: what are we working on, why, and what changed?

## Phase 4 — ScoutHub MVP

Status: Planned after PitchGuard and Pathway

Goal: Tournament/opponent prep tool based on practical coach workflows.

Possible features:

- Opponent notes
- Pitcher tendencies
- Hitter tendencies
- Defensive notes
- Game plan summary
- Tournament weekend prep sheet

ScoutHub should start manual-first. GameChanger/image/stat extraction can come later.

## Phase 5 — PitchLab MVP

Status: Future

Goal: Pitching mechanics review and drill recommendation workflow.

Important constraint: PitchLab should be drill mapping and coach support, not fake biomechanics certainty.

Possible features:

- Upload or link short pitching video
- Select observed mechanical issue
- Map issue to drill set
- Store review under athlete profile
- Generate parent/coach-friendly practice plan

PitchLab should come after PitchGuard because workload tracking is easier to validate and safer to test.

## Phase 6 — SwingLab MVP

Status: Future

Goal: Hitting mechanics review and drill recommendation workflow.

Likely follows the same model as PitchLab:

- Observed issue
- Drill mapping
- Practice plan
- Athlete-linked record

## Phase 7 — RBI OS v1

Status: Future

Goal: Team/organization operating layer.

Possible features:

- Team roster
- Player development dashboard
- Team workload view
- Tournament planning
- Lineup notes
- Coach handoff notes
- Parent/player reports

## Not now

Avoid these until the core MVP earns them:

- Paid subscriptions
- Complex analytics dashboards
- Native mobile apps
- AI video analysis promises
- Multi-organization hierarchy
- Recruiting platform features
- Public athlete profiles
- Automated GameChanger ingestion

## Current next 10 tasks

1. Verify Firestore security rules.
2. QA deployed account → athlete → PitchGuard persistence.
3. Update homepage roadmap copy.
4. Add edit/delete for PitchGuard outings.
5. Add edit/delete for athlete profiles.
6. Add age-specific PitchGuard rules.
7. Add available-on date.
8. Add safety/disclaimer language.
9. Add a manual QA checklist.
10. Invite one trusted tester only after the above is complete.
