import { LocationProvider, Route, Router } from "preact-iso";
import { Header } from "./Header.jsx";
import { ConfigurationPage } from "../pages/Configuration/index.js";
import { SystemPage } from "../pages/System/index.js";
import { WiFiConfigPage } from "../pages/WiFi/index.js";
import { StatusPage } from "../pages/Status/index.js";
import { NotFound } from "../pages/_404.jsx";


export function App() {
    return (
      <LocationProvider>
        <Header />
          <Router>
            <StatusPage path="/ui/status" />
            <SystemPage path="/ui/system" />
            <WiFiConfigPage path="/ui/wifi" />
            <ConfigurationPage path="/ui/configuration" />
            <Route default component={NotFound} />
          </Router>
      </LocationProvider>
    );
  }
