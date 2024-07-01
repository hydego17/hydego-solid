import { ColorModeProvider, ColorModeScript } from "@kobalte/core";
import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { lazy, Suspense } from "solid-js";

import SiteFooter from "./components/site-footer";
import SiteNavbar from "./components/site-navbar";

import "./libs/dayjs";
import "./app.css";

const SolidNProgress = lazy(() => import("./components/nprogress"));

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Suspense>
            <SolidNProgress />
            <ColorModeScript />
            <ColorModeProvider initialColorMode='dark'>
              <SiteNavbar />
              {props.children}
              <SiteFooter />
            </ColorModeProvider>
          </Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
