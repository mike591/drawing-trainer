import LoginPage from "components/LoginPage";
import LogoutPage from "components/LogoutPage";
import DrawingPage from "components/DrawingPage";
import HomePage from "components/HomePage";
import LibraryPage from "components/LibraryPage";
import SharePage from "components/SharePage";

export const publicRoutes = [
  {
    label: "Login Page",
    path: "/",
    component: LoginPage,
  },
  {
    label: "Exit",
    path: "/logout",
    component: LogoutPage,
  },
  {
    label: "Share",
    path: "/share",
    component: SharePage,
  },
];

export const privateRoutes = [
  {
    label: "Home Page",
    path: "/home",
    component: HomePage,
  },
  {
    label: "Draw",
    path: "/draw",
    component: DrawingPage,
  },
  {
    label: "Library",
    path: "/library",
    component: LibraryPage,
  },
];
