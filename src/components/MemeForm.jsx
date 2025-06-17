
import React, { useState } from 'react';
import axios from 'axios';
import '../pages/MemeForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

// Define BASE_URL with a fallback
const BASE_URL = process.env.REACT_APP_API_URL || 'https://memehustle-backend-8kap.onrender.com';

console.log('MemeForm API base URL:', BASE_URL); // Debug log

export default function MemeForm({ onNew }) {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState(null);

async function submit(e) {
  e.preventDefault();
  setError(null);
  console.log('Submitting to:', `${BASE_URL}/memes`);
  try {
    const res = await axios.post(`${BASE_URL}/memes`, {
      title,
      imageUrl,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Meme submission successful:', res.data);

    setTitle('');
    setImageUrl('');
    setTags('');

    // ✅ Let socket.io handle the update; don't add meme manually
    // if (onNew) onNew(res.data);

  } catch (err) {
    console.error('Submission failed:', err.message);
    setError('Failed to submit meme. Please try again.');
  }
}


  return (
    <div className="meme-form-container">
      <h2 className="meme-form-title">
        <FontAwesomeIcon icon={faImage} className="text-pink-500" /> Post a New Meme
      </h2>
      <form onSubmit={submit} className="meme-form">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Meme Title"
          className="meme-input"
          required
        />
        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image URL"
          className="meme-input"
          type="url"
          required
          pattern="https?://.*\.(jpg|jpeg|png|gif|webp)(\?.*)?$"

          title="Please enter a valid image URL starting with http:// or https://"
        />
        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (e.g., funny, cat, 2025)"
          className="meme-input"
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="meme-submit-button">
          <FontAwesomeIcon icon={faCloudUploadAlt} /> Upload Meme
        </button>
      </form>
    </div>
  );
}


// Aditya Mohite