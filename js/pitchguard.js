let s = { pitchers: [], outings: [], sel: null };

const $ = (x) => document.getElementById(x);

function today() {
  return new Date().toISOString().slice(0, 10);
}

function days(d) {
  return Math.round((new Date(today()) - new Date(d)) / 86400000);
}

function esc(v) {
  return String(v || '').replace(/[&<>]/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[m]));
}

function requestedAthleteId() {
  return new URLSearchParams(window.location.search).get('athlete');
}

function selectedOutings() {
  return s.outings.filter((o) => o.pid === s.sel).sort((a, b) => new Date(b.date) - new Date(a.date));
}

function sum(n) {
  return selectedOutings()
    .filter((o) => days(o.date) <= n && days(o.date) >= 0)
    .reduce((a, o) => a + Number(o.count || 0), 0);
}

function rest(c) {
  if (c <= 20) return 0;
  if (c <= 35) return 1;
  if (c <= 50) return 2;
  if (c <= 65) return 3;
  return 4;
}

function userRef() {
  return RBIAuth.db.collection('users').doc(RBIAuth.auth.currentUser.uid);
}

function athleteRef(id) {
  return userRef().collection('athletes').doc(id);
}

function calcAge(birthdate) {
  if (!birthdate) return '';
  const b = new Date(birthdate + 'T00:00:00');
  const t = new Date();
  let a = t.getFullYear() - b.getFullYear();
  const m = t.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && t.getDate() < b.getDate())) a--;
  return a;
}

function evalStatus() {
  const p = s.pitchers.find((x) => x.id === s.sel);
  const o = selectedOutings();
  if (!p) return ['green', 'Available', 'No athlete selected', 'Create or select an athlete profile first.', 0, 0, 0];
  if (!o.length) return ['green', 'Available', p.name, 'No outings logged yet.', 0, 0, 0];

  const last = o[0];
  const seven = sum(7);
  const thirty = sum(30);
  const rem = Math.max(0, rest(Number(last.count)) - days(last.date));
  let level = 'green';
  let label = 'Available';
  let msg = 'Available based on current RBI cloud log.';

  if (rem > 0) {
    level = rem >= 3 ? 'red' : 'orange';
    label = 'Rest';
    msg = 'Rest recommended: ' + rem + ' more day' + (rem === 1 ? '' : 's') + '.';
  } else if (seven >= 130) {
    level = 'orange';
    label = 'Caution';
    msg = 'High 7-day workload.';
  } else if (seven >= 90) {
    level = 'yellow';
    label = 'Light Usage';
    msg = 'Moderate 7-day workload.';
  }

  if (thirty >= 450 && level !== 'red') {
    level = 'yellow';
    label = 'Monitor';
    msg = '30-day workload is elevated.';
  }

  return [level, label, p.name, msg, last.count, seven, thirty];
}

function render() {
  const pbox = $('pitchers');
  pbox.innerHTML = s.pitchers.length
    ? s.pitchers.map((p) => '<div class="item ' + (p.id === s.sel ? 'active' : '') + '" onclick="selectAthlete(\'' + p.id + '\')"><b>' + esc(p.name) + '</b><div class="small">Age ' + (p.age || '—') + (p.team ? ' • ' + esc(p.team) : '') + '</div></div>').join('')
    : '<div class="empty-state"><p class="small">No athlete profiles yet. Create the first athlete profile before using PitchGuard.</p><a class="btn link-btn" href="/athletes.html">Create Athlete Profile</a></div>';

  const e = evalStatus();
  $('status').className = 'status ' + e[0];
  $('status').querySelector('.badge').textContent = e[1];
  $('stitle').textContent = e[2];
  $('smsg').textContent = e[3];
  $('last').textContent = e[4] || '—';
  $('seven').textContent = e[5] || 0;
  $('thirty').textContent = e[6] || 0;

  const form = $('oform');
  Array.from(form.elements).forEach((el) => { el.disabled = !s.sel; });

  const h = selectedOutings();
  $('history').innerHTML = h.length
    ? '<table><tr><th>Date</th><th>Opponent</th><th>Pitches</th><th>Innings</th><th>Notes</th></tr>' + h.map((o) => '<tr><td>' + o.date + '</td><td>' + esc(o.opp) + '</td><td><b>' + o.count + '</b></td><td>' + (o.inn || '—') + '</td><td>' + esc(o.notes) + '</td></tr>').join('') + '</table>'
    : '<p class="small">No outings logged for selected athlete.</p>';
}

async function loadCloud() {
  const user = RBIAuth.auth.currentUser;
  if (!user) return;

  const snap = await userRef().collection('athletes').orderBy('createdAt', 'desc').get();
  s.pitchers = [];
  snap.forEach((doc) => {
    const a = doc.data();
    s.pitchers.push({
      id: doc.id,
      name: a.name,
      age: a.birthdate ? calcAge(a.birthdate) : a.age,
      team: a.team || '',
      birthdate: a.birthdate || ''
    });
  });

  const requested = requestedAthleteId();
  if (requested && s.pitchers.some((p) => p.id === requested)) s.sel = requested;
  if (!s.sel && s.pitchers.length) s.sel = s.pitchers[0].id;

  await loadOutings();
  render();
}

async function loadOutings() {
  s.outings = [];
  if (!s.sel) return;
  const snap = await athleteRef(s.sel).collection('pitchguardOutings').orderBy('date', 'desc').get();
  snap.forEach((doc) => {
    const o = doc.data();
    s.outings.push({ id: doc.id, pid: s.sel, date: o.date, opp: o.opp || '', count: o.count || 0, inn: o.inn || '', notes: o.notes || '' });
  });
}

async function selectAthlete(id) {
  s.sel = id;
  const url = new URL(window.location.href);
  url.searchParams.set('athlete', id);
  history.replaceState(null, '', url.toString());
  await loadOutings();
  render();
}

async function addOuting(e) {
  e.preventDefault();
  if (!s.sel) return;
  await athleteRef(s.sel).collection('pitchguardOutings').add({
    date: $('date').value,
    opp: $('opp').value.trim(),
    count: Number($('count').value),
    inn: $('inn').value,
    notes: $('notes').value.trim(),
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
  e.target.reset();
  $('date').value = today();
  await loadOutings();
  render();
}

document.addEventListener('DOMContentLoaded', () => {
  $('date').value = today();
  $('oform').onsubmit = addOuting;
  RBIAuth.auth.onAuthStateChanged((user) => {
    if (user) loadCloud();
  });
});
