import React from "react";
import { Route, Switch } from "react-router-dom";

import * as routes from "./constants/routes";

import Home from "./pages/Home";
import Episode from "./pages/Episode";
import Character from "./pages/Character";
import Location from "./pages/Location";

function App() {
  return (
    <Switch>
      <Route
        path={`${routes.EPISODE}/:episodeId`}
        render={(routeProps) => <Episode {...routeProps} />}
      />
      <Route
        path={`${routes.CHARACTER}/:characterId`}
        render={(routeProps) => <Character {...routeProps} />}
      />
      <Route
        path={`${routes.LOCATION}/:locationId`}
        render={(routeProps) => <Location {...routeProps} />}
      />
      <Route
        path={routes.HOME}
        exact
        render={(routeProps) => <Home {...routeProps} />}
      />
    </Switch>
  );
}

export default App;
