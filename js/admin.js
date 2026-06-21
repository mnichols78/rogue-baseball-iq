const el = id => document.getElementById(id);
const esc = v => String(v || '').replace(/[&<>]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[m]));

function showPage(id) {
  document.documentElement.classList.remove('auth-checking');
  el(id).classList.remove('hidden');
}

function showError(message) {
  document.documentElement.classList.remove('auth-checking');
  el('blocked').classList.remove('hidden');
  el('blocked').innerHTML = `<h1>Admin console error</h1><p class="small">${esc(message)}</p><p><a class="auth-link" href="/dashboard.html">Back to Workspace</a></p>`;
}

async function checkAdmin(user) {
  const snap = await RBIAuth.db.collection('users').doc(user.uid).get();
  const profile = snap.exists ? snap.data() : {};
  if (!profile.isAdmin) {
    showPage('blocked');
    return false;
  }
  el('adminApp').style.display = 'block';
  document.documentElement.classList.remove('auth-checking');
  return true;
}

async function loadUsers() {
  const box = el('usersList');
  const snap = await RBIAuth.db.collection('users').limit(50).get();
  if (snap.empty) {
    box.innerHTML = '<p class="small">No users found.</p>';
    return;
  }
  box.innerHTML = snap.docs.map(doc => {
    const u = doc.data();
    return `<div class="item"><b>${esc(u.displayName || `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.email || 'Unnamed user')}</b><div class="small">${esc(u.email)}</div><div class="small">ID: ${esc(doc.id)}</div><span class="pill">${esc(u.accountType || u.role || 'unknown')}</span>${u.isAdmin ? '<span class="pill">admin</span>' : ''}</div>`;
  }).join('');
}

async function loadAthletes() {
  const box = el('athletesList');
  const usersSnap = await RBIAuth.db.collection('users').limit(50).get();
  const items = [];
  for (const userDoc of usersSnap.docs) {
    const user = userDoc.data();
    const athletesSnap = await RBIAuth.db.collection('users').doc(userDoc.id).collection('athletes').limit(50).get();
    athletesSnap.forEach(doc => {
      const a = doc.data();
      items.push({ id: doc.id, ownerId: userDoc.id, ownerEmail: user.email || '', ...a });
    });
  }
  if (!items.length) {
    box.innerHTML = '<p class="small">No athletes found.</p>';
    return;
  }
  box.innerHTML = items.map(a => `<div class="item"><b>${esc(a.name || 'Unnamed athlete')}</b><div class="small">Team: ${esc(a.team || '—')} · Class: ${esc(a.gradYear || '—')}</div><div class="small">Athlete ID: ${esc(a.id)}</div><div class="small">Owner: ${esc(a.ownerEmail || a.ownerId)}</div></div>`).join('');
}

RBIAuth.auth.onAuthStateChanged(async user => {
  try {
    if (!user) return;
    const ok = await checkAdmin(user);
    if (!ok) return;
    await Promise.all([loadUsers(), loadAthletes()]);
  } catch (e) {
    showError(e.message || 'Unknown admin console error.');
  }
});
