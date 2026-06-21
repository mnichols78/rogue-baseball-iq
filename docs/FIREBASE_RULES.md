# RBI Firebase / Firestore Rules Notes

## Purpose

This file records the Firestore rules logic RBI needs. Firestore rules may currently be managed directly in Firebase and may not be automatically deployed from GitHub.

## Important warning

Changing code in GitHub does not automatically change Firestore rules unless a Firebase deployment workflow is added later.

When Firestore permissions fail, check Firebase Console -> Firestore Database -> Rules.

## Founder/admin requirement

The founder/admin user must have a Firestore user document at:

```text
users/{uid}
```

With:

```js
{
  isAdmin: true,
  role: "founder",
  accountType: "founder"
}
```

## Admin console behavior

`/admin.html` first reads the signed-in user's own profile:

```js
users/{request.auth.uid}
```

Then it reads:

```js
users
users/{userId}/athletes
```

So admin rules must allow a signed-in admin to read these broader records.

## MVP rules pattern

This is the minimum shape that allowed the current admin page to work:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function signedIn() {
      return request.auth != null;
    }

    function isAdmin() {
      return signedIn()
        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }

    match /users/{userId} {
      allow read, write: if signedIn() && request.auth.uid == userId;
      allow read: if isAdmin();

      match /athletes/{athleteId} {
        allow read, write: if signedIn() && request.auth.uid == userId;
        allow read: if isAdmin();
      }
    }
  }
}
```

## Future rules direction

When RBI moves to Athlete of Record, rules need to support:

```text
athletes/{athleteId}
athleteAccess/{accessId}
```

Future rules should allow:

- Admin read access
- User read/write to their own user profile
- Athlete owners to manage their athletes
- Coaches to read/write only where granted
- Athletes to access their own profile where granted
- No public writes

## Known resolved issue

Symptom:

```text
Admin console error
Missing or insufficient permissions.
```

Cause:

The signed-in founder could read their own user document but could not list all users / nested athletes.

Fix:

Publish Firestore rules that allow `isAdmin()` users to read the required records.