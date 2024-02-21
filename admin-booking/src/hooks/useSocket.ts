import { useEffect } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:8000");
const useSocket = () => {
  return socket;
};

export default useSocket;
