import { produce } from "immer";
import { ModalError } from "pages/ModalError";
import { CollapseCard } from "pages/ReCollapseCard";
import { ReFormInput, ReFormSwitch } from "pages/ReForm";
import { ReTab, ReTabs } from "pages/ReTab";
import { fetchConfigData, saveConfigData } from "pages/configAPIClient";
import { useEffect, useId, useState } from "preact/hooks";
import { NetworkList } from "./NetworkList";
import { SingleClientConfigPanel } from "./SingleClientConfigPanel";
import { SingleClientConfig, WiFiSettingsConfig } from "./WiFiSettingsConfig";

export function WiFiSettingsPanel() {
  const [config, setConfig] = useState<WiFiSettingsConfig>(
    new WiFiSettingsConfig(),
  );
  const [requestSave, setRequestSave] = useState(false);
  const [errorText, setErrorText] = useState("");

  const id = useId();

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
      <ModalError
        id={id + "-modal"}
        title="Error"
        show={errorText !== ""}
        onHide={() => setErrorText("")}
      >
        <p>{errorText}</p>
      </ModalError>
      <div className="mb-3">
        <div className="vstack gap-4">
          <APSettingsPanel config={config.apSettings} setConfig={setAPConfig} />
          <ClientSettingsPanel
            config={config.clientSettings}
            setConfig={setClientConfig}
          />
        </div>
      </div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setRequestSave(true)}
      >
        Save
      </button>
    </>
  );
}

function APSettingsPanel({ config, setConfig }) {
  const id = useId();

  function handleApSettingsChange(field) {
    return (event) => {
      setConfig({
        ...config,
        [field]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      });
    };
  }

  function setExpanded(expanded) {
    setConfig(
      produce(config, (draft) => {
        draft.enabled = expanded;
      }),
    );
  }

  return (
    <CollapseCard
      id={id + "-collapsecard"}
      title={
        <>
          <div className="fw-bold">Access Point</div>
          Create a new WiFi network
        </>
      }
      expanded={config.enabled}
      setExpanded={setExpanded}
    >
      <form>
        <div className="vstack gap-2">
          <ReFormInput
            id={id + "-name"}
            label="Name"
            type="text"
            placeholder="Network Name"
            value={config.name}
            onChange={handleApSettingsChange("name")}
          />

          <ReFormInput
            id={id + "-password"}
            label="Password"
            type="password"
            placeholder="Network Password"
            value={config.password}
            onChange={handleApSettingsChange("password")}
          />

          <ReFormInput
            id={id + "-channel"}
            label="Channel"
            aria-label="Select WiFi channel"
            value={config.channel}
            onChange={handleApSettingsChange("channel")}
          />

          <ReFormSwitch
            id={id + "-hidden"}
            label="Hidden"
            type="checkbox"
            checked={config.hidden}
            onChange={handleApSettingsChange("hidden")}
          />
        </div>
      </form>
    </CollapseCard>
  );
}

function ClientSettingsPanel({ config, setConfig }) {
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

  function setExpanded(expanded) {
    setConfig(
      produce(config, (draft) => {
        draft.enabled = expanded;
      }),
    );
  }

  return (
    <CollapseCard
      id={id + "-collapseclient"}
      title={
        <>
          <div className="fw-bold">Client</div>
          Connect to existing WiFi
        </>
      }
      expanded={config.enabled}
      setExpanded={setExpanded}
    >
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
    </CollapseCard>
  );
}
