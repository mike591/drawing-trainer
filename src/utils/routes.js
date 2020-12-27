import LoginPage from "components/LoginPage";
import LogoutPage from "components/LogoutPage";
import DrawingPage from "components/DrawingPage";
import HomePage from "components/HomePage";
import LibraryPage from "components/LibraryPage";
import SharePage from "components/SharePage";
import AIGuessPage from "components/AIGuessPage";

export const publicRoutes = {
  login: {
    key: "login",
    label: "Login Page",
    path: "/",
    component: LoginPage,
  },
  logout: {
    key: "logout",
    label: "Exit",
    path: "/logout",
    component: LogoutPage,
  },
  share: {
    key: "share",
    label: "Share",
    path: "/share",
    component: SharePage,
  },
};

export const privateRoutes = {
  home: {
    key: "home",
    label: "Home Page",
    path: "/home",
    component: HomePage,
  },
  draw: {
    key: "draw",
    label: "Draw",
    path: "/draw",
    component: DrawingPage,
  },
  library: {
    key: "library",
    label: "Library",
    path: "/library",
    component: LibraryPage,
  },
  aIGuess: {
    key: "aIGuess",
    label: "AI Guess",
    path: "/guess",
    component: AIGuessPage,
  },
};
