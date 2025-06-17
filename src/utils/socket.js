import { io } from 'socket.io-client';
const BASE_URL = process.env.REACT_APP_API_URL || 'https://memehustle-backend-8kap.onrender.com'; // Fallback
console.log("Socket connecting to:", BASE_URL);
export const socket = io(BASE_URL, {
  transports: ['websocket'],
  path: '/socket.io', // Explicitly set path
});