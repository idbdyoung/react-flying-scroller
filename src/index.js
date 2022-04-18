import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

import { Provider as FlyingScrollerProvider } from "../lib";

import App from "./App";
import Home from "./pages/Home";
import Some from "./pages/Some";

const container = document.getElementById("root");
const root = createRoot(container);
const GlobalStyle = createGlobalStyle`
  ${reset}
`;

const options = {};

root.render(
  <BrowserRouter>
    <FlyingScrollerProvider {...options}>
      <GlobalStyle />
      <Routes>
        <Route path="" element={<App />}>
          <Route index element={<Home />} />
          <Route path="some" element={<Some />} />
        </Route>
      </Routes>
    </FlyingScrollerProvider>
  </BrowserRouter>
);
