import { ConfigurationPage } from "pages/Configuration";
import { SignalKPage } from "pages/SignalK";
import { StatusPage } from "pages/Status";
import { SystemPage } from "pages/System";
import { WiFiConfigPage } from "pages/WiFi";
import { NotFound } from "pages/_404.jsx";
import { LocationProvider, Route, Router } from "preact-iso";
import { Header } from "./components/Header.js";

export function App() {
  return (
    <LocationProvider>
      <Header />
      <Router>
        <StatusPage path="/ui/status" />
        <SystemPage path="/ui/system" />
        <WiFiConfigPage path="/ui/wifi" />
        <SignalKPage path="/ui/signalk" />
        <ConfigurationPage path="/ui/configuration" />
        <Route default component={NotFound} />
      </Router>
    </LocationProvider>
  );
}
