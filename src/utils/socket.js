import { io } from 'socket.io-client';

const BASE_URL = process.env.REACT_APP_API_URL || 'https://memehustle-backend-8kap.onrender.com';
console.log('Socket connecting to:', BASE_URL);

export const socket = io(BASE_URL, {
  transports: ['websocket'],
  path: '/socket.io',
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

socket.on('connect_error', (err) => {
  console.error('Socket connection failed:', err);
});