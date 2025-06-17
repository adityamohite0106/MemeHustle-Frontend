import React, { useState, useEffect } from "react";
import { socket } from "./utils/socket";
import axios from "axios";
import MemeForm from "./components/MemeForm";
import MemeCard from "./components/MemeCard";
import "./pages/MainLayout.css";
function App() {
  const [memes, setMemes] = useState([]);

  const API_BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/memes`)
      .then((r) => setMemes(r.data))
      .catch((err) => console.error("Failed to fetch memes:", err));

    socket.on("new-meme", (m) => setMemes((prev) => [m, ...prev]));
    socket.on("newBid", (bid) => {
      // TODO: Handle bid update
    });
    socket.on("new-vote", (vote) => {
      // TODO: Handle vote update
    });
    socket.on("new-caption", (cap) => {
      // TODO: Handle caption/vibe update
    });

    return () => {
      socket.off("new-meme");
      socket.off("newBid");
      socket.off("new-vote");
      socket.off("new-caption");
    };
  }, []);

  return (
    <div className="main-wrapper">
      <h1 className="main-title" id="#Top">
        ⚡ MemeHustle
      </h1>
      <MemeForm onNew={(m) => setMemes((ps) => [m, ...ps])} />
      <div className="meme-grid">
        {memes.map((m) => (
          <MemeCard key={m._id} meme={m} />
        ))}
      </div>

      <div className="top">
        <a href="#Top">^</a>
      </div>
    </div>
  );
}

export default App;
