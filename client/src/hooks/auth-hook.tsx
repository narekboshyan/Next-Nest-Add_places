import { useState, useCallback, useEffect } from "react";

interface AuthContextType {
 token: string | null;
 userId: string | null;
 login: (uid: string, token: string, expirationDate: Date) => void;
 logout: () => void;
}

let logoutTimer: any;

const useAuth = (): AuthContextType => {
 const [token, setToken] = useState<string | null>(null);
 const [tokenExpirationDate, setTokenExpirationDate] = useState<Date | null>(
  null
 );
 const [userId, setUserId] = useState<string | null>(null);

 const login = useCallback(
  (uid: string, token: string, expirationDate: Date) => {
   setToken(token);
   setUserId(uid);
   setTokenExpirationDate(expirationDate);
   localStorage.setItem(
    "userData",
    JSON.stringify({
     userId: uid,
     token: token,
     expiration: expirationDate.toISOString(),
    })
   );
  },
  []
 );

 const logout = useCallback(() => {
  setToken(null);
  setTokenExpirationDate(null);
  setUserId(null);
  localStorage.removeItem("userData");
 }, []);

 useEffect(() => {
  if (token && tokenExpirationDate) {
   const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
   logoutTimer = setTimeout(logout, remainingTime);
  } else {
   clearTimeout(logoutTimer);
  }
 }, [token, logout, tokenExpirationDate]);

 useEffect(() => {
  const storedData = JSON.parse(localStorage.getItem("userData")!);
  if (
   storedData &&
   storedData.token &&
   new Date(storedData.expiration) > new Date()
  ) {
   login(storedData.userId, storedData.token, new Date(storedData.expiration));
  }
 }, [login]);

 return { token, login, logout, userId };
};

export default useAuth;
