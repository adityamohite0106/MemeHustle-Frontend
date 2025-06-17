
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define BASE_URL with a fallback
const BASE_URL = process.env.REACT_APP_API_URL || 'https://memehustle-backend-8kap.onrender.com';

// console.log('Leaderboard API base URL:', BASE_URL);

export default function Leaderboard() {
  const [memes, setMemes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/memes`);
        const sortedMemes = res.data.sort((a, b) => (b.voteCount || 0) - (a.voteCount || 0));
        setMemes(sortedMemes);
      } catch (error) {
        // console.error('Error fetching memes for leaderboard:', error.message);
        setError('Failed to load leaderboard. Please try again.');
      }
    };

    fetchMemes();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">🔥 Trending Memes Leaderboard</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {memes.map((meme, index) => (
        <div
          key={meme._id}
          className="flex items-center justify-between bg-white shadow-sm rounded-md px-4 py-3 mb-3 border border-gray-200"
        >
          <div className="flex items-center space-x-4">
            <span className="text-xl font-bold text-gray-800">{index + 1}.</span>
            <img src={meme.imageUrl} alt={meme.title} className="w-12 h-12 object-cover rounded" />
            <div>
              <h2 className="text-lg font-semibold text-gray-700">{meme.title}</h2>
              <p className="text-sm text-gray-500">{(meme.tags || []).join(', ')}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-green-600">{meme.voteCount || 0} votes</span>
          </div>
        </div>
      ))}
    </div>
  );
}
