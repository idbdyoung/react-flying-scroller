import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

import { Provider as FlyingScrollerProvider } from "../lib";

import App from "./App";
import Home from "./pages/Home";

const container = document.getElementById("root");
const root = createRoot(container);
const GlobalStyle = createGlobalStyle`
  ${reset}
`;

root.render(
  <BrowserRouter>
    <FlyingScrollerProvider>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </FlyingScrollerProvider>
  </BrowserRouter>
);
