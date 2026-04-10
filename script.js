const artists = [
  {
    name: 'Cyber Punk Fighter',
    animeAvatar: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee?auto=format&fit=crop&w=600&q=80',
    vibeColor: '#ff006e',
    audioStreamUrl: 'https://www.soundjay.com/music/beep-07.mp3',
    genre: 'Hip-Hop',
    albums: ['Battle Circuit'],
    songs: ['Neon Rush', 'Afterburner']
  },
  {
    name: 'Lo-fi Dreamer',
    animeAvatar: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
    vibeColor: '#00d4ff',
    audioStreamUrl: 'https://www.soundjay.com/music/beep-08b.mp3',
    genre: 'Lo-fi',
    albums: ['Midnight Study'],
    songs: ['Rainy Chalk', 'Soft Focus']
  },
  {
    name: 'Phonk Master',
    animeAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    vibeColor: '#ffea00',
    audioStreamUrl: 'https://www.soundjay.com/music/beep-11b.mp3',
    genre: 'Amapiano',
    albums: ['Sunset Pulse'],
    songs: ['Midnight Groove', 'City Lights']
  }
];

const genres = ['All', 'Hip-Hop', 'Pop', 'Amapiano', 'R&B', 'Phonk', 'Lo-fi', 'Electronic'];
const albums = [
  { title: 'Battle Circuit', artist: 'Cyber Punk Fighter' },
  { title: 'Midnight Study', artist: 'Lo-fi Dreamer' },
  { title: 'Sunset Pulse', artist: 'Phonk Master' }
];

const trending = [
  { title: 'Neon Rush', artist: 'Cyber Punk Fighter' },
  { title: 'Soft Focus', artist: 'Lo-fi Dreamer' }
];

const newReleases = [
  { title: 'City Lights', artist: 'Phonk Master' },
  { title: 'Afterburner', artist: 'Cyber Punk Fighter' }
];

const favorites = [
  { title: 'Rainy Chalk', artist: 'Lo-fi Dreamer' },
  { title: 'Midnight Groove', artist: 'Phonk Master' }
];

const playlists = [
  { title: 'Chill Vibes', subtitle: 'Wind down with ambient tunes' },
  { title: 'Battle Mode', subtitle: 'High energy rhythms' }
];

let activeGenre = 'All';
let currentAudio = null;
let previewAudio = null;
let otpCode = null;

const artistGrid = document.getElementById('artist-grid');
const genreButtons = document.getElementById('genre-buttons');
const uploadStatus = document.getElementById('upload-status');
const downloadList = document.getElementById('download-list');
const signupForm = document.getElementById('signup-form');
const uploadForm = document.getElementById('upload-form');
const artistProfilePanel = document.getElementById('artist-profile-panel');
const profileContent = document.getElementById('profile-content');

function switchSection(sectionId) {
  const sectionMap = {
    library: 'albums',
    'create-playlist': 'playlists'
  };
  const targetId = sectionMap[sectionId] || sectionId;

  let found = false;
  document.querySelectorAll('.section').forEach((section) => {
    const isActive = section.id === targetId;
    section.classList.toggle('active', isActive);
    if (isActive) {
      found = true;
    }
  });

  if (!found) {
    document.querySelectorAll('.section').forEach((section) => {
      section.classList.toggle('active', section.id === 'home');
    });
  }
}

function setBodyVibe(color) {
  document.documentElement.style.setProperty('--vibe-color', color);
}

function playTrack(url, color) {
  stopPreview();
  if (currentAudio) currentAudio.pause();
  currentAudio = new Audio(url);
  currentAudio.volume = 0.7;
  currentAudio.play();
  setBodyVibe(color);
}

function previewTrack(url) {
  if (previewAudio) previewAudio.pause();
  previewAudio = new Audio(url);
  previewAudio.volume = 0.2;
  previewAudio.play();
}

