# RBI Architecture

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

Known frontend structure:

```text
index.html
admin.html
js/rbi-auth.js
js/admin.js
css/
```

## Firebase integration

Firebase is initialized client-side through:

```text
/js/firebase-config.js
/js/rbi-auth.js
```

`rbi-auth.js` initializes:

```js
firebase.initializeApp(window.RBI_FIREBASE_CONFIG)
firebase.auth()
firebase.firestore()
```

It also creates a user document if one does not exist.

## Admin console

Admin page:

```text
/admin.html
```

Admin JavaScript:

```text
/js/admin.js
```

Current admin check:

```js
const snap = await RBIAuth.db.collection('users').doc(user.uid).get();
const profile = snap.exists ? snap.data() : {};
if (!profile.isAdmin) {
  showPage('blocked');
  return false;
}
```

The admin page then loads:

```js
RBIAuth.db.collection('users').limit(50).get()
```

and nested athlete records:

```js
RBIAuth.db.collection('users').doc(userDoc.id).collection('athletes').limit(50).get()
```

## Firestore rules requirement

For admin to work, Firestore rules must allow founder/admin users to read the necessary user and athlete documents.

Minimum admin helper pattern:

```js
function isAdmin() {
  return request.auth != null
    && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
}
```

Rules should not be left in a broad public-read/write state.

## Deployment notes

Cloudflare Pages serves the static files. A commit to `main` should trigger deployment if the Cloudflare GitHub integration is active.

After changing Firestore rules, Cloudflare deployment is not enough. Firestore rules must be published in Firebase separately unless a future Firebase deployment workflow is added.

## Current risk areas

1. Firestore rules are not yet committed in the repo.
2. Firebase project configuration may exist only in Firebase/Cloudflare settings.
3. Athlete data is still nested under users.
4. Product decisions have historically lived in conversation instead of the repo.

## Architecture direction

Short-term: keep the static app simple and stable.

Medium-term: move toward a more durable data model before expanding modules.

Long-term: consider a real app framework or backend only when the static/Firebase model becomes limiting. Do not prematurely rebuild unless the product requires it.