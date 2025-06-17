import { io } from "socket.io-client";

const BASE_URL = process.env.REACT_APP_API_URL;
console.log("Socket connecting to:", BASE_URL);

export const socket = io(BASE_URL, {
  transports: ["websocket"], // optional: improves stability
});
