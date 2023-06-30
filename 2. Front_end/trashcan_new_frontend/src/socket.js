import io from "socket.io-client";
import path from "path";
import { url } from "inspector";

const fs = require('fs');
const path = require('path');

const certFile = fs.readFileSync(path.join(__dirname, url('../public/certificate/certificate.pem')));
const keyFile = fs.readFileSync(path.join(__dirname, url('../public/private.key')));

const options = {
    ca: [certFile], // Array of trusted CA certificates
    cert: certFile, // Certificate file
    key: keyFile, // Key file
    rejectUnauthorized: false // Set to false to allow self-signed certificates
  };


const socket = io("https://192.168.38.30:4040",options);


export default socket;

