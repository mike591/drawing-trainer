import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useRef,
} from "react";
import firebase from "firebase/app";
import "firebase/auth";

const authContext = createContext();

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {
  const [user, setUser] = useState();
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const refContainer = useRef();

  const handleSetLoading = (isLoading) => {
    if (!isLoading) {
      window.clearTimeout(refContainer.current);
      refContainer.current = window.setTimeout(() => {
        setIsLoadingAuth(isLoading);
      }, 1000);
    } else {
      setIsLoadingAuth(isLoading);
    }
  };

  const handleLogin = async () => {
    handleSetLoading(true);
    const provider = new firebase.auth.GoogleAuthProvider();
    const response = await firebase.auth().signInWithPopup(provider);
    handleSetLoading(false);
    setUser(response.user);
  };

  const handleLogout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });
  };

  useEffect(() => {
    handleSetLoading(true);
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
      handleSetLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return {
    user,
    isLoadingAuth,
    handleLogin,
    handleLogout,
  };
};
