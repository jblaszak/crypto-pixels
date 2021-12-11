import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./fonts/Inter-Regular.ttf";
import "./fonts/Inter-Bold.ttf";
import "./fonts/Inter-Regular.woff";
import "./fonts/Inter-Bold.woff";
import "./fonts/Inter-Regular.woff2";
import "./fonts/Inter-Bold.woff2";

import "./index.css";
import store from "./store";
import ScrollToTop from "./components/UI/ScrollToTop";
import { CryptoContextProvider } from "./store/cryptoContext";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <CryptoContextProvider>
          <ScrollToTop />
          <App />
        </CryptoContextProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
