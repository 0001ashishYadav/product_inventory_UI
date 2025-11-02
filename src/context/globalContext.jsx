import { createContext } from "react";
import { getCookie } from "../utils/cookies";
import { useState, useContext, useEffect } from "react";

const GlobalContext = createContext({});

export const GlobalContextProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);

  const [isLogin, setIsLogin] = useState(() => {
    const access_token = getCookie("token");

    if (access_token === null || access_token.length <= 0) {
      return false;
    }

    return true;
  });

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
  };
  return (
    <GlobalContext.Provider value={value}>
      <div>{children}</div>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
