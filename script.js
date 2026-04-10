const artists = [
  {
    name: 'Cyber Punk Fighter',
    animeAvatar: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee?auto=format&fit=crop&w=600&q=80',
    vibeColor: '#ff006e',
    audioStreamUrl: 'https://www.soundjay.com/music/beep-07.mp3',
    genre: 'Battle Music'
  },
  {
    name: 'Lo-fi Dreamer',
    animeAvatar: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
    vibeColor: '#00d4ff',
    audioStreamUrl: 'https://www.soundjay.com/music/beep-08b.mp3',
    genre: 'Lo-fi'
  },
  {
    name: 'Phonk Master',
    animeAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    vibeColor: '#ffea00',
    audioStreamUrl: 'https://www.soundjay.com/music/beep-11b.mp3',
    genre: 'Phonk'
  }
];

const genres = ['All', 'Battle Music', 'Lo-fi', 'Phonk'];
let activeGenre = 'All';
let currentAudio = null;
let previewAudio = null;

const artistGrid = document.getElementById('artist-grid');
const genreButtons = document.getElementById('genre-buttons');
const uploadStatus = document.getElementById('upload-status');
const downloadList = document.getElementById('download-list');
const signupForm = document.getElementById('signup-form');
const uploadForm = document.getElementById('upload-form');
const artistProfilePanel = document.getElementById('artist-profile-panel');

function showSection(sectionId) {
  document.querySelectorAll('.section').forEach((section) => {
    section.classList.toggle('active', section.id === sectionId);
  });
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

function filterArtists() {
  const filtered = activeGenre === 'All'
    ? artists
    : artists.filter((artist) => artist.genre === activeGenre);

  artistGrid.innerHTML = '';

  filtered.forEach((artist) => {
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
    card.addEventListener('click', () => playTrack(artist.audioStreamUrl, artist.vibeColor));

    artistGrid.appendChild(card);
  });
}

function renderGenres() {
  genreButtons.innerHTML = '';

  genres.forEach((genre) => {
    const button = document.createElement('button');
    button.textContent = genre;
    button.className = genre === activeGenre ? 'active' : ''; 
    button.addEventListener('click', () => {
      activeGenre = genre;
      document.querySelectorAll('.filters button').forEach((btn) => btn.classList.toggle('active', btn.textContent === genre));
      filterArtists();
    });
    genreButtons.appendChild(button);
  });
}

function renderDownloads() {
  const downloads = [
    { title: 'Future Bass Edit', url: 'https://www.soundjay.com/music/beep-06.mp3' },
    { title: 'Dreamwave Melody', url: 'https://www.soundjay.com/music/beep-09.mp3' }
  ];

  downloadList.innerHTML = '';

  downloads.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'download-item';
    card.innerHTML = `
      <span>${item.title}</span>
      <a href="${item.url}" download>Download</a>
    `;
    downloadList.appendChild(card);
  });
}

function validateSignupField(value) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobilePattern = /^(\+27|0)[6-8][0-9]{8}$/;
  return emailPattern.test(value) || mobilePattern.test(value);
}

function renderProfilePanel() {
  const profile = getSavedProfile();

  if (!profile) {
    artistProfilePanel.innerHTML = `
      <div>
        <h3>Artist profile ready for signup</h3>
        <p>Create your profile using email or South African mobile number. Once approved by admin via email, you can upload songs and albums for free.</p>
      </div>
    `;
    return;
  }

  const statusText = profile.status === 'approved' ? 'Approved' : 'Pending approval';
  const statusColor = profile.status === 'approved' ? '#22c55e' : '#f97316';

  artistProfilePanel.innerHTML = `
    <div>
      <h3>Welcome back, ${profile.artistName}</h3>
      <p>Your profile is currently <strong>${statusText}</strong>.</p>
      <p>If you are approved, you can upload music to the platform and have it available for free download.</p>
      <div class="profile-status" style="border-color: ${statusColor}; background: rgba(34, 197, 94, 0.12); color: ${statusColor};">${statusText}</div>
    </div>
  `;
}

signupForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const artistName = document.getElementById('artistName').value.trim();
  const emailOrMobile = document.getElementById('emailOrMobile').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!artistName) {
    alert('Enter your artist or project name.');
    return;
  }

  if (!validateSignupField(emailOrMobile)) {
    alert('Please enter a valid email or South African mobile number.');
    return;
  }

  if (password.length < 6) {
    alert('Password must be at least 6 characters.');
    return;
  }

  saveProfile({ artistName, emailOrMobile, status: 'pending' });
  renderProfilePanel();
  alert('Profile created and sent for approval. You will receive an email once approved.');
  signupForm.reset();
});

uploadForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const profile = getSavedProfile();
  if (!profile) {
    uploadStatus.textContent = 'You need to create an artist profile before uploading music. Please sign up first.';
    return;
  }

  if (profile.status !== 'approved') {
    uploadStatus.textContent = 'Your profile is not yet approved. Uploads will be accepted once approval is granted via email.';
    return;
  }

  const fileInput = document.getElementById('upload-file');
  const file = fileInput.files[0];

  if (!file) {
    uploadStatus.textContent = 'Please select a song or album file to upload.';
    return;
  }

  uploadStatus.textContent = `Uploaded “${file.name}” successfully. It will be available for free download once the track is verified.`;
  fileInput.value = '';
});

window.addEventListener('DOMContentLoaded', () => {
  renderGenres();
  filterArtists();
  renderDownloads();
  renderProfilePanel();
});