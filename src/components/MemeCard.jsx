import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../pages/MemeCard.css';

import { socket } from '../utils/socket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faThumbsDown, faCoins } from '@fortawesome/free-solid-svg-icons';

export default function MemeCard({ meme }) {
  const [voteCount, setVoteCount] = useState(meme.voteCount || 0);
  const [bid, setBid] = useState('');

  useEffect(() => {
    const handleNewVote = (v) => {
      if (v.memeId === meme._id) {
        setVoteCount(prev =>
          v.voteType === 'upvote' ? prev + 1 : prev - 1
        );
      }
    };

    socket.on('new-vote', handleNewVote);
    return () => socket.off('new-vote', handleNewVote);
  }, [meme._id]);

  const castVote = async (type) => {
    try {
      const res = await axios.post('http://localhost:3001/vote', {
        memeId: meme._id,
        voteType: type,
        user: 'anon'
      });
      console.log("Vote response:", res.data);

      if (res.data.updatedVoteCount !== undefined) {
        setVoteCount(res.data.updatedVoteCount);
      }
    } catch (err) {
      console.error("Vote failed:", err);
    }
  };

  const placeBid = async () => {
    try {
      const res = await axios.post('http://localhost:3001/bids', {
        memeId: meme._id,
        user: 'anon',
        amount: Number(bid)
      });
      console.log("Bid placed:", res.data);
      setBid('');
    } catch (err) {
      console.error("Bid failed:", err);
    }
  };

  return (
    <div className="meme-card">
  <img src={meme.imageUrl} alt={meme.title} className="meme-image" />
  

  <div className="meme-content">
    <h2 className="meme-title">{meme.title}</h2>
    <p className="meme-tags">
      {(meme.tags || []).map(tag => (
        <span key={tag}>#{tag}</span>
      ))}
    </p>

    {meme.caption && <div className="caption">🧠 <strong>Caption:</strong> {meme.caption}</div>}
    {meme.vibe && <div className="vibe">🎵 <strong>Vibe:</strong> {meme.vibe}</div>}

    <div className="vote-section">
      <div className="vote-buttons">
        <button onClick={() => castVote('upvote')}>
          <FontAwesomeIcon icon={faHeart} size="lg" />
        </button>
        <button onClick={() => castVote('downvote')}>
          <FontAwesomeIcon icon={faThumbsDown} size="lg" />
        </button>
      </div>
      <span className="vote-count">{voteCount} {voteCount === 1 ? 'vote' : 'votes'}</span>
    </div>

    <div className="bid-section">
      <input
        type="number"
        value={bid}
        onChange={(e) => setBid(e.target.value)}
        placeholder="Place your bid"
        className="bid-input"
      />
      <button onClick={placeBid} className="bid-button">
        <FontAwesomeIcon icon={faCoins} />
        <span>Bid</span>
      </button>
    </div>
  </div>
</div>

  );
}
