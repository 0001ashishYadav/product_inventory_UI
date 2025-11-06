import { createContext } from "react";
import { getCookie } from "../utils/cookies";
import { useState, useContext, useEffect } from "react";

const GlobalContext = createContext({});

export const GlobalContextProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [isSmallDevice, setIsSmallDevice] = useState(false);

  const [isLogin, setIsLogin] = useState(() => {
    const access_token = getCookie("token");

    if (access_token === null || access_token.length <= 0) {
      return false;
    }

    return true;
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSmallDevice(false);
      } else {
        setIsSmallDevice(true);
      }
    };

    // Run on initial render
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const checkLogin = () => {
      const accessToken = getCookie("token");

      if (accessToken || accessToken !== null) {
        return;
      }

      setIsLogin(false);
    };

    const loginInterval = setInterval(checkLogin, 1000);

    return () => clearInterval(loginInterval);
  }, [isLogin]);

  const value = {
    isLogin,
    setIsLogin,
    userProfile,
    setUserProfile,
    isSmallDevice,
    setIsSmallDevice,
  };
  return (
    <GlobalContext.Provider value={value}>
      <div>{children}</div>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
