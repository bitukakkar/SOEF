import React from "react";
import ReactDOM from "react-dom";
import App from "./Main";
import store from "./store";
import { Provider } from "react-redux";
import "./index.sass";
import "default-passive-events";
import dotenv from "dotenv";

dotenv.config();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals