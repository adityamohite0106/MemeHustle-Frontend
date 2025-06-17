import React, { useState } from 'react';
import axios from 'axios';
import '../pages/MemeForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

// Define BASE_URL with a fallback to the backend URL
const BASE_URL = process.env.REACT_APP_API_URL || 'https://memehustle-backend-8kap.onrender.com';

console.log('API base URL:', BASE_URL); // Debug log

export default function MemeForm({ onNew }) {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState(null); // Added for error feedback

  async function submit(e) {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      const res = await axios.post(`${BASE_URL}/memes`, {
        title,
        imageUrl,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag), // Filter out empty tags
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Meme submission successful:', res.data);

      // Clear form fields
      setTitle('');
      setImageUrl('');
      setTags('');

      if (onNew) onNew(res.data); // Optional callback after success
    } catch (err) {
      console.error('Submission failed:', err);
      setError('Failed to submit meme. Please check the URL or try again.'); // User feedback
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
          pattern="https?://.+"
          title="Please enter a valid image URL starting with http:// or https://"
        />
        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (e.g., funny, cat, 2025)"
          className="meme-input"
          required
        />
        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>} {/* Display error */}
        <button type="submit" className="meme-submit-button">
          <FontAwesomeIcon icon={faCloudUploadAlt} /> Upload Meme
        </button>
      </form>
    </div>
  );
}
