// DOM Elements
const playlistSongs = document.getElementById("playlist-songs");
const favoritesSongs = document.getElementById("favorites-songs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const shuffleButton = document.getElementById("shuffle");
const repeatButton = document.getElementById("repeat");
const favoriteButton = document.getElementById("favorite");
const volumeSlider = document.getElementById("volume-slider");
const progressBar = document.querySelector(".progress-bar");
const progress = document.getElementById("progress");
const currentTimeDisplay = document.getElementById("current-time");
const durationDisplay = document.getElementById("duration");
const speedButton = document.getElementById("speed-btn");
const speedOptions = document.getElementById("speed-options");
const speedValue = document.getElementById("speed-value");
const lyricsToggle = document.getElementById("lyrics-toggle");
const lyricsPanel = document.getElementById("lyrics-panel");
const lyricsContent = document.getElementById("lyrics-content");
const closeLyrics = document.getElementById("close-lyrics");
const visualizerToggle = document.getElementById("visualizer-toggle");
const audioVisualizer = document.getElementById("audio-visualizer");
const albumArtwork = document.getElementById("album-artwork");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const allSongsTab = document.getElementById("all-songs-tab");
const favoritesTab = document.getElementById("favorites-tab");
const customPlaylistsTab = document.getElementById("custom-playlists-tab");
const allSongsContainer = document.getElementById("all-songs-container");
const favoritesContainer = document.getElementById("favorites-container");
const customPlaylistsContainer = document.getElementById(
  "custom-playlists-container"
);
const playlistHeader = document.getElementById("playlist-header");
const createPlaylistBtn = document.getElementById("create-playlist-btn");
const createPlaylistModal = document.getElementById("create-playlist-modal");
const closeCreateModal = document.getElementById("close-create-modal");
const createPlaylistForm = document.getElementById("create-playlist-form");
const playlistNameInput = document.getElementById("playlist-name");
const playlistDescriptionInput = document.getElementById(
  "playlist-description"
);
const cancelPlaylist = document.getElementById("cancel-playlist");
const addToPlaylistModal = document.getElementById("add-to-playlist-modal");
const closeAddModal = document.getElementById("close-add-modal");
const addSongName = document.getElementById("add-song-name");
const playlistChoices = document.getElementById("playlist-choices");
const cancelAdd = document.getElementById("cancel-add");
const playlistsList = document.getElementById("playlists-list");
const keyboardHelp = document.getElementById("keyboard-help");
const keyboardShortcutsModal = document.getElementById(
  "keyboard-shortcuts-modal"
);
const closeShortcutsModal = document.getElementById("close-shortcuts-modal");

// Sample songs data
const allSongs = [
  {
    id: 0,
    title: "Scratching The Surface",
    artist: "Quincy Larson",
    duration: "4:25",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/scratching-the-surface.mp3",
    album: "Code and Create",
    artwork:
      "https://cdn.freecodecamp.org/curriculum/js-music-player/quincy-larson-album-art.jpg",
    lyrics:
      "Coding day and night\nScratch the surface, see what's right\nDigging deep into the code\nBuilding futures, line by line",
    genre: "Electronic",
  },
  {
    id: 1,
    title: "Can't Stay Down",
    artist: "Quincy Larson",
    duration: "4:15",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/can't-stay-down.mp3",
    album: "Code and Create",
    artwork:
      "https://cdn.freecodecamp.org/curriculum/js-music-player/quincy-larson-album-art.jpg",
    lyrics:
      "When bugs appear and tests all fail\nCan't stay down, must prevail\nRefactor, rebuild, try again\nPersistence is a developer's friend",
    genre: "Pop",
  },
  {
    id: 2,
    title: "Still Learning",
    artist: "Quincy Larson",
    duration: "3:51",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/still-learning.mp3",
    album: "Code and Create",
    artwork:
      "https://cdn.freecodecamp.org/curriculum/js-music-player/quincy-larson-album-art.jpg",
    lyrics:
      "New frameworks, languages, and tools\nStill learning, following the rules\nNever stop, always grow\nThe more I learn, the more I know",
    genre: "Ambient",
  },
  {
    id: 3,
    title: "Cruising for a Musing",
    artist: "Quincy Larson",
    duration: "3:34",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cruising-for-a-musing.mp3",
    album: "Digital Dreams",
    artwork:
      "https://cdn.freecodecamp.org/curriculum/js-music-player/quincy-larson-album-art.jpg",
    lyrics:
      "Searching for inspiration\nCruising for a musing\nIdeas flow like electricity\nCode becomes poetry in motion",
    genre: "Jazz",
  },
  {
    id: 4,
    title: "Never Not Favored",
    artist: "Quincy Larson",
    duration: "3:35",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/never-not-favored.mp3",
    album: "Digital Dreams",
    artwork:
      "https://cdn.freecodecamp.org/curriculum/js-music-player/quincy-larson-album-art.jpg",
    lyrics:
      "Fortune favors the bold coder\nNever not favored when you persist\nChallenge after challenge\nGrowing stronger with each commit",
    genre: "Electronic",
  },
  {
    id: 5,
    title: "From the Ground Up",
    artist: "Quincy Larson",
    duration: "3:12",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/from-the-ground-up.mp3",
    album: "Digital Dreams",
    artwork:
      "https://cdn.freecodecamp.org/curriculum/js-music-player/quincy-larson-album-art.jpg",
    lyrics:
      "Building from scratch, from the ground up\nLine by line, function by function\nArchitecting solutions\nCreating worlds from nothing but thought",
    genre: "Rock",
  },
  {
    id: 6,
    title: "Walking on Air",
    artist: "Quincy Larson",
    duration: "3:25",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/walking-on-air.mp3",
    album: "Algorithmic Anthems",
    artwork:
      "https://cdn.freecodecamp.org/curriculum/js-music-player/quincy-larson-album-art.jpg",
    lyrics:
      "When the code compiles perfectly\nWalking on air, feeling so free\nNo bugs to fix, no errors to chase\nJust pure creation in digital space",
    genre: "Pop",
  },
  {
    id: 7,
    title: "Can't Stop Me. Can't Even Slow Me Down.",
    artist: "Quincy Larson",
    duration: "3:52",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cant-stop-me-cant-even-slow-me-down.mp3",
    album: "Algorithmic Anthems",
    artwork:
      "https://cdn.freecodecamp.org/curriculum/js-music-player/quincy-larson-album-art.jpg",
    lyrics:
      "Deadlines approaching, pressure mounting\nCan't stop me, can't even slow me down\nFingers flying across the keyboard\nSolutions emerging from the digital storm",
    genre: "Rock",
  },
  {
    id: 8,
    title: "The Surest Way Out is Through",
    artist: "Quincy Larson",
    duration: "3:10",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/the-surest-way-out-is-through.mp3",
    album: "Algorithmic Anthems",
    artwork:
      "https://cdn.freecodecamp.org/curriculum/js-music-player/quincy-larson-album-art.jpg",
    lyrics:
      "Faced with complex problems\nThe surest way out is through\nNo shortcuts, no easy paths\nJust persistence and logical truth",
    genre: "Ambient",
  },
  {
    id: 9,
    title: "Chasing That Feeling",
    artist: "Quincy Larson",
    duration: "2:43",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/chasing-that-feeling.mp3",
    album: "Binary Beats",
    artwork:
      "https://cdn.freecodecamp.org/curriculum/js-music-player/quincy-larson-album-art.jpg",
    lyrics:
      "Chasing that feeling when code works right\nThe thrill of creation, day and night\nPursuing perfection in every line\nBuilding the future, one commit at a time",
    genre: "Jazz",
  },
];

// Audio setup
const audio = new Audio();
let audioContext = null;
let analyser = null;
let source = null;
let animationFrame = null;
let audioSetupComplete = false;
let useWebAudio = false; // Flag to determine if we should use Web Audio API

// App state
const APP_STATE = {
  songs: [...allSongs],
  currentSong: null,
  songCurrentTime: 0,
  isPlaying: false,
  repeatMode: "off", // 'off', 'one', 'all'
  volume: 0.8,
  playbackSpeed: 1,
  currentView: "all-songs", // 'all-songs', 'favorites', 'custom-playlist'
  currentPlaylistId: null,
  favorites: [],
  customPlaylists: [],
  visualizerActive: false,
  searchQuery: "",
  songToAddId: null,
  lastAction: null,
  lastActionTime: null,
};

// LocalStorage keys
const STORAGE_KEYS = {
  APP_STATE: "musicPlayerAppState",
  VERSION: "1.0.0",
};

// Initialize app
const initializeApp = () => {
  // Load saved state from localStorage
  loadFromLocalStorage();

  // Don't set up audio yet - wait for user interaction

  // Check if elements exist before manipulating them
  if (playlistSongs) {
    renderSongs(APP_STATE.songs, playlistSongs);
  }

  if (favoritesSongs) {
    renderFavorites();
  }

  renderCustomPlaylists();

  if (repeatButton) {
    updateRepeatButtonUI();
  }

  if (playlistHeader) {
    updatePlaylistHeader();
  }

  if (playButton) {
    setPlayButtonAccessibleText();
  }

  // Set up keyboard shortcuts
  setupKeyboardShortcuts();

  // Set initial volume
  if (audio) {
    audio.volume = APP_STATE.volume;
  }

  // Check if volume slider exists before updating
  if (volumeSlider) {
    updateVolumeUI();
  }

  // Add test audio button in development
  addTestAudioButton();
};

// Helper function to safely get DOM elements
const safeGetElement = (id) => {
  const element = document.getElementById(id);
  if (!element) {
    console.warn(`Element with ID '${id}' not found`);
  }
  return element;
};

// LocalStorage functions
const loadFromLocalStorage = () => {
  try {
    const savedState = JSON.parse(localStorage.getItem(STORAGE_KEYS.APP_STATE));
    if (savedState) {
      // Restore favorites and custom playlists
      APP_STATE.favorites = savedState.favorites || [];
      APP_STATE.customPlaylists = savedState.customPlaylists || [];
      APP_STATE.volume =
        savedState.volume !== undefined ? savedState.volume : 0.8;
      APP_STATE.repeatMode = savedState.repeatMode || "off";

      // Set audio volume
      audio.volume = APP_STATE.volume;
    }
  } catch (error) {
    console.error("Error loading from localStorage:", error);
  }
};

const saveToLocalStorage = () => {
  try {
    const stateToSave = {
      favorites: APP_STATE.favorites,
      customPlaylists: APP_STATE.customPlaylists,
      volume: APP_STATE.volume,
      repeatMode: APP_STATE.repeatMode,
      version: STORAGE_KEYS.VERSION,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.APP_STATE, JSON.stringify(stateToSave));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

// Audio Visualization setup - completely rewritten
const setupAudio = () => {
  // If already set up, don't do it again
  if (audioSetupComplete) {
    console.log("Audio already set up");
    return;
  }

  try {
    // Create audio context
    audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Create analyzer
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;

    // Create media element source
    source = audioContext.createMediaElementSource(audio);

    // Connect the source to both the analyzer and the destination
    source.connect(analyser);
    source.connect(audioContext.destination);

    audioSetupComplete = true;
    useWebAudio = true;
    console.log("Audio setup complete with Web Audio API");
  } catch (error) {
    console.error("Web Audio API setup error:", error);
    if (visualizerToggle) {
      visualizerToggle.disabled = true;
      visualizerToggle.classList.add("disabled");
    }

    // Fall back to basic audio
    audioSetupComplete = true;
    useWebAudio = false;
    console.log("Falling back to basic audio playback (no visualization)");
  }
};

// Initialize audio context on first user interaction
const initAudioContext = () => {
  if (audioSetupComplete) return;

  try {
    setupAudio();

    if (audioContext && audioContext.state === "suspended") {
      audioContext.resume().then(() => {
        console.log("AudioContext resumed");
      });
    }
  } catch (error) {
    console.error("Failed to initialize AudioContext:", error);
    // Fall back to basic audio
    audioSetupComplete = true;
    useWebAudio = false;
    console.log("Falling back to basic audio playback after error");
  }
};

// Debug function to inspect player display elements
const debugPlayerDisplay = () => {
  console.log("--- DEBUGGING PLAYER DISPLAY ---");

  // Check if elements exist
  const titleElement = document.getElementById("player-song-title");
  const artistElement = document.getElementById("player-song-artist");

  console.log("Title element exists:", !!titleElement);
  console.log("Artist element exists:", !!artistElement);

  if (titleElement) {
    console.log("Title element content:", titleElement.textContent);
    console.log(
      "Title element visibility:",
      window.getComputedStyle(titleElement).visibility
    );
    console.log(
      "Title element display:",
      window.getComputedStyle(titleElement).display
    );
  }

  if (artistElement) {
    console.log("Artist element content:", artistElement.textContent);
    console.log(
      "Artist element visibility:",
      window.getComputedStyle(artistElement).visibility
    );
    console.log(
      "Artist element display:",
      window.getComputedStyle(artistElement).display
    );
  }

  // Check current song in app state
  console.log(
    "Current song in APP_STATE:",
    APP_STATE.currentSong
      ? `${APP_STATE.currentSong.title} by ${APP_STATE.currentSong.artist}`
      : "No current song"
  );

  console.log("--- END DEBUG ---");
};

// Improved playSong function with better debugging
const playSong = (id) => {
  const song = allSongs.find((song) => song.id === id);
  if (!song) {
    console.error(`Song with id ${id} not found`);
    return;
  }

  console.log(`Attempting to play: ${song.title}`);

  // Set audio source
  audio.src = song.src;

  // Update current song in app state
  APP_STATE.currentSong = song;

  // Set playback rate from app state
  audio.playbackRate = APP_STATE.playbackSpeed;

  // Set volume
  audio.volume = APP_STATE.volume;

  // IMPORTANT: FORCE UPDATE UI ELEMENTS DIRECTLY
  const titleElement = document.getElementById("player-song-title");
  const artistElement = document.getElementById("player-song-artist");

  console.log("Title element reference:", titleElement);
  console.log("Artist element reference:", artistElement);

  if (titleElement) {
    titleElement.textContent = song.title;
    titleElement.innerHTML = song.title; // Try both methods
    console.log("Title set to:", song.title);
  } else {
    console.error("Title element not found!");
  }

  if (artistElement) {
    artistElement.textContent = song.artist;
    artistElement.innerHTML = song.artist; // Try both methods
    console.log("Artist set to:", song.artist);
  } else {
    console.error("Artist element not found!");
  }

  // Force display update
  const playerDisplay = document.querySelector(".player-display");
  if (playerDisplay) {
    console.log("Player display found, ensuring visibility");
    playerDisplay.style.display = "flex";

    // Force a reflow to apply styles
    void playerDisplay.offsetWidth;
  } else {
    console.error("Player display element not found!");
  }

  // If we're switching songs, reset time
  if (APP_STATE.currentSong && APP_STATE.currentSong.id !== id) {
    audio.currentTime = 0;
  } else if (APP_STATE.songCurrentTime) {
    // Otherwise restore previous time if available
    audio.currentTime = APP_STATE.songCurrentTime;
  }

  // Call all update functions
  updateAlbumArtwork();
  updateLyrics();
  updateFavoriteButtonUI();
  setPlayerDisplay();
  highlightCurrentSong();

  // Debug the display state
  setTimeout(debugPlayerDisplay, 100);

  // Try to initialize audio context if not already done
  if (!audioSetupComplete) {
    try {
      initAudioContext();
    } catch (e) {
      console.warn(
        "Could not initialize audio context, continuing with basic audio"
      );
    }
  }

  // Play the audio
  console.log("Calling audio.play()");
  const playPromise = audio.play();

  // Handle play promise (required for modern browsers)
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        // Playback started successfully
        console.log("Playback started successfully");
        APP_STATE.isPlaying = true;
        if (pauseButton) pauseButton.style.display = "block";
        if (playButton) playButton.style.display = "none";

        // Start visualizer if active and Web Audio API is available
        if (APP_STATE.visualizerActive && useWebAudio) {
          startVisualizer();
        }

        // Debug again after playback starts
        setTimeout(debugPlayerDisplay, 500);
      })
      .catch((error) => {
        // Auto-play was prevented
        console.error("Playback was prevented:", error);
        APP_STATE.isPlaying = false;
        if (pauseButton) pauseButton.style.display = "none";
        if (playButton) playButton.style.display = "block";

        // Let the user know they need to interact with the page
        alert("Please click the play button again to enable audio playback.");
      });
  }
};

