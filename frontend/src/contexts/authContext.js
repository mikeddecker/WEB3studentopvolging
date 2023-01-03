import { createContext, useContext, useEffect, useMemo } from "react";
import axios from 'axios';
import { useLocalStorage } from "../utils/useLocalStorage";
import { appUrl } from "../utils/constants";
import { useSockets } from "./socketContext";

const AuthContext = createContext({ isAuthenticated: false, isLoading: true });

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage(
    "isAuthenticated",
    false
  );

  const socketContext = useSockets();
 
  useEffect(() => {
    const verifyToken = async () => {
      try {
        console.log("appurl : " + appUrl);
        const response = await axios.get(appUrl + "/students/verifytoken", {withCredentials: true});

        if (response.status === 202) {
          setIsAuthenticated(true);

          if(socketContext.isConnected)
          {
            console.log("Sending since connected...");
            socketContext.socket.emit("helo", "you there!");
          }
          else {
            console.log("Not connected");
          }
        } else if (response.status === 200){
          // No cookies on this site yet
          console.log("you have no cookies on this site yet");
        }

      } catch (error) {
        console.error(error);
        setIsAuthenticated(false);      
      }
    };
    console.log("Verifying token in authContext...");
    verifyToken();
  }, [setIsAuthenticated, socketContext.isConnected, socketContext.socket]);


  const value = useMemo(
    () => ({
      isAuthenticated,
    }),
    [isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// we exporteren de custom hook:
export const useAuthContext = () => useContext(AuthContext);
