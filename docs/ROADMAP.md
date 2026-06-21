# RBI Roadmap

## Build philosophy

Build narrow and useful before expanding. RBI should not become a six-module shell with shallow features. The first priority is a durable account and athlete foundation.

## Phase 0 — Project memory and stability

Status: In progress

Goals:

- Document product canon
- Document current architecture
- Document data model
- Document decisions
- Keep GitHub as source of truth
- Avoid relying on conversation memory

Acceptance criteria:

- `/docs` contains the current product and technical canon
- Future sessions can begin by reading the docs and inspecting code

## Phase 1 — Account and Athlete Foundation

Status: Started

Goals:

- Firebase Auth sign-in
- Firestore user profiles
- Founder/admin account
- Athlete profile MVP
- Admin console can view users and athletes

Current gap:

- Athlete data currently appears nested under users
- Need to move toward Athlete of Record model

Acceptance criteria:

- Users can create accounts
- Founder/admin can view user records
- Athletes can be created and viewed
- Athlete records do not depend permanently on one user-owned nested path

## Phase 2 — Athlete of Record refactor

Status: Recommended next

Goals:

- Create canonical `athletes/{athleteId}` records
- Create `athleteAccess/{accessId}` relationship records
- Let parents, coaches, and athletes connect to the same athlete record
- Prevent accidental duplicate athlete creation

Acceptance criteria:

- A user can create an athlete
- The athlete is saved as a canonical athlete record
- The creating user receives owner access
- Admin can view canonical athletes and access relationships
- Future modules can attach data by `athleteId`

## Phase 3 — PitchGuard MVP hardening

Status: Started but needs review

Goals:

- Pitch count logging
- Rest guidance
- Availability status
- Pitching history by athlete
- Tournament workload planning

Acceptance criteria:

- PitchGuard entries attach to canonical athlete IDs
- A parent/coach can view workload history for athletes they can access
- Rest guidance is understandable and conservative

## Phase 4 — Pathway MVP hardening

Status: Started but needs review

Goals:

- Athlete profile summary
- Development priorities
- Goals/milestones
- Growth and physical profile tracking
- Long-term timeline

Acceptance criteria:

- Pathway uses the canonical Athlete of Record
- Notes and development fields persist
- Coaches/parents can see the same athlete history when authorized

## Phase 5 — PitchLab planning/build

Status: Planned

Goals:

- Pitching mechanics analysis workflow
- Upload or describe pitch video
- Mechanical checkpoints
- Drill recommendations
- Connect findings to athlete profile

Acceptance criteria:

- PitchLab output attaches to athlete ID
- Drill recommendations are constrained to approved RBI/Driveline-inspired drill mappings
- Avoid unsupported medical claims

## Phase 6 — SwingLab planning/build

Status: Planned

Goals:

- Hitting mechanics analysis workflow
- Swing checkpoints
- Drill recommendations
- Connect findings to athlete profile

## Phase 7 — ScoutHub planning/build

Status: Planned

Goals:

- Opponent scouting
- Roster notes
- Tendencies
- Game plans
- Tournament prep

## Phase 8 — RBI OS planning/build

Status: Planned

Goals:

- Team dashboard
- Roster management
- Lineup/planning tools
- Staff access
- Reports

## Near-term priority

Do not build major new modules until the Athlete of Record model is decided and implemented or explicitly deferred. The risk of building on the wrong data model is higher than the value of adding more screens right now.