function stopPreview() {
  if (previewAudio) {
    previewAudio.pause();
    previewAudio = null;
  }
}

function getSavedProfile() {
  return JSON.parse(localStorage.getItem('artistProfile') || 'null');
}

function saveProfile(profile) {
  localStorage.setItem('artistProfile', JSON.stringify(profile));
}

function createArtistCard(artist) {
  const card = document.createElement('div');
  card.className = 'artist-card';
  card.innerHTML = `
    <img src="${artist.animeAvatar}" alt="${artist.name}" />
    <div class="artist-card-content">
      <h3>${artist.name}</h3>
      <p>${artist.genre}</p>
      <span class="genre-badge">Preview</span>
    </div>
  `;

  card.addEventListener('mouseenter', () => previewTrack(artist.audioStreamUrl));
  card.addEventListener('mouseleave', stopPreview);
  card.addEventListener('click', () => showArtistDetail(artist));

  return card;
}

function filterArtists() {
  const filtered = activeGenre === 'All'
    ? artists
    : artists.filter((artist) => artist.genre === activeGenre);

  artistGrid.innerHTML = '';
  filtered.forEach((artist) => artistGrid.appendChild(createArtistCard(artist)));
}

function renderGenres() {
  genreButtons.innerHTML = '';
  genres.forEach((genre) => {
    const button = document.createElement('button');
    button.textContent = genre;
    button.className = genre === activeGenre ? 'active' : '';
    button.addEventListener('click', () => {
      activeGenre = genre;
      filterArtists();
    });
    genreButtons.appendChild(button);
  });
}

function renderDiscover() {
  const container = document.getElementById('discover-list');
  if (!container) return;

  container.innerHTML = '';
  artists.forEach((artist) => {
    const item = document.createElement('div');
    item.className = 'song-card';
    item.innerHTML = `<strong>${artist.name}</strong><br /><small>${artist.genre}</small>`;
    item.addEventListener('click', () => showArtistDetail(artist));
    container.appendChild(item);
  });
}

function prepareGenre(genre) {
  activeGenre = genre;
  filterArtists();
  switchSection('discover');
}

function renderArtistsList() {
  const list = document.getElementById('artists-list');
  if (!list) return;
  list.innerHTML = '';
  artists.forEach((artist) => list.appendChild(createArtistCard(artist)));
}

function renderAlbumList() {
  const container = document.getElementById('album-list');
  if (!container) return;
  container.innerHTML = '';
  albums.forEach((album) => {
    const card = document.createElement('div');
    card.className = 'album-card';
    card.innerHTML = `
      <strong>${album.title}</strong><br />
      <small>${album.artist}</small>`;
    container.appendChild(card);
  });
}

function renderList(listId, items, isDownload = false) {
  const container = document.getElementById(listId);
  if (!container) return;
  container.innerHTML = '';
  items.forEach((item) => {
    const card = document.createElement('div');
    card.className = isDownload ? 'download-item' : 'song-card';
    if (isDownload) {
      card.innerHTML = `
        <span>${item.title} • ${item.artist}</span>
        <a href="${item.url}" download>Download</a>`;
    } else {
      card.innerHTML = `
        <strong>${item.title}</strong><br />
        <small>${item.artist}</small>`;
    }
    container.appendChild(card);
  });
}

function renderDownloads() {
  const downloads = [
    { title: 'Future Bass Edit', artist: 'Lo-fi Dreamer', url: 'https://www.soundjay.com/music/beep-06.mp3' },
    { title: 'Dreamwave Melody', artist: 'Phonk Master', url: 'https://www.soundjay.com/music/beep-09.mp3' }
  ];
  renderList('download-list', downloads, true);
}

function renderTrending() {
  renderList('trending-list', trending);
}

function renderNewReleases() {
  renderList('releases-list', newReleases);
}

function renderFavorites() {
  renderList('favorite-list', favorites);
}

