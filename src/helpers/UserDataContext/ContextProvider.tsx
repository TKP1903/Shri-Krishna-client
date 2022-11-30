import { useSnackbar } from "notistack";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import { LoginResponse, token } from "../../types";
import { isAvailableStorage } from "../../utils/browser";

import { refreshTokens } from "../../utils/api/auth";
import axios from "axios";

type User = LoginResponse["user"] | null;
type Tokens = LoginResponse["tokens"] | null;
export const UserContext = createContext<{
  user: User;
  tokens: Tokens;
  rememberMe?: boolean;
  setUser: (user: User) => void;
  setTokens: (tokens: Tokens) => void;
  setRememberMe: (rememberMe: boolean) => void;
  storage?: () => any;
  setStorage?: (storage: any) => void;
}>({
  user: null,
  tokens: null,
  setUser: (user: User) => {},
  setTokens: (tokens: Tokens) => {},
  setRememberMe: (rememberMe: boolean) => {},
});

export const useUserContext = () => {
  return useContext(UserContext);
};

const isUsingLocal = () =>
  isAvailableStorage("local") && !!localStorage.user && !!localStorage.tokens;

const RefreshTokens = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { tokens, setTokens } = useUserContext();
  const now = new Date().getTime();
  const expires = new Date(tokens?.access.expires || "").getTime();

  const [isExpired, setIsExpired] = useState(now > expires);
  const triesRef = useRef(0);
  if (triesRef.current > 3) {
    alert("Your session has expired. Please login again");
    return <></>;
  }
  useEffect(() => {
    // Abort controller
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    const refresh = async (tokens: { access?: token; refresh: token }) => {
      try {
        const data = await refreshTokens(
          !!tokens && tokens.refresh.token,
          source
        );
        if (!!data) {
          setTokens(data);
          setIsExpired(false);
        }
      } catch (err) {
        triesRef.current++;
        enqueueSnackbar("Your session has expired. Please login again", {
          variant: "error",
        });
        console.log(err);
      }
    };
    if (isExpired && !!tokens) {
      refresh(tokens);
    }
    return () => {
      source.cancel();
    };
  }, [isExpired]);
  useEffect(() => {
    triesRef.current = 0;
    let interval: ReturnType<typeof setInterval>;
    if (!!tokens) {
      const THIRTY_MINUTES = 30 * 60 * 1000;
      interval = setInterval(() => {
        const now = new Date().getTime();
        const expires = new Date(tokens.access.expires).getTime();
        
        if (now > expires - THIRTY_MINUTES / 2) {
          setIsExpired(true);
        }
      }, THIRTY_MINUTES / 2);
    }
    return () => clearInterval(interval);
  }, []);
  return <></>;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const renderCountRef = useRef(0);
  const { current: renderCount } = renderCountRef;
  ++renderCountRef.current;
  const [rememberMe, setRememberMe] = useState<boolean>(isUsingLocal());

  const [storage, setStorage] = useState<any>(
    rememberMe ? localStorage : sessionStorage
  );

  const [user, _setUser] = useState<User>(JSON.parse(storage?.user || "null"));
  const [userSetCount, setUserSetCount] = useState(0);
  const setUser = (user: User) => {
    setUserSetCount((_) => _ + 1);
    _setUser(user);
  };

  const [tokens, _setTokens] = useState<Tokens>(
    JSON.parse(storage?.tokens || "null")
  );
  const [tokensSetCount, setTokensSetCount] = useState(0);
  const setTokens = (tokens: Tokens) => {
    setTokensSetCount((_) => _ + 1);
    _setTokens(tokens);
  };

  const ReturnComp = () => (
    <UserContext.Provider
      value={{ user, tokens, setUser, setTokens, setRememberMe, rememberMe }}
    >
      <RefreshTokens />
      {children}
    </UserContext.Provider>
  );

  useEffect(() => {
    if (!!user) {
      const pathname = window.location.pathname;
      // debugger;
      if (["/login", "/register", "/"].includes(pathname.toLowerCase())) {
        if (user.role === "admin") {
          navigate("/admin-panel");
        }
        if (user.role === "user") {
          navigate("/user-panel");
        }
      }
    }
  }, []);

  useEffect(() => {
    if (renderCount === 1) return;
    if (rememberMe) {
      setStorage(localStorage);
    } else {
      setStorage(sessionStorage);
    }
  }, [rememberMe]);

  useEffect(() => {
    if (renderCount === 1) return;
    if (userSetCount <= 0) return;
    if (user) {
      storage.setItem("user", JSON.stringify(user));
    }
  }, [userSetCount, storage]);

  useEffect(() => {
    if (renderCount === 1) return;
    if (tokensSetCount <= 0) return;
    if (tokens) {
      storage.setItem("tokens", JSON.stringify(tokens));
    }
  }, [tokensSetCount, storage]);

  return <ReturnComp />;
};
