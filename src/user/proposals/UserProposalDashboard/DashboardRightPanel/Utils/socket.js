import io from "socket.io-client";
const socket = io("http://localhost:8810");
export default socket;
