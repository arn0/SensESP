import "preact/debug"; // <-- Add this line at the top of your main entry file

import { render } from "preact";
import { App } from "./components/App";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js"
import "./style.css";

render(<App />, document.getElementById("app"));
