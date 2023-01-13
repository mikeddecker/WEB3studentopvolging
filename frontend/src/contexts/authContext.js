import { createContext, useContext, useState, useEffect, useMemo } from "react";
import axios from 'axios';
import { useLocalStorage } from "../utils/useLocalStorage";
import { appUrl } from "../utils/constants";
import { useSockets } from "./socketContext";

const AuthContext = createContext({ isAuthenticated: false, isLoading: true });

export const AuthProvider = ({ children }) => {
  const [didJustLogIn, setDidJustLogIn] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage(
    "isAuthenticated",
    false
  );

  const socketContext = useSockets();
  socketContext.socket.on("studentLoggedIn", () => { setIsAuthenticated(true); setDidJustLogIn(Date.now()); console.log("in socket in auth");});
  
 
  useEffect(() => {
    const verifyToken = async () => {
      try {
        console.log(appUrl);
        const response = await axios.get(appUrl + "/students/verifytoken", {withCredentials: true});

        if (response.status === 202) {
          setIsAuthenticated(true);
          console.log("auth updated");
          if(socketContext.isConnected)
          {
            console.log("Sending 'you there!' since connected...");
            socketContext.socket.emit("helo");
          }
          else {
            console.log("Not connected");
          }
        } else {
          setIsAuthenticated(false);
        }

      } catch (error) {
        console.error(error);
        setIsAuthenticated(false);      
      }
    };
    console.log("Verifying token in authContext...");
    verifyToken();
  }, [setIsAuthenticated, isAuthenticated, didJustLogIn, socketContext.isConnected, socketContext.socket]);


  const value = useMemo(
    () => ({
      isAuthenticated
    }),
    [isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// we exporteren de custom hook:
export const useAuthContext = () => useContext(AuthContext);
