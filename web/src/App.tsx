import { ConfigurationPage } from "pages/Configuration";
import { SignalKPage } from "pages/SignalK";
import { StatusPage } from "pages/Status";
import { SystemPage } from "pages/System";
import { WiFiConfigPage } from "pages/WiFi";
import { NotFound } from "pages/_404.jsx";
import { LocationProvider, Route, Router } from "preact-iso";
import { Header } from "./components/Header.js";
import { RedirectRoot } from "pages/Root.js";

export function App() {
  return (
    <LocationProvider>
      <Header />
      <Router>
        <RedirectRoot path="/" />
        <StatusPage path="/status" />
        <SystemPage path="/system" />
        <WiFiConfigPage path="/wifi" />
        <SignalKPage path="/signalk" />
        <ConfigurationPage path="/configuration" />
        <Route default component={NotFound} />
      </Router>
    </LocationProvider>
  );
}
