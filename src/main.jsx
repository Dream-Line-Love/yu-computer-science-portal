import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { defaultTheme, Provider } from "@adobe/react-spectrum";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <Provider theme={defaultTheme}>
        <App />
      </Provider>
    </NextUIProvider>
  </React.StrictMode>
);
