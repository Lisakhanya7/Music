'use client';

import { motion } from 'framer-motion';
import { useState, useContext } from 'react';
import { AudioContext } from '../context/AudioContext';
import { artists, Artist } from '../data/artists';

const genres = ['All', 'Battle Music', 'Lo-fi', 'Phonk'];

export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [currentVibeColor, setCurrentVibeColor] = useState('#1f2937'); // default gray
  const audioContext = useContext(AudioContext);

  const filteredArtists = selectedGenre === 'All' ? artists : artists.filter(a => a.genre === selectedGenre);

  const handleArtistClick = (artist: Artist) => {
    setCurrentVibeColor(artist.vibeColor);
    audioContext?.playTrack(artist.audioStreamUrl);
  };

  return (
    <div className="min-h-screen text-white p-8 transition-colors duration-500" style={{ backgroundColor: currentVibeColor }}>
      <h1 className="text-4xl font-bold mb-8 text-center">Roster Discovery</h1>
      <div className="flex justify-center mb-8 flex-wrap">
        {genres.map(genre => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-4 py-2 mx-2 mb-2 rounded ${selectedGenre === genre ? 'bg-blue-500' : 'bg-gray-700'}`}
          >
            {genre}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {filteredArtists.map((artist: Artist) => (
          <motion.div
            key={artist.name}
            className="bg-gray-800 p-4 rounded-lg cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onMouseEnter={() => audioContext?.previewTrack(artist.audioStreamUrl)}
            onClick={() => handleArtistClick(artist)}
          >
            <img src={artist.animeAvatar} alt={artist.name} className="w-full h-64 object-cover rounded" />
            <h2 className="text-xl font-semibold mt-4">{artist.name}</h2>
            <p className="text-gray-400">{artist.genre}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
