import io from 'socket.io-client'
const socket = io(`${process.env.REACT_APP_API_ENDPOINT}:8810`)
export default socket;
