import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";

import { produce } from "immer";
import { ModalError } from "pages/ModalError";
import { ReTab, ReTabs } from "pages/ReTab";
import { fetchConfigData, saveConfigData } from "pages/configAPIClient";
import { useEffect, useId, useState } from "react";
import { Button } from "react-bootstrap";
import { CheckboxAccordion } from "./CheckboxAccordion";
import { NetworkList } from "./NetworkList";
import { SingleClientConfig } from "./WiFiSettingsConfig";
import { SingleClientConfigPanel } from "./SingleClientConfigPanel";
import { WiFiSettingsConfig, APSettingsConfig, ClientSettingsConfig } from "./WiFiSettingsConfig";

export function WiFiSettingsPanel() {
  const [config, setConfig] = useState<WiFiSettingsConfig>(
    new WiFiSettingsConfig(),
  );
  const [requestSave, setRequestSave] = useState(false);
  const [errorText, setErrorText] = useState("");

  function handleError(e) {
    setErrorText(e);
  }

  if (requestSave) {
    // save config data to server
    saveConfigData("/System/WiFi Settings", config, handleError);
    setRequestSave(false);
  }

  async function updateConfig() {
    try {
      const data = await fetchConfigData("/System/WiFi Settings");

      setConfig(data.config as WiFiSettingsConfig); // living dangerously
    } catch (e) {
      setErrorText(e);
    }
  }

  useEffect(() => {
    updateConfig();
  }, []);

  function setAPConfig(apSettings) {
    setConfig(
      produce(config, (draft) => {
        draft.apSettings = apSettings;
      }),
    );
  }

  function setClientConfig(clientSettings) {
    setConfig(
      produce(config, (draft) => {
        draft.clientSettings = clientSettings;
      }),
    );
  }

  return (
    <>
      {errorText !== "" && (
        <ModalError title="Error" onHide={() => setErrorText("")}>
          <p>{errorText}</p>
        </ModalError>
      )}
      <div className="mb-3">
        <Stack gap={4}>
          <APSettingsPanel config={config.apSettings} setConfig={setAPConfig} />
          <ClientSettingsPanel config={config.clientSettings} setConfig={setClientConfig} />
        </Stack>
      </div>
      <Button>Save</Button>
    </>
  );
}

function APSettingsPanel({ config, setConfig }) {
  const id = useId();

  function handleApSettingsChange(field) {
    return (event) => {
      setConfig({
        ...config,
        [field]: event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
      });
    };
  }

  function handleExpandedChange(expanded) {
    produce(config, (draft) => {
      draft.enabled = expanded;
    });
  }

  return (
    <CheckboxAccordion
      title="Access Point"
      description="Create a new WiFi network"
      expanded={config.enabled}
      onExpandedChange={handleExpandedChange}
    >
      <Form>
        <Stack gap={2}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              id={id + "-name"}
              type="text"
              placeholder="Network Name"
              value={config.name}
              onChange={handleApSettingsChange("name")}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              id={id + "-password"}
              type="password"
              placeholder="Network Password"
              value={config.password}
              onChange={handleApSettingsChange("password")}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Channel</Form.Label>
            <Form.Select
              id={id + "-channel"}
              aria-label="Select WiFi channel"
              value={config.channel}
              onChange={handleApSettingsChange("channel")}
            >
              <option value="Auto">Auto</option>
              {[...Array(11).keys()].map((i) => (
                <option value={i + 1}>{i + 1}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Hidden</Form.Label>
            <Form.Check
              id={id + "-hidden"}
              type="switch"
              label="Hidden"
              checked={config.hidden}
              onChange={handleApSettingsChange("hidden")}
            />
          </Form.Group>
        </Stack>
      </Form>
    </CheckboxAccordion>
  );
}

function ClientSettingsPanel({config, setConfig}) {
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  const id = useId();

  function updateClientConfig(num: number, singleConfig: SingleClientConfig) {
    setConfig(
      produce(config, (draft) => {
        draft.singleClientConfigs[num] = singleConfig;
      }),
    );
  }

  function handleClickNetwork(networkName) {
    setSelectedNetwork(networkName);
    setConfig(
      produce(config, (draft) => {
        draft[activeTab].name = networkName;
      }),
    );
  }

  function handleActiveTab(tabNum) {
    setActiveTab(tabNum);
  }

  function handleExpandedChange(expanded) {
    produce(config, (draft) => {
      draft.enabled = expanded;
    });
  }

  return (
    <CheckboxAccordion title="Client" description="Connect to existing WiFi" expanded={config.enabled} onExpandedChange={handleExpandedChange}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm overflow-auto">
            <h4>Available Networks</h4>
            <NetworkList
              selectedNetwork={selectedNetwork}
              setSelectedNetwork={handleClickNetwork}
            />
          </div>
          <div className="col-sm">
            <ReTabs id={id + "-retabs"}>
              <ReTab title="First" onClick={() => handleActiveTab(0)}>
                <SingleClientConfigPanel
                  config={config.singleClientConfigs[0]}
                  setConfig={(cfg) => updateClientConfig(0, cfg)}
                />
              </ReTab>
              <ReTab title="Second" onClick={() => handleActiveTab(1)}>
                <SingleClientConfigPanel
                  config={config.singleClientConfigs[1]}
                  setConfig={(cfg) => updateClientConfig(1, cfg)}
                />
              </ReTab>
              <ReTab title="Third" onClick={() => handleActiveTab(2)}>
                <SingleClientConfigPanel
                  config={config.singleClientConfigs[2]}
                  setConfig={(cfg) => updateClientConfig(2, cfg)}
                />
              </ReTab>
            </ReTabs>
          </div>
        </div>
      </div>
    </CheckboxAccordion>
  );
}
