# REQ-0002 — PitchGuard Batch Import

## Status

Implemented in branch `cleanup/pathway-pitchguard-boundaries`; manual QA required.

## Problem

PitchGuard manual entry is too cumbersome when a coach needs to enter pitching data for multiple players after a game or tournament. Entering one athlete at a time does not match real coaching workflow.

## User story

As a coach, I want to paste multiple pitching rows at once, review athlete matches, and save the matched outings in one batch so I can keep PitchGuard current without retyping every outing manually.

## Scope

Included:

- Add a Batch Import panel to PitchGuard.
- Accept pasted pitching rows in a simple delimited format.
- Parse rows into date, opponent, pitcher, pitch count, innings, and notes.
- Match imported pitcher names to existing Athlete Profiles.
- Allow manual athlete selection/correction before saving.
- Save all valid matched rows to Firestore in one batch.
- Store imported rows under each selected athlete's `pitchguardOutings` collection.
- Mark imported records with `source: batch-import`.

## Supported MVP input format

Best format:

```text
YYYY-MM-DD, Opponent, Pitcher Name, Pitch Count, Innings, Notes
```

Also supported:

```text
YYYY-MM-DD | Opponent | Pitcher Name | Pitch Count | Innings | Notes
YYYY-MM-DD<TAB>Opponent<TAB>Pitcher Name<TAB>Pitch Count<TAB>Innings<TAB>Notes
```

## Out of scope

- Automatic GameChanger login or scraping.
- Screenshot OCR.
- CSV file upload.
- Duplicate detection.
- Edit/delete of imported outings.
- Automatic athlete creation from unmatched names.
- Advanced stat parsing beyond the MVP fields.

## Acceptance criteria

- [x] PitchGuard has a Batch Import panel.
- [x] User can paste multiple rows.
- [x] User can parse rows before saving.
- [x] Import review table shows parsed values.
- [x] Pitcher names are matched to existing athlete profiles when possible.
- [x] User can manually select/correct athlete matches.
- [x] Rows without matched athletes are not saved.
- [x] Valid matched rows save to Firestore in one batch.
- [x] Imported outings are tagged with `source: batch-import`.
- [ ] Manual browser QA completed.

## Data model impact

Existing collection remains:

```text
users/{uid}/athletes/{athleteId}/pitchguardOutings/{outingId}
```

Imported rows add optional fields:

```text
source: "batch-import"
importedPitcherName: string
```

Manual rows now add:

```text
source: "manual"
```

## UI impact

Changed:

- `pitchguard.html`
- `js/pitchguard.js`
- `css/pitchguard.css`

## QA checklist

- [ ] Paste two comma-delimited rows.
- [ ] Paste two pipe-delimited rows.
- [ ] Confirm matching works for exact athlete names.
- [ ] Confirm unmatched names require manual selection.
- [ ] Save matched rows.
- [ ] Confirm imported rows appear under selected athlete when selected.
- [ ] Confirm rows for other athletes save to those athletes.
- [ ] Confirm rows with invalid date are not saved.
- [ ] Confirm mobile review table is usable enough.