const pauseSong = () => {
  APP_STATE.songCurrentTime = audio.currentTime;
  audio.pause();
  APP_STATE.isPlaying = false;
  pauseButton.style.display = "none";
  playButton.style.display = "block";

  // Stop visualizer if active
  if (APP_STATE.visualizerActive) {
    stopVisualizer();
  }
};

const playNextSong = () => {
  if (!APP_STATE.songs.length) return;

  if (APP_STATE.currentSong === null) {
    playSong(APP_STATE.songs[0].id);
    return;
  }

  const currentSongIndex = getCurrentSongIndex();

  // Check if we're at the end of the playlist
  if (currentSongIndex === APP_STATE.songs.length - 1) {
    // If repeat all is enabled, go back to first song
    if (APP_STATE.repeatMode === "all") {
      playSong(APP_STATE.songs[0].id);
    }
    // Otherwise do nothing (we're at the end)
  } else {
    // Play next song
    const nextSong = APP_STATE.songs[currentSongIndex + 1];
    if (nextSong) {
      playSong(nextSong.id);
    }
  }
};

const playPreviousSong = () => {
  if (!APP_STATE.songs.length) return;

  if (APP_STATE.currentSong === null) {
    playSong(APP_STATE.songs[0].id);
    return;
  }

  const currentSongIndex = getCurrentSongIndex();

  // If we're more than 3 seconds into the song, restart it instead of going to previous
  if (audio.currentTime > 3) {
    audio.currentTime = 0;
    return;
  }

  // Check if we're at the beginning of the playlist
  if (currentSongIndex === 0) {
    // If repeat all is enabled, go to last song
    if (APP_STATE.repeatMode === "all") {
      playSong(APP_STATE.songs[APP_STATE.songs.length - 1].id);
    } else {
      // Just restart the current song
      audio.currentTime = 0;
    }
  } else {
    // Play previous song
    const previousSong = APP_STATE.songs[currentSongIndex - 1];
    if (previousSong) {
      playSong(previousSong.id);
    }
  }
};

