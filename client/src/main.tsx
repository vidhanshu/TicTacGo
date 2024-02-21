import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { SocketContextProvider } from "./context/socket-context.tsx";
import SplashScreen from "./components/home/SplashScreen.tsx";
import AudioContextProvider from "./context/audio-context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SocketContextProvider>
      <AudioContextProvider>
        <BrowserRouter>
          <App />
          <SplashScreen />
        </BrowserRouter>
      </AudioContextProvider>
    </SocketContextProvider>
  </React.StrictMode>
);
