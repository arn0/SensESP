import { render } from "preact";
import { LocationProvider, Route, Router } from "preact-iso";

import { Header } from "./components/Header.jsx";
import { Configuration } from "./pages/Configuration/index.js";
import { Control } from "./pages/Control/index.js";
import { Network } from "./pages/Network/index.js";
import { StatusPage } from "./pages/Status/index.js";
import { NotFound } from "./pages/_404.jsx";
import "./style.css";

export function App() {
  return (
    <LocationProvider>
      <Header />
      <main>
        <Router>
          <StatusPage path="/ui/status" />
          <Network path="/ui/network" />
          <Configuration path="/ui/configuration" />
          <Control path="/ui/control" />
          <Route default component={NotFound} />
        </Router>
      </main>
    </LocationProvider>
  );
}

render(<App />, document.getElementById("app"));
