import "preact/debug"; // <-- Add this line at the top of your main entry file

import { render } from "preact";
import { App } from "./components/App";

import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

render(<App />, document.getElementById("app"));