function renderPlaylists() {
  const container = document.getElementById('playlist-list');
  if (!container) return;
  container.innerHTML = '';
  playlists.forEach((playlist) => {
    const card = document.createElement('div');
    card.className = 'playlist-card';
    card.innerHTML = `
      <strong>${playlist.title}</strong>
      <p>${playlist.subtitle}</p>`;
    container.appendChild(card);
  });
}

function showArtistDetail(artist) {
  const detailTitle = document.getElementById('detail-title');
  const tabs = document.getElementById('artist-tabs');
  const content = document.getElementById('artist-tab-content');

  if (!detailTitle || !tabs || !content) return;
  detailTitle.textContent = artist.name;
  tabs.innerHTML = '';

  const tabConfig = [
    { id: 'overview', label: 'Overview' },
    { id: 'songs', label: 'Songs' },
    { id: 'albums', label: 'Albums' },
    { id: 'playlists', label: 'Playlists' },
    { id: 'about', label: 'About' }
  ];

  tabConfig.forEach((tab, index) => {
    const button = document.createElement('button');
    button.textContent = tab.label;
    if (index === 0) button.classList.add('active');
    button.addEventListener('click', () => {
      tabs.querySelectorAll('button').forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      renderArtistTab(artist, tab.id);
    });
    tabs.appendChild(button);
  });

  renderArtistTab(artist, 'overview');
  switchSection('artist-detail');
}

function renderArtistTab(artist, tabId) {
  const content = document.getElementById('artist-tab-content');
  if (!content) return;
  content.innerHTML = '';

  if (tabId === 'overview') {
    content.innerHTML = `
      <p><strong>Genre:</strong> ${artist.genre}</p>
      <p><strong>Top tracks:</strong> ${artist.songs.join(', ')}</p>
      <p>Preview this artist below or navigate to their albums and playlists.</p>`;
  }

  if (tabId === 'songs') {
    artist.songs.forEach((song) => {
      const card = document.createElement('div');
      card.className = 'song-card';
      card.innerHTML = `<strong>${song}</strong><br /><small>${artist.name}</small>`;
      card.addEventListener('click', () => playTrack(artist.audioStreamUrl, artist.vibeColor));
      content.appendChild(card);
    });
  }

  if (tabId === 'albums') {
    artist.albums.forEach((album) => {
      const card = document.createElement('div');
      card.className = 'album-card';
      card.innerHTML = `<strong>${album}</strong><br /><small>${artist.name}</small>`;
      content.appendChild(card);
    });
  }

  if (tabId === 'playlists') {
    playlists.forEach((playlist) => {
      const card = document.createElement('div');
      card.className = 'playlist-card';
      card.innerHTML = `<strong>${playlist.title}</strong><p>${playlist.subtitle}</p>`;
      content.appendChild(card);
    });
  }

  if (tabId === 'about') {
    content.innerHTML = `
      <p>${artist.name} is an innovative music creator blending genre and atmosphere into immersive productions.</p>
      <p>This page includes overview, songs, albums, playlists, and artist details.</p>`;
  }
}

function renderProfilePanel() {
  const profile = getSavedProfile();
  if (!profile) {
    artistProfilePanel.innerHTML = `
      <div>
        <h3>Artist profile ready for signup</h3>
        <p>Create your profile with a contact email or mobile number, then verify with OTP to sign in instantly.</p>
      </div>
    `;
    renderProfileForm();
    return;
  }

  const statusText = profile.status === 'approved' ? 'Approved' : 'Pending approval';
  const statusColor = profile.status === 'approved' ? '#22c55e' : '#f97316';

  artistProfilePanel.innerHTML = `
    <div>
      <h3>Welcome back, ${profile.artistName}</h3>
      <p>Your profile is currently <strong>${statusText}</strong>.</p>
      <p>If approved, you can upload music and publish tracks for free downloads.</p>
      <div class="profile-status" style="border-color: ${statusColor}; background: rgba(34, 197, 94, 0.12); color: ${statusColor};">${statusText}</div>
    </div>
  `;
  renderProfileDetails(profile);
}