const shuffle = () => {
  // Create a copy of the songs array and shuffle it
  const shuffledSongs = [...APP_STATE.songs].sort(() => Math.random() - 0.5);

  // Update the songs in the app state
  APP_STATE.songs = shuffledSongs;

  // Reset current song if playing
  if (APP_STATE.isPlaying) {
    pauseSong();
  }

  // Update UI
  renderSongs(APP_STATE.songs, playlistSongs);
  setPlayerDisplay();
  saveToLocalStorage();
};

const deleteSong = (id) => {
  if (APP_STATE?.currentSong?.id === id) {
    APP_STATE.currentSong = null;
    APP_STATE.songCurrentTime = 0;

    pauseSong();
    setPlayerDisplay();
  }

  APP_STATE.songs = APP_STATE?.songs.filter((song) => song.id !== id);
  renderSongs(APP_STATE?.songs);
  highlightCurrentSong();
  setPlayButtonAccessibleText();
};

const setPlayerDisplay = () => {
  console.log("Setting player display...");

  // Get player display elements
  const playingSong = document.getElementById("player-song-title");
  const songArtist = document.getElementById("player-song-artist");
  const playerDisplay = document.querySelector(".player-display");
  const songArtistContainer = document.querySelector(
    ".player-display-song-artist"
  );

  // Handle missing elements
  if (!playingSong || !songArtist) {
    console.error("Player display elements not found");

    // Create elements if they don't exist
    if (!playingSong && songArtistContainer) {
      const newTitle = document.createElement("p");
      newTitle.id = "player-song-title";
      songArtistContainer.prepend(newTitle);
    }

    if (!songArtist && songArtistContainer) {
      const newArtist = document.createElement("p");
      newArtist.id = "player-song-artist";
      const titleElem = document.getElementById("player-song-title");
      if (titleElem && titleElem.nextSibling) {
        songArtistContainer.insertBefore(newArtist, titleElem.nextSibling);
      } else if (songArtistContainer) {
        songArtistContainer.appendChild(newArtist);
      }
    }
  }

  // Try to get elements again if they were created
  const titleElement = document.getElementById("player-song-title");
  const artistElement = document.getElementById("player-song-artist");

  // Force display to be visible
  if (playerDisplay) {
    playerDisplay.style.display = "flex";
    playerDisplay.style.visibility = "visible";
  }

  if (!APP_STATE.currentSong) {
    console.warn("No current song in APP_STATE");
    if (titleElement) titleElement.textContent = "Select a song to play";
    if (artistElement) artistElement.textContent = "";
    return;
  }

  const currentTitle = APP_STATE.currentSong.title || "";
  const currentArtist = APP_STATE.currentSong.artist || "";

  console.log(
    `Setting player display: "${currentTitle}" by "${currentArtist}"`
  );

  // Set title and artist with direct DOM manipulation
  if (titleElement) {
    titleElement.textContent = currentTitle;
    titleElement.style.display = "block";
    titleElement.style.visibility = "visible";
    console.log("Title element updated:", titleElement.textContent);
  } else {
    console.error("Failed to update title element - not found");
  }

  if (artistElement) {
    artistElement.textContent = currentArtist;
    artistElement.style.display = "block";
    artistElement.style.visibility = "visible";
    console.log("Artist element updated:", artistElement.textContent);
  } else {
    console.error("Failed to update artist element - not found");
  }

  // Update album artwork and lyrics
  updateAlbumArtwork();
  updateLyrics();
  updateFavoriteButtonUI();

  // Ensure that the current song is highlighted in the list
  highlightCurrentSong();

  // Debug the player display
  debugPlayerDisplay();
};

const highlightCurrentSong = () => {
  // Remove highlight from all songs
  document.querySelectorAll(".playlist-song").forEach((song) => {
    song.classList.remove("currently-playing");
  });

  // Add highlight to current song if it exists
  if (APP_STATE.currentSong) {
    // Try to find the song element by ID in different song lists
    const possibleIds = [
      `song-${APP_STATE.currentSong.id}`,
      `fav-song-${APP_STATE.currentSong.id}`,
      `playlist-song-${APP_STATE.currentSong.id}`,
    ];

    let songElement = null;

    for (const id of possibleIds) {
      const element = document.getElementById(id);
      if (element) {
        songElement = element;
        break;
      }
    }

    if (songElement) {
      console.log(`Highlighting song: ${APP_STATE.currentSong.title}`);
      songElement.classList.add("currently-playing");

      // Make sure the song is visible by scrolling to it
      songElement.scrollIntoView({ behavior: "smooth", block: "nearest" });

      // Update play button to show pause icon
      const playButton = songElement.querySelector(".play-song-btn i");
      if (playButton) {
        playButton.className = "fas fa-pause";
      }
    } else {
      console.warn(
        `Could not find element for song ID: ${APP_STATE.currentSong.id}`
      );
    }
  }
};

