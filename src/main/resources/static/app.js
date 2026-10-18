const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const video = $('#heroVideo');
const toast = $('#toast');
let toastTimer;
const watchlist = new Set(JSON.parse(localStorage.getItem('animeverse-watchlist') || '[]'));
let currentAnime = 'Attack on Titan';

function notify(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}
function saveList() {
  localStorage.setItem('animeverse-watchlist', JSON.stringify([...watchlist]));
  updateWatchlist();
}
function updateWatchlist() {
  $('#watchlistText').textContent = watchlist.size
    ? `${watchlist.size} series saved: ${[...watchlist].join(', ')}`
    : 'Your list is waiting for its first adventure.';
  $('#listBtn').innerHTML = watchlist.has('Attack on Titan') ? '✓ &nbsp; Added to my list' : '＋ &nbsp; Add to my list';
}
function addToList(name) {
  if (watchlist.has(name)) { watchlist.delete(name); notify(`${name} removed from your list`); }
  else { watchlist.add(name); notify(`${name} added to your list`); }
  saveList();
}
function openAnime(name) {
  currentAnime = name;
  const descriptions = {
    'Attack on Titan': 'Humanity lives inside enormous walls to escape the Titans. A devastating breach sets Eren Yeager and his comrades on a path toward answers that change everything.',
    'Demon Slayer': 'Tanjiro Kamado joins the Demon Slayer Corps after tragedy strikes his family, hoping to save his sister and defeat the demons that threaten humanity.',
    'One Piece': 'Monkey D. Luffy and his crew set sail across dangerous seas in search of the legendary treasure known as the One Piece.',
    'Jujutsu Kaisen': 'Yuji Itadori enters the dangerous world of cursed spirits and sorcerers after swallowing a powerful cursed object.',
    'Your Name': 'Two teenagers living different lives find themselves mysteriously connected across distance, memory, and time.'
  };
  $('#dialogTitle').textContent = name;
  $('#dialogBody').textContent = descriptions[name] || 'Explore the series details and add this title to your personal list.';
  $('#dialogAdd').textContent = watchlist.has(name) ? '✓ Remove from my list' : '＋ Add to my list';
  $('#animeDialog').showModal();
}
$('#dialogClose').addEventListener('click', () => $('#animeDialog').close());
$('#dialogAdd').addEventListener('click', () => { addToList(currentAnime); $('#dialogAdd').textContent = watchlist.has(currentAnime) ? '✓ Remove from my list' : '＋ Add to my list'; });
$('#exploreBtn').addEventListener('click', () => openAnime('Attack on Titan'));
$('#listBtn').addEventListener('click', () => addToList('Attack on Titan'));
$('#videoToggle').addEventListener('click', async () => {
  if (video.paused) {
    try { await video.play(); $('#videoToggleText').textContent = 'PAUSE BACKGROUND'; $('.sound-icon').textContent = 'Ⅱ'; }
    catch { notify('Video playback could not start. Try again.'); }
  } else {
    video.pause(); $('#videoToggleText').textContent = 'PLAY BACKGROUND'; $('.sound-icon').textContent = '▶';
  }
});
$('#searchToggle').addEventListener('click', () => {
  $('#searchBox').scrollIntoView({behavior:'smooth',block:'center'});
  $('#animeSearch').focus();
});
$('#menuToggle').addEventListener('click', () => $('#navLinks').classList.toggle('open'));
$$('.anime-card').forEach(card => {
  card.addEventListener('click', () => openAnime(card.dataset.title));
  card.querySelector('.card-play').addEventListener('click', e => { e.stopPropagation(); openAnime(card.dataset.title); });
});
$('#filters').addEventListener('click', e => {
  const button = e.target.closest('[data-filter]');
  if (!button) return;
  $$('.filter').forEach(f => f.classList.toggle('active', f === button));
  filterCards();
});
$('#animeSearch').addEventListener('input', filterCards);
function filterCards() {
  const active = $('.filter.active')?.dataset.filter || 'all';
  const query = $('#animeSearch').value.trim().toLowerCase();
  let visible = 0;
  $$('.anime-card').forEach(card => {
    const matchesGenre = active === 'all' || card.dataset.genre.split(' ').includes(active);
    const matchesQuery = card.dataset.title.toLowerCase().includes(query);
    card.hidden = !(matchesGenre && matchesQuery);
    if (!card.hidden) visible++;
  });
  let empty = $('#emptyState');
  if (!visible) {
    if (!empty) { empty = document.createElement('p'); empty.id = 'emptyState'; empty.className = 'empty-state'; empty.textContent = 'No titles found. Try another search.'; $('.anime-grid').after(empty); }
    empty.hidden = false;
  } else if (empty) empty.hidden = true;
}
$('#watchlistBtn').addEventListener('click', () => {
  $('#watchlistText').scrollIntoView({behavior:'smooth',block:'center'});
  notify(watchlist.size ? `Saved titles: ${[...watchlist].join(', ')}` : 'Add a title to build your list.');
});
$('#viewAll').addEventListener('click', e => {
  e.preventDefault();
  $('#animeSearch').value = '';
  $$('.filter').forEach(f => f.classList.toggle('active', f.dataset.filter === 'all'));
  filterCards();
  $('#discover').scrollIntoView({behavior:'smooth'});
});
updateWatchlist();
