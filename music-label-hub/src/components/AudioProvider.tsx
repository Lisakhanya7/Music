'use client';

import { AudioProvider } from '../context/AudioContext';

export default function ClientAudioProvider({ children }: { children: React.ReactNode }) {
  return <AudioProvider>{children}</AudioProvider>;
}