const renderSongs = (songs, container = playlistSongs) => {
  if (!container) return;

  let songsHTML = `
    <div class="song-list-header">
      <span>Song</span>
      <span class="duration-header">Duration</span>
      <span class="actions-header">Actions</span>
    </div>
  `;

  songs.forEach((song) => {
    songsHTML += `
      <li id="song-${song.id}" class="playlist-song ${
      APP_STATE.currentSong && APP_STATE.currentSong.id === song.id
        ? "currently-playing"
        : ""
    }">
        <div class="playlist-song-info">
          <span class="playlist-song-title">${song.title}</span>
          <span class="playlist-song-artist">${song.artist}</span>
        </div>
        <div class="playlist-song-duration">${song.duration}</div>
        <button class="playlist-song-action play-song-btn" data-id="${
          song.id
        }" aria-label="Play ${song.title}">
          <i class="fas fa-play"></i>
        </button>
        <button class="playlist-song-action favorite-song-btn ${
          APP_STATE.favorites.includes(song.id) ? "favorite-active" : ""
        }" data-id="${song.id}" aria-label="${
      APP_STATE.favorites.includes(song.id)
        ? "Remove from favorites"
        : "Add to favorites"
    }">
          <i class="fas fa-heart"></i>
        </button>
        <button class="playlist-song-action add-to-playlist-btn" data-id="${
          song.id
        }" aria-label="Add ${song.title} to playlist">
          <i class="fas fa-plus"></i>
        </button>
      </li>
    `;
  });

  container.innerHTML = songsHTML;

  if (songs.length === 0) {
    container.innerHTML = `
      <div class="song-list-header">
        <span>Song</span>
        <span class="duration-header">Duration</span>
        <span class="actions-header">Actions</span>
      </div>
      <li class="empty-playlist">No songs found</li>
    `;

    if (APP_STATE.searchQuery) {
      container.innerHTML = `
        <div class="song-list-header">
          <span>Song</span>
          <span class="duration-header">Duration</span>
          <span class="actions-header">Actions</span>
        </div>
        <li class="empty-playlist">No songs found matching "${APP_STATE.searchQuery}"</li>
      `;
    }
  }

  // Add event listeners to song elements
  document.querySelectorAll(".play-song-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const songId = parseInt(button.dataset.id);
      playSong(songId);
    });
  });

  document.querySelectorAll(".favorite-song-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const songId = parseInt(button.dataset.id);

      if (APP_STATE.favorites.includes(songId)) {
        // Remove from favorites
        APP_STATE.favorites = APP_STATE.favorites.filter((id) => id !== songId);
        button.classList.remove("favorite-active");
        button.setAttribute("aria-label", "Add to favorites");
      } else {
        // Add to favorites
        APP_STATE.favorites.push(songId);
        button.classList.add("favorite-active");
        button.setAttribute("aria-label", "Remove from favorites");
      }

      // Update UI if current song
      if (APP_STATE.currentSong && APP_STATE.currentSong.id === songId) {
        updateFavoriteButtonUI();
      }

      saveToLocalStorage();
    });
  });

  document.querySelectorAll(".add-to-playlist-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      showAddToPlaylistModal(parseInt(button.dataset.id));
    });
  });

  // Make entire song row clickable to play the song
  document.querySelectorAll(".playlist-song").forEach((songElement) => {
    songElement.addEventListener("click", (e) => {
      if (e.target === songElement || e.target.closest(".playlist-song-info")) {
        const songId = parseInt(songElement.id.replace("song-", ""));
        playSong(songId);
      }
    });
  });
};

const setPlayButtonAccessibleText = () => {
  const song =
    APP_STATE.currentSong ||
    (APP_STATE.songs.length > 0 ? APP_STATE.songs[0] : null);

  if (!song) return;

  playButton.setAttribute("aria-label", `Play ${song.title} by ${song.artist}`);
};

const getCurrentSongIndex = () => {
  if (!APP_STATE.currentSong) return -1;

  return APP_STATE.songs.findIndex(
    (song) => song.id === APP_STATE.currentSong.id
  );
};

const startVisualizer = () => {
  if (!audioContext || !analyser) {
    console.warn("Cannot start visualizer - audio context not initialized");
    return;
  }

  APP_STATE.visualizerActive = true;
  if (visualizerToggle) visualizerToggle.classList.add("active");
  if (audioVisualizer) audioVisualizer.classList.add("active");

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  const canvas = audioVisualizer;

  if (!canvas) {
    console.warn("Visualizer canvas not found");
    return;
  }

  const ctx = canvas.getContext("2d");

  const renderFrame = () => {
    // Set canvas dimensions to match container
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    animationFrame = requestAnimationFrame(renderFrame);
    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const barWidth = (canvas.width / bufferLength) * 2.5;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const barHeight = (dataArray[i] / 255) * canvas.height * 0.8;

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#8a2be2"); // Purple
      gradient.addColorStop(0.5, "#4b0082"); // Indigo
      gradient.addColorStop(1, "#9370db"); // Medium Purple

      ctx.fillStyle = gradient;
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

      x += barWidth + 1;
    }
  };

  renderFrame();
};

const stopVisualizer = () => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }

  APP_STATE.visualizerActive = false;
  visualizerToggle.classList.remove("active");
  audioVisualizer.classList.remove("active");

  // Clear canvas
  const canvas = audioVisualizer;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

// Playback controls
const togglePlayPause = () => {
  if (audio.paused) {
    if (APP_STATE.currentSong === null) {
      playSong(APP_STATE.songs[0].id);
    } else {
      playSong(APP_STATE.currentSong.id);
    }
  } else {
    pauseSong();
  }
};

const toggleRepeatMode = () => {
  const modes = ["off", "one", "all"];
  const currentIndex = modes.indexOf(APP_STATE.repeatMode);
  const nextIndex = (currentIndex + 1) % modes.length;
  APP_STATE.repeatMode = modes[nextIndex];

  updateRepeatButtonUI();
  saveToLocalStorage();
};

const updateRepeatButtonUI = () => {
  // Remove all mode classes first
  repeatButton.classList.remove("repeat-off", "repeat-one", "repeat-all");

  // Add the current mode class
  repeatButton.classList.add(`repeat-${APP_STATE.repeatMode}`);

  // Update aria-label
  let ariaLabel = "Repeat: ";
  switch (APP_STATE.repeatMode) {
    case "off":
      ariaLabel += "Off";
      break;
    case "one":
      ariaLabel += "Current song";
      break;
    case "all":
      ariaLabel += "All songs";
      break;
  }
  repeatButton.setAttribute("aria-label", ariaLabel);
};

const handleRepeatMode = () => {
  if (APP_STATE.repeatMode === "one") {
    // Repeat the current song
    audio.currentTime = 0;
    playSong(APP_STATE.currentSong.id);
  } else if (APP_STATE.repeatMode === "all") {
    // If at the end of the playlist, start from beginning
    const currentSongIndex = getCurrentSongIndex();
    if (currentSongIndex === APP_STATE.songs.length - 1) {
      playSong(APP_STATE.songs[0].id);
    } else {
      playNextSong();
    }
  } else {
    // Default behavior - stop at the end of the playlist
    const currentSongIndex = getCurrentSongIndex();
    const nextSongExists = APP_STATE.songs[currentSongIndex + 1] !== undefined;

    if (nextSongExists) {
      playNextSong();
    } else {
      APP_STATE.currentSong = null;
      APP_STATE.songCurrentTime = 0;
      pauseSong();
      setPlayerDisplay();
      highlightCurrentSong();
    }
  }
};

