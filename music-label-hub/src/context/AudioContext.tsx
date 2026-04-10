import { createContext, useState } from 'react';
import { Howl } from 'howler';

export const AudioContext = createContext<{ playTrack: (url: string) => void; previewTrack: (url: string) => void } | null>(null);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [player, setPlayer] = useState<Howl | null>(null);

  const playTrack = (url: string) => {
    if (player) player.stop(); // Stop previous artist's track
    const newSound = new Howl({
      src: [url],
      html5: true, // Required for high-res 2026 audio streaming
      volume: 0.7,
    });
    newSound.play();
    setPlayer(newSound);
  };

  const previewTrack = (url: string) => {
    if (player) player.stop();
    const newSound = new Howl({
      src: [url],
      html5: true,
      volume: 0.2,
    });
    newSound.play();
    setPlayer(newSound);
  };

  return (
    <AudioContext.Provider value={{ playTrack, previewTrack }}>
      {children}
    </AudioContext.Provider>
  );
};