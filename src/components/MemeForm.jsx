import React, { useState } from 'react';
import axios from 'axios';
import '../pages/MemeForm.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

export default function MemeForm({ onNew }) {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState('');

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/memes', {
        title,
        imageUrl,
        tags: tags.split(',').map(tag => tag.trim()),
      });

      setTitle('');
      setImageUrl('');
      setTags('');
    } catch (err) {
      console.error("Submission failed:", err);
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
        <button type="submit" className="meme-submit-button">
          <FontAwesomeIcon icon={faCloudUploadAlt} /> Upload Meme
        </button>
      </form>
    </div>
  );
}