const toggleFavorite = () => {
  if (!APP_STATE.currentSong) return;

  const songId = APP_STATE.currentSong.id;
  const isFavorite = APP_STATE.favorites.includes(songId);

  if (isFavorite) {
    // Remove from favorites
    APP_STATE.favorites = APP_STATE.favorites.filter((id) => id !== songId);
    favoriteButton.classList.remove("active");
  } else {
    // Add to favorites
    APP_STATE.favorites.push(songId);
    favoriteButton.classList.add("active");
  }

  renderFavorites();
  saveToLocalStorage();
};

const updateFavoriteButtonUI = () => {
  if (!APP_STATE.currentSong) {
    favoriteButton.classList.remove("active");
    return;
  }

  const isFavorite = APP_STATE.favorites.includes(APP_STATE.currentSong.id);
  if (isFavorite) {
    favoriteButton.classList.add("active");
  } else {
    favoriteButton.classList.remove("active");
  }
};

const setPlaybackSpeed = (speed) => {
  if (speed < 0.25 || speed > 2) return;

  APP_STATE.playbackSpeed = speed;
  audio.playbackRate = speed;
  speedValue.textContent = `${speed}x`;
};

const updateVolumeUI = () => {
  if (!volumeSlider) {
    console.warn("Volume slider element not found");
    return;
  }
  volumeSlider.value = APP_STATE.volume * 100;
};

