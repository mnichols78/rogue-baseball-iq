# RBI Data Model

## Current MVP model

The current MVP appears to use Firebase Auth plus Firestore user documents.

Known current path:

```text
users/{userId}
```

Known founder/admin fields:

```js
{
  email: "michael-nichols@msn.com",
  isAdmin: true,
  role: "founder",
  accountType: "founder"
}
```

Current athlete path used by the admin page:

```text
users/{userId}/athletes/{athleteId}
```

This nested model is acceptable for a quick MVP, but it is not the desired long-term model.

## Long-term model: Athlete of Record

RBI should use one canonical athlete record that can be connected to multiple user accounts.

Bad model:

```text
Mike account -> Jackson Nichols
Dan account -> Jackson Nichols
Jackson account -> Jackson Nichols
```

That creates duplicate athlete records and breaks long-term product value.

Correct model:

```text
Athlete of Record: Jackson Nichols

Linked accounts:
- Mike -> owner / parent
- Dan -> coach
- Jackson -> athlete
- Organization/team -> future access relationship
```

## Proposed collections

### users

```text
users/{userId}
```

Purpose: account identity and user-level profile.

Expected fields:

```js
{
  email: string,
  displayName: string,
  firstName: string,
  lastName: string,
  accountType: "parent" | "coach" | "athlete" | "founder",
  role: string,
  isAdmin: boolean,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### athletes

```text
athletes/{athleteId}
```

Purpose: canonical Athlete of Record.

Expected fields:

```js
{
  firstName: string,
  lastName: string,
  displayName: string,
  dob: string,
  gradYear: number,
  height: string,
  weight: string,
  bats: string,
  throws: string,
  primaryPositions: string[],
  currentTeam: string,
  createdAt: timestamp,
  updatedAt: timestamp,
  createdBy: userId
}
```

### athleteAccess

```text
athleteAccess/{accessId}
```

Purpose: connect users to athletes with specific permissions.

Suggested access ID pattern:

```text
{userId}_{athleteId}
```

Expected fields:

```js
{
  userId: string,
  athleteId: string,
  accessRole: "owner" | "parent" | "coach" | "athlete" | "viewer",
  status: "active" | "pending" | "revoked",
  invitedBy: userId,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### future module data

Module data should attach to the canonical athlete record by `athleteId`, not to a single user account.

Possible paths:

```text
pitchguardEntries/{entryId}
mechanicsReviews/{reviewId}
scoutingReports/{reportId}
trainingPlans/{planId}
```

Each should include:

```js
{
  athleteId: string,
  createdBy: userId,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## Access model

Rules should generally allow:

- Founder/admin can read admin-level collections.
- A user can read their own user document.
- A user can read athletes where an active athleteAccess record links them.
- Coaches can edit records only where granted.
- Owners/parents can manage access to their athlete.
- Athletes can access their own profile with age-appropriate permissions.

## Migration note

Current nested athlete data under `users/{userId}/athletes/{athleteId}` should eventually be migrated to `athletes/{athleteId}` plus `athleteAccess/{accessId}`.

Do not continue building major module features on top of nested user-owned athlete records unless it is explicitly temporary.