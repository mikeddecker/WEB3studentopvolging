import React, {
  useContext,
  useEffect,
  createContext,
  useState,
  useRef,
} from "react";
import io from "socket.io-client";

import { appUrl } from "../utils/constants";


// Gebruik maken van createContext en useContext 
// ... om vervolgens een custom hook te maken die toelaat de socket in elke component te gebruiken via een Provider
const SocketContext = createContext({ socket: null, isConnected: false });

export const SocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);

  // useRef: refereert een variabele die niet nodig is bij het renderen
  const socket = useRef(io(appUrl)); // zelfde poort als je node server toepassing

  // Listeners koppelen
  useEffect(() => {
    const currentSocket = socket.current;

    currentSocket.on("connect", () => {
      console.log("SocketIO: Connected");
      setIsConnected(true);
    });

    currentSocket.on("disconnect", () => {
      console.log("SocketIO: Disconnected");
      setIsConnected(false);
    });

    currentSocket.on("error", (msg) => {
      console.log("SocketIO: Error: ", msg);
    });

    // Cleanup van de socket events en afsluiten van de connectie
    return () => {
      if (currentSocket) {
        currentSocket.removeAllListeners();
        currentSocket.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{ socket: socket.current, isConnected: isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

// we exporteren de custom hook:
export const useSockets = () => useContext(SocketContext);