// Progress bar functions
const updateProgressBar = () => {
  if (!audio || !audio.duration || !progress) return;

  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${percent}%`;

  // Update time displays
  if (currentTimeDisplay) {
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
  }

  if (durationDisplay) {
    durationDisplay.textContent = formatTime(audio.duration);
  }
};

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

const setProgressPosition = (e) => {
  const width = progressBar.clientWidth;
  const clickPosition = e.offsetX;
  const percent = clickPosition / width;

  if (audio.duration) {
    audio.currentTime = percent * audio.duration;
    updateProgressBar();
  }
};

// UI update functions
const updateAlbumArtwork = () => {
  const albumArtElement = document.getElementById("album-artwork");

  if (!albumArtElement) {
    console.error("Album artwork element not found");
    return;
  }

  if (!APP_STATE.currentSong) {
    albumArtElement.style.display = "none";
    return;
  }

  // Make sure album artwork is visible
  albumArtElement.style.display = "block";

  // Directly set the src attribute for the image
  albumArtElement.src = APP_STATE.currentSong.artwork;

  // Log for debugging
  console.log(`Updated album artwork: ${APP_STATE.currentSong.artwork}`);
};

const updateLyrics = () => {
  if (!lyricsContent) return;

  if (!APP_STATE.currentSong || !APP_STATE.currentSong.lyrics) {
    lyricsContent.innerHTML = '<p class="no-lyrics">No lyrics available</p>';
    return;
  }

  const lyrics = APP_STATE.currentSong.lyrics;
  const formattedLyrics = lyrics
    .split("\n")
    .map((line) => `<p>${line}</p>`)
    .join("");
  lyricsContent.innerHTML = formattedLyrics;
};

const toggleLyricsPanel = () => {
  if (!lyricsPanel) return;

  lyricsPanel.classList.toggle("active");
  updateLyrics();
};

const updatePlaylistHeader = () => {
  let headerText = "";

  switch (APP_STATE.currentView) {
    case "all-songs":
      headerText = "All Songs";
      break;
    case "favorites":
      headerText = "Favorites";
      break;
    case "custom-playlist":
      const playlist = APP_STATE.customPlaylists.find(
        (p) => p.id === APP_STATE.currentPlaylistId
      );
      headerText = playlist ? playlist.name : "Custom Playlist";
      break;
  }

  playlistHeader.textContent = headerText;
};

// Playlist Management
const renderFavorites = () => {
  if (!favoritesSongs) return;

  const favoriteSongsList = APP_STATE.favorites
    .map((id) => allSongs.find((song) => song.id === id))
    .filter(Boolean);

  let songsHTML = `
    <div class="song-list-header">
      <span>Song</span>
      <span class="duration-header">Duration</span>
      <span class="actions-header">Actions</span>
    </div>
  `;

  if (favoriteSongsList.length === 0) {
    songsHTML += `<li class="empty-playlist">No favorite songs yet. Mark songs as favorites to see them here.</li>`;
  } else {
    favoriteSongsList.forEach((song) => {
      songsHTML += `
        <li id="fav-song-${song.id}" class="playlist-song">
          <div class="playlist-song-info">
            <span class="playlist-song-title">${song.title}</span>
            <span class="playlist-song-artist">${song.artist}</span>
          </div>
          <div class="playlist-song-duration">${song.duration}</div>
          <button class="playlist-song-action play-song-btn" aria-label="Play ${song.title}">
            <i class="fas fa-play"></i>
          </button>
          <button class="playlist-song-action remove-favorite-btn" data-id="${song.id}" aria-label="Remove ${song.title} from favorites">
            <i class="fas fa-heart-broken"></i>
          </button>
          <button class="playlist-song-action add-to-playlist-btn" data-id="${song.id}" aria-label="Add ${song.title} to playlist">
            <i class="fas fa-plus"></i>
          </button>
        </li>
      `;
    });
  }

  favoritesSongs.innerHTML = songsHTML;

  // Add event listeners to favorite song buttons
  document.querySelectorAll(".remove-favorite-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const songId = parseInt(button.dataset.id);
      APP_STATE.favorites = APP_STATE.favorites.filter((id) => id !== songId);
      renderFavorites();
      updateFavoriteButtonUI();
      saveToLocalStorage();
    });
  });

  document
    .querySelectorAll("#favorites-songs .play-song-btn")
    .forEach((button) => {
      button.addEventListener("click", (e) => {
        e.stopPropagation();
        const songElement = button.closest(".playlist-song");
        const songId = parseInt(songElement.id.replace("fav-song-", ""));
        playSong(songId);
      });
    });

  document
    .querySelectorAll("#favorites-songs .add-to-playlist-btn")
    .forEach((button) => {
      button.addEventListener("click", (e) => {
        e.stopPropagation();
        showAddToPlaylistModal(parseInt(button.dataset.id));
      });
    });
};

const createCustomPlaylist = (name, description) => {
  const newPlaylist = {
    id: Date.now(),
    name,
    description,
    songs: [],
    createdAt: new Date().toISOString(),
  };

  APP_STATE.customPlaylists.push(newPlaylist);
  saveToLocalStorage();
  renderCustomPlaylists();

  return newPlaylist;
};

const renderCustomPlaylists = () => {
  if (!playlistsList) return;

  let playlistsHTML = "";

  if (APP_STATE.customPlaylists.length === 0) {
    playlistsHTML = `<li class="empty-playlist-list">No custom playlists yet. Create one to get started!</li>`;
  } else {
    APP_STATE.customPlaylists.forEach((playlist) => {
      playlistsHTML += `
        <li class="playlist-item" data-id="${playlist.id}">
          <div class="playlist-info">
            <h3 class="playlist-name">${playlist.name}</h3>
            <p class="playlist-description">${playlist.description || ""}</p>
            <span class="playlist-song-count">${
              playlist.songs.length
            } songs</span>
          </div>
          <div class="playlist-actions">
            <button class="view-playlist-btn" data-id="${
              playlist.id
            }" aria-label="View ${playlist.name}">
              <i class="fas fa-eye"></i>
            </button>
            <button class="delete-playlist-btn" data-id="${
              playlist.id
            }" aria-label="Delete ${playlist.name}">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </li>
      `;
    });
  }

  playlistsList.innerHTML = playlistsHTML;

  // Add event listeners to playlist buttons
  document.querySelectorAll(".view-playlist-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const playlistId = parseInt(button.dataset.id);
      viewCustomPlaylist(playlistId);
    });
  });

  document.querySelectorAll(".delete-playlist-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const playlistId = parseInt(button.dataset.id);
      deleteCustomPlaylist(playlistId);
    });
  });

  // Update playlist choices in add-to-playlist modal
  updatePlaylistChoices();
};

const viewCustomPlaylist = (playlistId) => {
  const playlist = APP_STATE.customPlaylists.find((p) => p.id === playlistId);
  if (!playlist) return;

  APP_STATE.currentView = "custom-playlist";
  APP_STATE.currentPlaylistId = playlistId;

  // Switch to custom playlist view
  allSongsContainer.classList.remove("active");
  favoritesContainer.classList.remove("active");
  customPlaylistsContainer.classList.remove("active");

  // Show the songs in this playlist
  const playlistSongIds = playlist.songs;
  const playlistSongsList = playlistSongIds
    .map((id) => allSongs.find((song) => song.id === id))
    .filter(Boolean);

  renderPlaylistSongs(playlistSongsList, playlist);
  updatePlaylistHeader();

  // Update tab selection
  allSongsTab.classList.remove("active");
  favoritesTab.classList.remove("active");
  customPlaylistsTab.classList.add("active");
};

const renderPlaylistSongs = (songs, playlist) => {
  let songsHTML = `
    <div class="song-list-header">
      <span>Song</span>
      <span class="duration-header">Duration</span>
      <span class="actions-header">Actions</span>
    </div>
  `;

  if (songs.length === 0) {
    songsHTML += `<li class="empty-playlist">This playlist is empty. Add some songs!</li>`;
  } else {
    songs.forEach((song) => {
      songsHTML += `
        <li id="playlist-song-${song.id}" class="playlist-song">
          <div class="playlist-song-info">
            <span class="playlist-song-title">${song.title}</span>
            <span class="playlist-song-artist">${song.artist}</span>
          </div>
          <div class="playlist-song-duration">${song.duration}</div>
          <button class="playlist-song-action play-song-btn" aria-label="Play ${
            song.title
          }">
            <i class="fas fa-play"></i>
          </button>
          <button class="playlist-song-action remove-from-playlist-btn" data-id="${
            song.id
          }" data-playlist="${playlist.id}" aria-label="Remove ${
        song.title
      } from playlist">
            <i class="fas fa-minus"></i>
          </button>
          <button class="playlist-song-action favorite-song-btn ${
            APP_STATE.favorites.includes(song.id) ? "favorite-active" : ""
          }" data-id="${song.id}" aria-label="${
        APP_STATE.favorites.includes(song.id)
          ? "Remove from favorites"
          : "Add to favorites"
      }">
            <i class="fas fa-heart"></i>
          </button>
        </li>
      `;
    });
  }

  playlistSongs.innerHTML = songsHTML;

  // Add event listeners to playlist song buttons
  document.querySelectorAll(".play-song-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const songElement = button.closest(".playlist-song");
      const songId = parseInt(songElement.id.replace("playlist-song-", ""));
      playSong(songId);
    });
  });

  document.querySelectorAll(".remove-from-playlist-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const songId = parseInt(button.dataset.id);
      const playlistId = parseInt(button.dataset.playlist);
      removeFromPlaylist(songId, playlistId);
    });
  });

  document.querySelectorAll(".favorite-song-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const songId = parseInt(button.dataset.id);

      if (APP_STATE.favorites.includes(songId)) {
        // Remove from favorites
        APP_STATE.favorites = APP_STATE.favorites.filter((id) => id !== songId);
        button.classList.remove("favorite-active");
        button.setAttribute("aria-label", "Add to favorites");
      } else {
        // Add to favorites
        APP_STATE.favorites.push(songId);
        button.classList.add("favorite-active");
        button.setAttribute("aria-label", "Remove from favorites");
      }

      saveToLocalStorage();
    });
  });
};

const addToPlaylist = (songId, playlistId) => {
  const playlist = APP_STATE.customPlaylists.find((p) => p.id === playlistId);
  if (!playlist) return;

  // Check if song is already in playlist
  if (!playlist.songs.includes(songId)) {
    playlist.songs.push(songId);
    saveToLocalStorage();

    // If currently viewing this playlist, refresh the view
    if (
      APP_STATE.currentView === "custom-playlist" &&
      APP_STATE.currentPlaylistId === playlistId
    ) {
      viewCustomPlaylist(playlistId);
    }

    renderCustomPlaylists();
  }
};

const removeFromPlaylist = (songId, playlistId) => {
  const playlist = APP_STATE.customPlaylists.find((p) => p.id === playlistId);
  if (!playlist) return;

  playlist.songs = playlist.songs.filter((id) => id !== songId);
  saveToLocalStorage();

  // Refresh the current view
  if (
    APP_STATE.currentView === "custom-playlist" &&
    APP_STATE.currentPlaylistId === playlistId
  ) {
    viewCustomPlaylist(playlistId);
  }

  renderCustomPlaylists();
};

const deleteCustomPlaylist = (playlistId) => {
  APP_STATE.customPlaylists = APP_STATE.customPlaylists.filter(
    (p) => p.id !== playlistId
  );
  saveToLocalStorage();

  // If currently viewing the deleted playlist, switch to all songs
  if (
    APP_STATE.currentView === "custom-playlist" &&
    APP_STATE.currentPlaylistId === playlistId
  ) {
    switchToAllSongs();
  }

  renderCustomPlaylists();
};

const updatePlaylistChoices = () => {
  if (!playlistChoices) return;

  let choicesHTML = "";

  if (APP_STATE.customPlaylists.length === 0) {
    choicesHTML = `<p class="no-playlists">No playlists available. Create one first!</p>`;
  } else {
    APP_STATE.customPlaylists.forEach((playlist) => {
      choicesHTML += `
        <div class="playlist-choice">
          <input type="radio" name="playlist" id="playlist-${playlist.id}" value="${playlist.id}">
          <label for="playlist-${playlist.id}">${playlist.name} (${playlist.songs.length} songs)</label>
        </div>
      `;
    });
  }

  playlistChoices.innerHTML = choicesHTML;
};

// Modal functions
const showAddToPlaylistModal = (songId) => {
  APP_STATE.songToAddId = songId;
  const song = allSongs.find((s) => s.id === songId);

  if (song) {
    addSongName.textContent = `"${song.title}" by ${song.artist}`;
    updatePlaylistChoices();
    addToPlaylistModal.classList.add("active");
  }
};

// Search functionality
const searchSongs = (query) => {
  if (!query) {
    APP_STATE.searchQuery = "";
    renderSongs(APP_STATE.songs, playlistSongs);
    return;
  }

  APP_STATE.searchQuery = query.toLowerCase();
  const filteredSongs = allSongs.filter(
    (song) =>
      song.title.toLowerCase().includes(query.toLowerCase()) ||
      song.artist.toLowerCase().includes(query.toLowerCase()) ||
      song.album.toLowerCase().includes(query.toLowerCase()) ||
      song.genre.toLowerCase().includes(query.toLowerCase())
  );

  renderSongs(filteredSongs, playlistSongs);
};

// Tab switching functions
const switchToAllSongs = () => {
  APP_STATE.currentView = "all-songs";
  APP_STATE.currentPlaylistId = null;

  allSongsContainer.classList.add("active");
  favoritesContainer.classList.remove("active");
  customPlaylistsContainer.classList.remove("active");

  allSongsTab.classList.add("active");
  favoritesTab.classList.remove("active");
  customPlaylistsTab.classList.remove("active");

  renderSongs(APP_STATE.songs, playlistSongs);
  updatePlaylistHeader();
};

const switchToFavorites = () => {
  APP_STATE.currentView = "favorites";
  APP_STATE.currentPlaylistId = null;

  allSongsContainer.classList.remove("active");
  favoritesContainer.classList.add("active");
  customPlaylistsContainer.classList.remove("active");

  allSongsTab.classList.remove("active");
  favoritesTab.classList.add("active");
  customPlaylistsTab.classList.remove("active");

  renderFavorites();
  updatePlaylistHeader();
};

const switchToCustomPlaylists = () => {
  APP_STATE.currentView = "custom-playlists";
  APP_STATE.currentPlaylistId = null;

  allSongsContainer.classList.remove("active");
  favoritesContainer.classList.remove("active");
  customPlaylistsContainer.classList.add("active");

  allSongsTab.classList.remove("active");
  favoritesTab.classList.remove("active");
  customPlaylistsTab.classList.add("active");

  renderCustomPlaylists();
  updatePlaylistHeader();
};

// Keyboard shortcuts
const setupKeyboardShortcuts = () => {
  document.addEventListener("keydown", (e) => {
    // Only handle shortcuts if not typing in an input
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
      return;
    }

    switch (e.key) {
      case " ": // Space - Play/Pause
        e.preventDefault();
        togglePlayPause();
        break;
      case "ArrowRight": // Right Arrow - Next song
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          // Skip forward 10 seconds
          audio.currentTime += 10;
        } else {
          e.preventDefault();
          playNextSong();
        }
        break;
      case "ArrowLeft": // Left Arrow - Previous song
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          // Skip backward 10 seconds
          audio.currentTime -= 10;
        } else {
          e.preventDefault();
          playPreviousSong();
        }
        break;
      case "f": // F - Toggle favorite
        e.preventDefault();
        toggleFavorite();
        break;
      case "r": // R - Toggle repeat mode
        e.preventDefault();
        toggleRepeatMode();
        break;
      case "l": // L - Toggle lyrics
        e.preventDefault();
        toggleLyricsPanel();
        break;
      case "v": // V - Toggle visualizer
        e.preventDefault();
        APP_STATE.visualizerActive ? stopVisualizer() : startVisualizer();
        break;
      case "m": // M - Mute/unmute
        e.preventDefault();
        audio.muted = !audio.muted;
        break;
      case "?": // ? - Show keyboard shortcuts
        e.preventDefault();
        keyboardShortcutsModal.classList.add("active");
        break;
    }
  });
};

// Event listeners
const setupEventListeners = () => {
  // Set up audio event listeners
  setupAudioEventListeners();

  // Player controls
  if (playButton) {
    playButton.addEventListener("click", () => {
      if (APP_STATE.currentSong === null) {
        playSong(APP_STATE.songs[0].id);
      } else {
        playSong(APP_STATE.currentSong.id);
      }
    });
  }

  if (pauseButton) {
    pauseButton.addEventListener("click", pauseSong);
  }

  if (nextButton) {
    nextButton.addEventListener("click", playNextSong);
  }

  if (previousButton) {
    previousButton.addEventListener("click", playPreviousSong);
  }

  if (shuffleButton) {
    shuffleButton.addEventListener("click", shuffle);
  }

  if (repeatButton) {
    repeatButton.addEventListener("click", toggleRepeatMode);
  }

  if (favoriteButton) {
    favoriteButton.addEventListener("click", toggleFavorite);
  }

  // Progress bar
  if (progressBar) {
    progressBar.addEventListener("click", setProgressPosition);
  }

  // Volume control
  if (volumeSlider) {
    volumeSlider.addEventListener("input", (e) => {
      const volume = e.target.value / 100;
      audio.volume = volume;
      APP_STATE.volume = volume;
      saveToLocalStorage();
    });
  }

  // Playback speed
  if (speedButton) {
    speedButton.addEventListener("click", () => {
      if (speedOptions) {
        speedOptions.classList.toggle("active");
      }
    });
  }

  document.querySelectorAll(".speed-option").forEach((option) => {
    option.addEventListener("click", () => {
      const speed = parseFloat(option.dataset.speed);
      setPlaybackSpeed(speed);
      if (speedOptions) {
        speedOptions.classList.remove("active");
      }
    });
  });

  // Visualizer toggle
  if (visualizerToggle) {
    visualizerToggle.addEventListener("click", () => {
      if (APP_STATE.visualizerActive) {
        stopVisualizer();
      } else {
        startVisualizer();
      }
    });
  }

  // Lyrics panel
  if (lyricsToggle) {
    lyricsToggle.addEventListener("click", toggleLyricsPanel);
  }

  if (closeLyrics) {
    closeLyrics.addEventListener("click", toggleLyricsPanel);
  }

  // Tab navigation
  if (allSongsTab) {
    allSongsTab.addEventListener("click", switchToAllSongs);
  }

  if (favoritesTab) {
    favoritesTab.addEventListener("click", switchToFavorites);
  }

  if (customPlaylistsTab) {
    customPlaylistsTab.addEventListener("click", switchToCustomPlaylists);
  }

  // Search functionality
  if (searchButton && searchInput) {
    searchButton.addEventListener("click", () => {
      searchSongs(searchInput.value);
    });

    searchInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        searchSongs(searchInput.value);
      }
    });
  }

  // Create playlist
  if (createPlaylistBtn) {
    createPlaylistBtn.addEventListener("click", () => {
      if (createPlaylistModal) {
        createPlaylistModal.classList.add("active");
      }
    });
  }

  if (closeCreateModal) {
    closeCreateModal.addEventListener("click", () => {
      if (createPlaylistModal) {
        createPlaylistModal.classList.remove("active");
      }
    });
  }

  if (cancelPlaylist) {
    cancelPlaylist.addEventListener("click", () => {
      if (createPlaylistModal) {
        createPlaylistModal.classList.remove("active");
      }
    });
  }

  if (createPlaylistForm) {
    createPlaylistForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (playlistNameInput && createPlaylistModal) {
        const name = playlistNameInput.value.trim();
        const description = playlistDescriptionInput
          ? playlistDescriptionInput.value.trim()
          : "";

        if (name) {
          createCustomPlaylist(name, description);
          createPlaylistModal.classList.remove("active");
          createPlaylistForm.reset();

          // Switch to custom playlists view
          switchToCustomPlaylists();
        }
      }
    });
  }

  // Add to playlist modal
  if (closeAddModal) {
    closeAddModal.addEventListener("click", () => {
      if (addToPlaylistModal) {
        addToPlaylistModal.classList.remove("active");
      }
    });
  }

  if (cancelAdd) {
    cancelAdd.addEventListener("click", () => {
      if (addToPlaylistModal) {
        addToPlaylistModal.classList.remove("active");
      }
    });
  }

  if (addToPlaylistModal) {
    const form = addToPlaylistModal.querySelector("form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const selectedPlaylist = document.querySelector(
          'input[name="playlist"]:checked'
        );
        if (selectedPlaylist && APP_STATE.songToAddId !== null) {
          const playlistId = parseInt(selectedPlaylist.value);
          addToPlaylist(APP_STATE.songToAddId, playlistId);
          addToPlaylistModal.classList.remove("active");
        }
      });
    }
  }

  // Keyboard shortcuts modal
  if (keyboardHelp) {
    keyboardHelp.addEventListener("click", () => {
      if (keyboardShortcutsModal) {
        keyboardShortcutsModal.classList.add("active");
      }
    });
  }

  if (closeShortcutsModal) {
    closeShortcutsModal.addEventListener("click", () => {
      if (keyboardShortcutsModal) {
        keyboardShortcutsModal.classList.remove("active");
      }
    });
  }
};

// Add DOM ready check to initialize player elements
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Content Loaded - Initializing Music Player");

  // First, check if player display elements exist and are set up correctly
  const checkPlayerElements = () => {
    console.log("Checking player display elements...");

    const titleElement = document.getElementById("player-song-title");
    const artistElement = document.getElementById("player-song-artist");
    const playerDisplay = document.querySelector(".player-display");
    const songArtistContainer = document.querySelector(
      ".player-display-song-artist"
    );

    // Check elements exist
    if (!titleElement) {
      console.error("Player song title element not found!");
      // Create it if missing
      if (songArtistContainer) {
        const newTitle = document.createElement("p");
        newTitle.id = "player-song-title";
        newTitle.textContent = "Select a song to play";
        songArtistContainer.prepend(newTitle);
        console.log("Created missing player-song-title element");
      }
    }

    if (!artistElement) {
      console.error("Player song artist element not found!");
      // Create it if missing
      if (songArtistContainer) {
        const newArtist = document.createElement("p");
        newArtist.id = "player-song-artist";
        newArtist.textContent = "";

        // Insert after title
        const titleElem = document.getElementById("player-song-title");
        if (titleElem && titleElem.nextSibling) {
          songArtistContainer.insertBefore(newArtist, titleElem.nextSibling);
        } else {
          songArtistContainer.appendChild(newArtist);
        }
        console.log("Created missing player-song-artist element");
      }
    }

    // Make sure player display is visible
    if (playerDisplay) {
      playerDisplay.style.display = "flex";
      console.log("Player display style set to flex");
    }

    // Double-check if elements exist now
    const titleCheck = document.getElementById("player-song-title");
    const artistCheck = document.getElementById("player-song-artist");

    console.log("Title element now exists:", !!titleCheck);
    console.log("Artist element now exists:", !!artistCheck);
  };

  // Run the check
  checkPlayerElements();

  // Add a click handler to ensure songs can be played
  document.body.addEventListener(
    "click",
    (e) => {
      // Check if a song row or play button was clicked
      const songElement = e.target.closest(".playlist-song");
      if (songElement) {
        const playButton = songElement.querySelector(".play-song-btn");
        const songId = playButton
          ? parseInt(playButton.dataset.id)
          : parseInt(
              songElement.id
                .replace("song-", "")
                .replace("fav-song-", "")
                .replace("playlist-song-", "")
            );

        if (!isNaN(songId)) {
          console.log(`Song clicked with ID: ${songId}`);
          playSong(songId);
          e.preventDefault();
          e.stopPropagation();
        }
      }
    },
    false
  );

  // Initialize app state and UI
  initializeApp();

  // Setup event listeners
  setupEventListeners();

  // Set default view
  switchToAllSongs();

  // Set initial playback speed
  setPlaybackSpeed(APP_STATE.playbackSpeed || 1);

  // Add a click handler to the document to initialize audio
  const initializeAudioOnInteraction = () => {
    console.log("User interaction detected - initializing audio");
    initAudioContext();
    document.removeEventListener("click", initializeAudioOnInteraction);
    document.removeEventListener("touchstart", initializeAudioOnInteraction);
    document.removeEventListener("keydown", initializeAudioOnInteraction);
  };

  document.addEventListener("click", initializeAudioOnInteraction);
  document.addEventListener("touchstart", initializeAudioOnInteraction);
  document.addEventListener("keydown", initializeAudioOnInteraction);

  // Log initialization complete
  console.log("Music Player initialization complete");

  // Check elements again after everything is initialized
  setTimeout(checkPlayerElements, 500);
});

// Remove old audio event listeners and update with new ones
const setupAudioEventListeners = () => {
  if (!audio) {
    console.warn("Audio element not available");
    return;
  }

  // Remove any existing event listeners first
  audio.removeEventListener("timeupdate", updateProgressBar);
  audio.removeEventListener("ended", handleRepeatMode);

  // Add event listeners
  audio.addEventListener("timeupdate", updateProgressBar);
  audio.addEventListener("ended", handleRepeatMode);

  audio.addEventListener("loadedmetadata", () => {
    updateProgressBar();
    if (durationDisplay) {
      durationDisplay.textContent = formatTime(audio.duration);
    }
  });
};

const sortSongs = () => {
  const sortedSongs = [...APP_STATE.songs].sort((a, b) => {
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1;
    }
    if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return 1;
    }
    return 0;
  });

  return sortedSongs;
};

// Function to test direct audio playback without Web Audio API
const testDirectAudio = () => {
  console.log("Testing direct audio playback...");

  // Store the current player state
  const wasPlaying = !audio.paused;
  if (wasPlaying) {
    audio.pause(); // Pause current playback to avoid conflicts
  }

  // Create a visual indicator that test is running
  const testButton = document.querySelector(".test-audio-btn");
  if (testButton) {
    // Add the testing class to style the button
    testButton.classList.add("testing");

    // Reset UI regardless of test outcome after a timeout
    const resetUI = () => {
      testButton.classList.remove("testing", "success", "error");

      // Resume previous playback if it was playing
      if (wasPlaying && APP_STATE.currentSong) {
        audio
          .play()
          .catch((err) => console.error("Could not resume playback:", err));
      }
    };

    // Create a temporary audio element (separate from the main player)
    const testAudio = new Audio();
    testAudio.src = allSongs[0].src;
    testAudio.volume = 0.5;

    // Try to play it directly
    const playPromise = testAudio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log("Direct audio test successful!");
          // Stop after 1 second
          setTimeout(() => {
            testAudio.pause();
            testAudio.src = "";

            // Show success message
            testButton.classList.remove("testing");
            testButton.classList.add("success");

            // Reset UI after a delay
            setTimeout(resetUI, 1500);
          }, 1000);
        })
        .catch((error) => {
          console.error("Direct audio test failed:", error);

          // Show failure message
          testButton.classList.remove("testing");
          testButton.classList.add("error");

          // Reset UI after a delay
          setTimeout(resetUI, 1500);
        });
    }
  }
};

// Add a button to test audio directly
const addTestAudioButton = () => {
  // Add to the extra controls for better integration
  const container = document.querySelector(".extra-controls");
  if (!container) return;

  const testButton = document.createElement("button");
  testButton.className = "control-btn test-audio-btn";
  testButton.title = "Test audio playback";
  testButton.setAttribute("aria-label", "Test audio playback");

  // Use an icon instead of text to match other controls
  const icon = document.createElement("i");
  icon.className = "fas fa-vial"; // Test tube icon
  testButton.appendChild(icon);

  testButton.addEventListener("click", (e) => {
    // Prevent event propagation to avoid UI interactions
    e.stopPropagation();
    e.preventDefault();
    testDirectAudio();
  });

  container.appendChild(testButton);
};

// Add a function to check audio sources
const checkAudioSources = () => {
  console.log("Checking audio sources...");
  allSongs.forEach((song, index) => {
    const testAudio = new Audio();
    testAudio.src = song.src;
    testAudio.addEventListener("canplaythrough", () => {
      console.log(`Song ${index}: ${song.title} - Source OK`);
    });
    testAudio.addEventListener("error", (e) => {
      console.error(`Song ${index}: ${song.title} - Source ERROR`, e);
    });
  });
};

// Add this to the test button
const enhanceTestAudioButton = () => {
  const testButton = document.querySelector(".test-audio-btn");
  if (testButton) {
    testButton.addEventListener("click", checkAudioSources);
  }
};

// Call this after adding the test button
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(enhanceTestAudioButton, 1000);
});
