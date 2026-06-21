const RBIAuth = (() => {
  const app = firebase.initializeApp(window.RBI_FIREBASE_CONFIG);
  const auth = firebase.auth();
  const db = firebase.firestore();

  function displayName(user) {
    if (!user) return '';
    if (user.displayName) return user.displayName;
    if (user.email) return user.email.split('@')[0];
    return 'Account';
  }

  function accountUrl(nextPath) {
    const next = nextPath || `${window.location.pathname}${window.location.search}`;
    return `/account.html?next=${encodeURIComponent(next)}`;
  }

  function wireAuthUi() {
    const nodes = document.querySelectorAll('[data-auth-status]');
    auth.onAuthStateChanged(async (user) => {
      nodes.forEach((node) => {
        if (user) {
          node.innerHTML = `<span class="auth-name">${displayName(user)}</span> <button class="auth-link" data-logout>Logout</button>`;
        } else {
          node.innerHTML = `<a class="auth-link" href="${accountUrl()}">Sign In</a>`;
        }
      });
      document.querySelectorAll('[data-logout]').forEach((button) => {
        button.addEventListener('click', () => auth.signOut());
      });

      if (user) {
        const ref = db.collection('users').doc(user.uid);
        const snap = await ref.get();
        if (!snap.exists) {
          await ref.set({
            email: user.email || '',
            displayName: user.displayName || '',
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            role: 'coach'
          });
        }
      }
    });
  }

  function requireAuth() {
    document.documentElement.classList.add('auth-checking');
    auth.onAuthStateChanged((user) => {
      if (!user) {
        window.location.replace(accountUrl());
        return;
      }
      document.documentElement.classList.remove('auth-checking');
      document.documentElement.classList.add('auth-ready');
    });
  }

  return { app, auth, db, wireAuthUi, requireAuth, displayName, accountUrl };
})();

document.addEventListener('DOMContentLoaded', () => {
  RBIAuth.wireAuthUi();
});