function renderProfileForm() {
  const formContent = `
    <form id="otp-signup-form" class="profile-form">
      <label for="contactInput">Email or Mobile Number</label>
      <input id="contactInput" type="text" placeholder="Enter your email or contact" required />
      <button type="button" onclick="sendOtp()">Send OTP</button>
    </form>
    <div id="otpSection" class="otp-section hidden">
      <label for="otpInput">Enter OTP</label>
      <input id="otpInput" type="text" placeholder="Enter code" />
      <button type="button" onclick="verifyOtp()">Verify OTP</button>
      <p class="hint">A one-time code has been sent to your contact. Use it to sign in.</p>
      <div id="otpFeedback" class="status-message"></div>
    </div>
  `;
  profileContent.innerHTML = formContent;
}

function renderProfileDetails(profile) {
  profileContent.innerHTML = `
    <p><strong>Artist Name:</strong> ${profile.artistName}</p>
    <p><strong>Contact:</strong> ${profile.contact}</p>
    <p><strong>Status:</strong> ${profile.status}</p>
    <button onclick="logout()">Sign Out</button>
  `;
}

function sendOtp() {
  const contactInput = document.getElementById('contactInput');
  const contact = contactInput.value.trim();
  if (!contact) {
    alert('Please enter your email or mobile number.');
    return;
  }
  otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  document.getElementById('otpSection').classList.remove('hidden');
  document.getElementById('otpFeedback').textContent = `One-time password sent to ${contact}. Use code ${otpCode} for demo.`;
}

function verifyOtp() {
  const otpInput = document.getElementById('otpInput');
  const entered = otpInput.value.trim();
  if (entered === otpCode) {
    const contact = document.getElementById('contactInput').value.trim();
    const artistName = contact.split('@')[0] || contact;
    saveProfile({ artistName, contact, status: 'pending' });
    alert('OTP verified. You are signed in and awaiting approval.');
    renderProfilePanel();
    switchSection('home');
  } else {
    document.getElementById('otpFeedback').textContent = 'Incorrect code. Try again or resend OTP.';
  }
}

function logout() {
  localStorage.removeItem('artistProfile');
  renderProfilePanel();
}

signupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  alert('Use the Profile section to sign in with OTP.');
});

uploadForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const profile = getSavedProfile();
  if (!profile) {
    uploadStatus.textContent = 'You need to sign in with OTP before uploading music.';
    return;
  }
  if (profile.status !== 'approved') {
    uploadStatus.textContent = 'Your profile is pending approval. Uploads will be accepted after email approval.';
    return;
  }
  const fileInput = document.getElementById('upload-file');
  const file = fileInput.files[0];
  if (!file) {
    uploadStatus.textContent = 'Please choose a song or album file to upload.';
    return;
  }
  uploadStatus.textContent = `Uploaded “${file.name}” successfully. It will be available for free download after review.`;
  fileInput.value = '';
});

function performSearch() {
  const query = document.getElementById('global-search').value.toLowerCase();
  const results = artists.filter((artist) => artist.name.toLowerCase().includes(query) || artist.genre.toLowerCase().includes(query));
  const container = document.getElementById('discover-list');
  if (!container) return;
  container.innerHTML = '';
  results.forEach((artist) => container.appendChild(createArtistCard(artist)));
  switchSection('discover');
}

function showNotification() {
  alert('You have new approval notifications and artist updates waiting in your email.');
}

window.addEventListener('DOMContentLoaded', () => {
  renderGenres();
  filterArtists();
  renderDiscover();
  renderArtistsList();
  renderAlbumList();
  renderTrending();
  renderNewReleases();
  renderFavorites();
  renderPlaylists();
  renderDownloads();
  renderProfilePanel();
});