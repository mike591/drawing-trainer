import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ProvideAuth } from "hooks/useAuth";
import PageNotFoundPage from "components/PageNotFoundPage";
import { publicRoutes, privateRoutes } from "utils/routes";
import PublicRoute from "components/PublicRoute";
import PrivateRoute from "components/PrivateRoute";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <ProvideAuth>
          <Switch>
            {publicRoutes.map((route) => (
              <PublicRoute
                exact={route.path === "/"}
                path={route.path}
                key={route.path}
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
