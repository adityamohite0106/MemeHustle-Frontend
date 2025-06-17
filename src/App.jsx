import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MemeList from './pages/MemeList';
import MemeForm from './pages/MemeForm';
import BiddingPage from './pages/BiddingPage';
import VotingPage from './pages/VotingPage';
import CaptionPage from './pages/CaptionPage';
import { socket } from './utils/socket';
import API from './utils/api'; // ✅ Updated import

function App() {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    // ✅ Fetch memes using .env baseURL
    API.get('/memes')
      .then((r) => setMemes(r.data))
      .catch((err) => console.error("❌ Failed to load memes:", err));

    // ✅ Socket listeners
    socket.on('new-meme', (m) => setMemes((prev) => [m, ...prev]));
    socket.on('newBid', (bid) => {
      setMemes((prev) =>
        prev.map((meme) =>
          meme._id === bid.memeId ? { ...meme, currentBid: bid.amount } : meme
        )
      );
    });

    socket.on('new-vote', (vote) => {
      setMemes((prev) =>
        prev.map((meme) =>
          meme._id === vote.memeId ? { ...meme, votes: vote.votes } : meme
        )
      );
    });

    socket.on('new-caption', (cap) => {
      setMemes((prev) =>
        prev.map((meme) =>
          meme._id === cap.memeId ? { ...meme, caption: cap.caption } : meme
        )
      );
    });

    return () => {
      socket.off();
    };
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MemeList memes={memes} />} />
        <Route path="/submit" element={<MemeForm onNew={(m) => setMemes((prev) => [m, ...prev])} />} />
        <Route path="/bid/:id" element={<BiddingPage />} />
        <Route path="/vote/:id" element={<VotingPage />} />
        <Route path="/caption/:id" element={<CaptionPage />} />
      </Routes>
    </>
  );
}

export default App;

// Aditya Mohite
