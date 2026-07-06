# Rogue Baseball IQ — Development Workflow

Last updated: 2026-07-06

This document defines how RBI work sessions should run so the project does not depend on memory from any one ChatGPT conversation.

## Core rule

GitHub is the source of truth.

At the start of every RBI work session, read the project memory docs before making code or product decisions.

At the end of every meaningful RBI work session, update the project memory docs before considering the work done.

## Required session start checklist

Before coding, reviewing, or planning a new feature, inspect these files:

1. `docs/PROJECT_STATUS.md`
2. `docs/NEXT_SESSION.md`
3. `docs/BACKLOG.md`
4. `docs/ROADMAP.md`
5. `docs/ARCHITECTURE.md` when the work touches data, auth, Firebase, app structure, or deployment
6. `docs/DECISIONS.md` when the work touches product direction or architectural tradeoffs

## Required session end checklist

Every meaningful work session must end with documentation updates.

Update these almost every time:

- `docs/ENGINEERING_LOG.md`
- `docs/NEXT_SESSION.md`
- `docs/BACKLOG.md`

Update these when relevant:

- `docs/PROJECT_STATUS.md` when something user-visible now works or a major risk changes
- `docs/ROADMAP.md` when priorities or release scope change
- `docs/ARCHITECTURE.md` when data model, auth, Firebase, hosting, page structure, or important code organization changes
- `docs/DECISIONS.md` when a product or technical decision should be remembered
- `docs/requirements/...` when starting or finishing a requirement-backed feature

## Definition of done

A task is not done until all of the following are true:

- Code or content change is complete.
- Acceptance criteria are satisfied or unresolved gaps are explicitly documented.
- Manual QA has been performed where practical.
- User-facing behavior is described accurately.
- Backlog status is updated.
- Engineering log has a session entry.
- Next session file points to the next recommended task.
- Architecture/decision/status docs are updated if the change affects them.
- The change is committed or a PR is opened.

## Preferred feature lifecycle

1. Select one backlog item.
2. Expand it into a requirement if it is more than a tiny fix.
3. Implement the smallest useful version.
4. QA the acceptance criteria.
5. Update documentation.
6. Commit or open a PR.
7. Update `docs/NEXT_SESSION.md`.

## Requirement documents

For non-trivial features, create a requirement file:

```text
docs/requirements/REQ-0001-feature-name.md
```

Suggested format:

```markdown
# REQ-0001 — Feature Name

## Status
Draft | Ready | In Progress | Done | Deferred

## Problem
What problem does this solve?

## User story
As a [user], I want [capability], so that [benefit].

## Scope
What is included?

## Out of scope
What is intentionally excluded?

## Acceptance criteria
- [ ] Criterion 1
- [ ] Criterion 2

## Data model impact
None, or describe changes.

## UI impact
Describe pages/components affected.

## QA checklist
- [ ] Test case 1
- [ ] Test case 2
```

## Engineering log format

Append one entry per meaningful work session:

```markdown
## 2026-07-06 — Short session title

### Completed
- Item

### Changed files
- `path/to/file`

### Decisions
- Decision, or `None`

### QA
- What was tested, or why QA was not run

### Risks / follow-ups
- Item

### Next recommended task
- Item
```

## Branch and PR discipline

Preferred pattern:

- One branch per coherent change.
- One PR per feature, bug fix, or documentation package.
- Keep PR descriptions honest about what changed and what was not tested.
- Avoid mixing unrelated product, code, and cleanup changes in one PR unless the change is documentation-only.

## Anti-drift rules

- Do not start PitchLab/SwingLab/ScoutHub until PitchGuard MVP hardening is done or deliberately reprioritized in `ROADMAP.md` and `DECISIONS.md`.
- Do not treat a feature as complete just because the UI exists; persistence, correction flows, errors, and QA matter.
- Do not rely on chat memory as the system of record.
- Do not make broad AI/mechanics claims without a constrained requirement and credibility guardrails.

## Default next-action rule

When uncertain, the next best task is usually the highest P0 item in `docs/BACKLOG.md`.
