import React from "react";
import { Router } from "./Router";
import { resetContext, getContext } from "kea";
import { Provider } from "react-redux";
// @ts-ignore
import { loadersPlugin } from "kea-loaders";
import "./global.scss";
import { Header, Footer } from "./components";

resetContext({
  createStore: {
    // options for redux (e.g. middleware, reducers, ...)
  },
  plugins: [
    // additional kea plugins
    loadersPlugin({}),
  ],
});

function App(): JSX.Element {
  return (
    <Provider store={getContext().store}>
      <Header />
      <div className="main">
        <Router />
      </div>
      <Footer />
    </Provider>
  );
}

export default App;
