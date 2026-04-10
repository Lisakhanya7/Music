export interface Artist {
  name: string;
  animeAvatar: string;
  vibeColor: string;
  audioStreamUrl: string;
  genre: string;
}

export const artists: Artist[] = [
  {
    name: "Cyber Punk Fighter",
    animeAvatar: "https://via.placeholder.com/300x400?text=Anime+Avatar+1",
    vibeColor: "#ff006e",
    audioStreamUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // placeholder
    genre: "Battle Music"
  },
  {
    name: "Lo-fi Dreamer",
    animeAvatar: "https://via.placeholder.com/300x400?text=Anime+Avatar+2",
    vibeColor: "#00d4ff",
    audioStreamUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // placeholder
    genre: "Lo-fi"
  },
  {
    name: "Phonk Master",
    animeAvatar: "https://via.placeholder.com/300x400?text=Anime+Avatar+3",
    vibeColor: "#ffea00",
    audioStreamUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // placeholder
    genre: "Phonk"
  },
  // Add more artists as needed
];