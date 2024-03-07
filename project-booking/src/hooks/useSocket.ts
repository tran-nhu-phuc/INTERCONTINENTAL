import { useEffect } from "react";
import { io } from "socket.io-client";
const socket = io("https://project-module-2.onrender.com");
const useSocket = () => {
  useEffect(() => {}, []);
  return socket;
};

export default useSocket;
