import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { SocketContextProvider } from "./context/socket-context.tsx";
import SplashScreen from "./components/home/SplashScreen.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SocketContextProvider>
      <BrowserRouter>
        <App />
        <SplashScreen />
      </BrowserRouter>
    </SocketContextProvider>
  </React.StrictMode>
);
