# Rogue Baseball IQ — Development Workflow

Last updated: 2026-07-14

## Core rule

GitHub is the source of truth. Chat history is supporting context, not the system of record.

## Session start

Before changing RBI:

1. Read `docs/PROJECT_STATE.md`.
2. Read `docs/NEXT_SESSION.md`.
3. Read `docs/BACKLOG.md`.
4. Read `docs/ROADMAP.md`, `docs/ARCHITECTURE.md`, and `docs/DECISIONS.md` when relevant.
5. Inspect open PRs and their actual base/head branches.
6. Confirm whether the target behavior is on `main`, a preview branch, or only proposed.

## Definition of done

A task is done only when:

- The implementation or documentation is complete.
- Acceptance criteria are verified or unverified items are explicitly recorded.
- Relevant automated checks have passed.
- Manual QA is performed where practical.
- `docs/BACKLOG.md`, `docs/ENGINEERING_LOG.md`, and `docs/NEXT_SESSION.md` are updated.
- The change is committed and available in a focused PR.
- Production behavior is not claimed until the change is merged and the production deployment is verified.

## Branch and PR discipline

- One coherent change per branch and PR.
- New feature branches should normally start from current `main`.
- Avoid stacked PRs unless the dependency is deliberate and documented.
- Do not force-merge conflicts.
- Keep PR descriptions honest about runtime QA, authentication testing, Firebase testing, and deployment status.

## Anti-drift rules

- Finish PitchGuard trustworthy-MVP work before starting PitchLab, SwingLab, ScoutHub, or RBI OS unless priorities are deliberately changed.
- Do not treat a visible UI as a completed feature; persistence, correction flows, permissions, errors, and QA matter.
- Do not claim verified Firestore security until the deployed rules are inspected and tested.
- Do not claim preview behavior is live production behavior.
- Do not make broad AI or mechanics claims without evidence and credibility guardrails.
