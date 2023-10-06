import { ModalError } from "pages/ModalError";
import { useContext, useId, useState } from "preact/hooks";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import { fetchConfigData, saveConfigData } from "../configAPIClient";
import { ReCollapse } from "../ReCollapse";
import { SKStatusContext } from "./SKStatusContext";

export const SignalKSettingsPanel = () => {
  const [config, setConfig] = useState({});
  const [requestSave, setRequestSave] = useState(false);
  const [errorText, setErrorText] = useState("");

  function handleError(e) {
    setErrorText(e);
  }

  if (requestSave) {
    // save config data to server
    saveConfigData("/System/Signal K Settings", config, handleError);
    setRequestSave(false);
  }

  async function updateConfig() {
    try {
      const data = await fetchConfigData("/System/Signal K Settings");
      setConfig(data.config);
    } catch (e) {
      setErrorText(e);
    }
  }

  if (Object.keys(config).length === 0) {
    updateConfig();
  }

  return (
    <>
      {errorText !== "" && (
        <ModalError title="Error" onHide={() => setErrorText("")}>
          <p>{errorText}</p>
        </ModalError>
      )}
      <Stack gap={4}>
        <SKConnectionStatus />
        <SKCounters />
        <SKConnectionSettings
          config={config}
          setConfig={setConfig}
          setRequestSave={setRequestSave}
        />
        <SKAuthToken
          config={config}
          setConfig={setConfig}
          setRequestSave={setRequestSave}
        />
      </Stack>
    </>
  );
};

const SKCard = ({ title, children }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {children}
      </Card.Body>
    </Card>
  );
};

const SKConnectionStatus = () => {
  const skStatus = useContext(SKStatusContext);

  const displayStatus = () => {
    const stat = skStatus["connection_status"] || "error";
    switch (stat) {
      case "server_not_found":
        return (
          <>
            <p class="fs-2">❌ Server not found</p>
            <p>
              Check the mDNS settings on the server or configure the server
              hostname and port manually.
            </p>
          </>
        );
      case "disconnected":
        return (
          <>
            <p class="fs-2">🛑 Disconnected</p>
            <p>Is the server running?</p>
          </>
        );
      case "connecting":
        return (
          <>
            <p class="fs-2">📡 Connecting...</p>
          </>
        );
      case "connected":
        return (
          <>
            <p class="fs-2">✅ Connected</p>
          </>
        );
      case "authenticating":
        return (
          <>
            <p class="fs-2">🔑 Authenticating</p>
            <p>Log in to the Signal K server and approve the Access Request.</p>
          </>
        );

      case "error":
        return (
          <>
            <p class="fs-2">⚠️ Error</p>
          </>
        );
      default:
        return (
          <>
            <p class="fs-2">🤷‍♂️ Unknown</p>
          </>
        );
    }
  };

  return (
    <SKCard title="Connection Status">
      <div style="height: 100px;">{displayStatus()}</div>
    </SKCard>
  );
};

const SKCounters = () => {
  const skStatus = useContext(SKStatusContext);
  const num_rx = skStatus["num_rx_deltas"] || 0;
  const num_tx = skStatus["num_tx_deltas"] || 0;

  return (
    <SKCard title="Counters">
      <div style="height: 100px;">
        <table className="table">
          <tr>
            <td>Transmitted deltas</td>
            <td>{num_rx}</td>
          </tr>
          <tr>
            <td>Received deltas</td>
            <td>{num_tx}</td>
          </tr>
          <tr></tr>
        </table>
      </div>
    </SKCard>
  );
};

function SKConnectionSettings({ config, setConfig, setRequestSave }) {
  const [mdns, setMdns] = useState(false);
  const id = useId();

  const handleMDNSChange = (event) => {
    setMdns(event.target.checked);
    setConfig({ ...config, mdns: event.target.checked });
  };

  return (
    <>
      <SKCard title="Connection Settings">
        <Stack gap={2}>
          <form>
            <div class="mb-3 form-check form-switch">
              <label
                for={id + "-mdns"}
                class="form-label"
                data-bs-toggle="collapse"
                data-target={`#${id}-collapse`}
              >
                Use mDNS
              </label>
              <input
                type="checkbox"
                class="form-check-input switch"
                id={id + "-mdns"}
                checked={config.mdns}
                onChange={handleMDNSChange}
              />
            </div>

            <ReCollapse id={id + "-collapse"} isCollapsed={mdns}>
              <div class="mb-3">
                <label for={id + "-hostname"} class="form-label">
                  Hostname
                </label>
                <input
                  type="text"
                  class="form-control"
                  id={id + "-hostname"}
                  value={config.sk_address}
                />
              </div>
              <div class="mb-3">
                <label for={id + "-port"} class="form-label">
                  Port
                </label>
                <input
                  type="number"
                  step={1}
                  class="form-control"
                  value={config.sk_port}
                  id={id + "-port"}
                />
              </div>
              <div class="mb-3 form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id={id + "-tls"}
                  disabled
                />
                <label class="form-check-label" for={id + "-tls"}>
                  Use TLS
                </label>
              </div>
            </ReCollapse>

            <button
              type="submit"
              class="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                setRequestSave(true);
              }}
            >
              Save
            </button>
          </form>
        </Stack>
      </SKCard>
    </>
  );
}

const SKAuthToken = ({ config, setConfig, setRequestSave }) => {
  const handleClearToken = () => {
    setConfig({ ...config, token: "" });
    setRequestSave(true);
  };

  return (
    <SKCard title="Authentication Token">
      <p>
        Click the button to clear the Signal K authentication token. This causes
        the device to request a new token from the Signal K server.
      </p>
      <button class="btn btn-primary" onClick={handleClearToken}>
        Clear Token
      </button>
    </SKCard>
  );
};
