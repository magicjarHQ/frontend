import React from "react";
import { Router } from "./Router";
import { resetContext, getContext } from "kea";
import { Provider } from "react-redux";
import { Slide, ToastContainer } from "react-toastify";
// @ts-ignore
import { loadersPlugin } from "kea-loaders";
import "./global.scss";
import { Header, Footer } from "./components";
import posthog from "posthog-js";

posthog.init("X048w9D0JiLBoRsUTqFetaSDGKyORi85tkcCKDuSrkA", {
  api_host: "https://app.posthog.com",
});

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
      <ToastContainer transition={Slide} />
    </Provider>
  );
}

export default App;
