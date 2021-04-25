import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { India } from "./scenes";

export function Router(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/india">
          <India />
        </Route>
        <Route exact path="/">
          <div>Home</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
