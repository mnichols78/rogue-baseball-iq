let selectedAthleteId = null;
const $ = (id) => document.getElementById(id);

function esc(v) {
  return String(v || '').replace(/[&<>]/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[m]));
}

function athleteAge(birthdate) {
  if (!birthdate) return '—';
  const b = new Date(birthdate + 'T00:00:00');
  const t = new Date();
  let age = t.getFullYear() - b.getFullYear();
  const m = t.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && t.getDate() < b.getDate())) age--;
  return age;
}

function currentUser() {
  return RBIAuth.auth.currentUser;
}

async function loadAthletes() {
  const user = currentUser();
  if (!user) return;
  const snap = await RBIAuth.db.collection('users').doc(user.uid).collection('athletes').orderBy('createdAt', 'desc').get();
  const athletes = [];
  snap.forEach((doc) => athletes.push({ id: doc.id, ...doc.data() }));
  renderAthleteList(athletes);
  if (!selectedAthleteId && athletes.length) selectedAthleteId = athletes[0].id;
  renderProfile(athletes.find((a) => a.id === selectedAthleteId));
}

function renderAthleteList(athletes) {
  const box = $('athleteList');
  if (!athletes.length) {
    box.innerHTML = '<div class="empty">No athletes yet. Add the first athlete profile.</div>';
    return;
  }
  box.innerHTML = athletes.map((a) => {
    const pitchGuardUrl = `/pitchguard.html?athlete=${encodeURIComponent(a.id)}`;
    return `<div class="athlete-card ${a.id === selectedAthleteId ? 'active' : ''}" onclick="selectAthlete('${a.id}')"><h3>${esc(a.name)}</h3><div class="small">Class ${esc(a.gradYear || '—')} • ${esc(a.primaryPosition || 'Position TBD')} • ${esc(a.team || 'No team')}</div><a class="mini-action" href="${pitchGuardUrl}" onclick="event.stopPropagation()">Open in PitchGuard →</a></div>`;
  }).join('');
}

async function selectAthlete(id) {
  selectedAthleteId = id;
  await loadAthletes();
}

function renderProfile(a) {
  const box = $('profileOutput');
  if (!a) {
    box.innerHTML = '<div class="empty">Select or create an athlete to view the profile.</div>';
    return;
  }

  const pitchGuardUrl = `/pitchguard.html?athlete=${encodeURIComponent(a.id)}`;

  box.innerHTML = `<div class="profile"><div class="hero-card"><h2>${esc(a.name)}</h2><div class="small">${esc(a.team || 'No team yet')} ${a.birthdate ? '• Age ' + athleteAge(a.birthdate) : ''} ${a.gradYear ? '• Class ' + esc(a.gradYear) : ''}</div><div class="badges"><span class="badge">${esc(a.primaryPosition || 'Position TBD')}</span><span class="badge">Bats ${esc(a.bats || '—')}</span><span class="badge">Throws ${esc(a.throws || '—')}</span></div><div class="profile-actions"><a class="btn pitchguard-cta" href="${pitchGuardUrl}">Open ${esc(a.name)} in PitchGuard →</a><span class="small">Log outings and review workload for this athlete.</span></div></div><div class="stats"><div class="stat"><span>Height</span><b>${esc(a.height || '—')}</b></div><div class="stat"><span>Weight</span><b>${esc(a.weight || '—')}</b></div><div class="stat"><span>Secondary</span><b>${esc(a.secondaryPosition || '—')}</b></div><div class="stat"><span>Source</span><b>Profile</b></div></div><div class="panel"><h2>Connected RBI Tools</h2><div class="product-grid"><a class="product product-link" href="${pitchGuardUrl}"><h3>PitchGuard</h3><p>Open workload tracking for this athlete.</p></a><div class="product disabled-product"><h3>Pathway</h3><p>Planned development timeline for goals, milestones, and long-term priorities.</p></div><div class="product disabled-product"><h3>PitchLab / SwingLab</h3><p>Future analysis records will attach here.</p></div></div></div></div>`;
}

async function saveAthlete(e) {
  e.preventDefault();
  const user = currentUser();
  if (!user) {
    $('msg').textContent = 'Sign in first.';
    return;
  }

  const data = {
    name: $('name').value.trim(),
    birthdate: $('birthdate').value,
    team: $('team').value.trim(),
    primaryPosition: $('primaryPosition').value.trim(),
    secondaryPosition: $('secondaryPosition').value.trim(),
    bats: $('bats').value,
    throws: $('throws').value,
    gradYear: $('gradYear').value.trim(),
    height: $('height').value.trim(),
    weight: $('weight').value.trim(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  };

  if (!data.name) {
    $('msg').textContent = 'Name is required.';
    return;
  }

  data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
  const ref = await RBIAuth.db.collection('users').doc(user.uid).collection('athletes').add(data);
  selectedAthleteId = ref.id;
  $('athleteForm').reset();
  $('msg').textContent = 'Athlete saved.';
  await loadAthletes();
}

document.addEventListener('DOMContentLoaded', () => {
  $('athleteForm').addEventListener('submit', saveAthlete);
  RBIAuth.auth.onAuthStateChanged((user) => {
    if (!user) {
      $('athleteList').innerHTML = '<div class="empty">Sign in to manage athlete profiles.</div>';
      $('profileOutput').innerHTML = '<div class="empty">Athlete profiles require an RBI account.</div>';
      return;
    }
    loadAthletes();
  });
});
