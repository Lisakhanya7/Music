export default function Download() {
  // In real app, fetch approved songs from database
  const songs = [
    { title: 'Sample Track 1', url: '/uploads/sample1.mp3' },
    { title: 'Sample Track 2', url: '/uploads/sample2.mp3' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Download Music</h1>
      <div className="max-w-2xl mx-auto">
        {songs.map((song, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg mb-4 flex justify-between items-center">
            <span>{song.title}</span>
            <a
              href={song.url}
              download
              className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
            >
              Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}