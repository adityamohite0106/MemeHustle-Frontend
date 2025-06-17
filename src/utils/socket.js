// src/utils/socket.js
import { io } from "socket.io-client";

const BASE_URL = process.env.REACT_APP_API_URL; // from .env file
console.log("Socket connecting to:", BASE_URL);

export const socket = io(BASE_URL);
