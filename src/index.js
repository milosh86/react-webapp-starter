import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

import "./styles/global.css";
import "./styles/spectre-0.5.8/dist/spectre.css";
import './styles/react-sidenav/react-sidenav.customized.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
