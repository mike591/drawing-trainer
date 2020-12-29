import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ProvideAuth } from "hooks/useAuth";
import PageNotFoundPage from "components/PageNotFoundPage";
import { publicRoutes, privateRoutes } from "utils/routes";
import PublicRoute from "components/PublicRoute";
import PrivateRoute from "components/PrivateRoute";
import BaseLoader from "components/BaseLoader";
import { isMobile } from "react-device-detect";
import MobileNotSupportedPage from "components/MobileNotSupportedPage";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <ProvideAuth>
          <BaseLoader />
          <Switch>
            {isMobile && <Route path="*" component={MobileNotSupportedPage} />}
            {Object.values(publicRoutes).map((route) => (
              <PublicRoute
                exact={route.path === "/"}
                path={route.path}
                key={route.key}
                component={route.component}
              />
            ))}
            {Object.values(privateRoutes).map((route) => (
              <PrivateRoute
                exact={route.path === "/"}
                path={route.path}
                key={route.key}
                component={route.component}
              />
            ))}
            <Route path="*" component={PageNotFoundPage} />
          </Switch>
        </ProvideAuth>
      </BrowserRouter>
    </div>
  );
};

export default App;
