import { create } from "zustand";
import musicLists from "../data/musicLists";

export const useMusicStore = create((set, get) => ({
  isPlaying: false,
  currentSongIndex: 0,
  audio: null,
  currentTime: 0,
  duration: 0,

  // Initialize the audio element
  initAudio: (audioElement) => {
    set({ audio: audioElement });

    // Update duration when metadata is loaded
    audioElement.addEventListener("loadedmetadata", () => {
      set({ duration: audioElement.duration });
    });

    // Update current time as the song plays
    audioElement.addEventListener("timeupdate", () => {
      set({ currentTime: audioElement.currentTime });
    });
  },

  // Play , Pause the current song
  toggleSong: () => {
    const { audio, isPlaying } = get();
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      set({ isPlaying: !isPlaying });
    }
  },

  // Next song
  nextSong: () => {
    const { audio, currentSongIndex } = get();
    const nextIndex = (currentSongIndex + 1) % musicLists.length;
    if (audio) {
      audio.src = musicLists[nextIndex].src; // Change song source
      audio.play();
    }
    set({ currentSongIndex: nextIndex, isPlaying: true });
  },

  // Previous song
  prevSong: () => {
    const { audio, currentSongIndex } = get();
    const prevIndex =
      currentSongIndex === 0 ? musicLists.length - 1 : currentSongIndex - 1;
    if (audio) {
      audio.src = musicLists[prevIndex].src; // Change song source
      audio.play();
    }
    set({ currentSongIndex: prevIndex, isPlaying: true });
  },

  // Update the current time based on progress bar dragging
  setCurrentTime: (time) => {
    const { audio } = get();
    if (audio) {
      audio.currentTime = time; // Set the audio current time
      set({ currentTime: time }); // Update Zustand state
    }
  },

  musicLists,
}));

export default useMusicStore;
