import io from "socket.io-client";

// const options = {
//     //ca: [certFile], // Array of trusted CA certificates
//     //cert: certFile, // Certificate file
//     //key: keyFile, // Key file
//     rejectUnauthorized: false // Set to false to allow self-signed certificates
//   };

//const socket = io.connect("http://10.100.3.251:4040");
// const socket = io.connect("http://192.168.74.30:4040");
const socket = io.connect("http://192.168.74.156:4040");
//const socket = io.connect("http://localhost:4040");

export default socket;

