import React, { useState, useEffect } from 'react';
import { socket } from './utils/socket';
import axios from 'axios';
import MemeForm from './components/MemeForm';
import MemeCard from './components/MemeCard';
import "./pages/MainLayout.css"
function App() {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/memes')
      .then(r => setMemes(r.data));

    socket.on('new-meme', (m) => setMemes(prev => [m, ...prev]));
    socket.on('newBid', bid => { /* handle bid update */ });
    socket.on('new-vote', vote => { /* handle vote update */ });
    socket.on('new-caption', cap => { /* handle caption/vibe update */ });

    return () => socket.off();
  }, []);

  return (
    
<div className="main-wrapper">
  <h1 className="main-title" id='#Top'>⚡ MemeHustle</h1>
  <MemeForm onNew={m => setMemes(ps => [m, ...ps])} />
  <div className="meme-grid">
    {memes.map(m => <MemeCard key={m._id} meme={m} />)}
  </div>

<div className='top'><a href="#Top">^</a></div>

</div>

  );
}

export default App;
