import { ButtonCard } from "components/Card";
import { FormInput, FormSwitch } from "components/Form";
import { AppPage } from "pages/AppPage";
import { useId, useState } from "preact/hooks";
import { ModalError } from "../../components/ModalError";
import { PageContents } from "../PageContents";
import { PageHeading } from "../PageHeading";

export const SystemPage = () => {
  return (
    <AppPage>
      <PageHeading title="System Settings" />
      <PageContents>
        <SystemCards />
      </PageContents>
    </AppPage>
  );
};

const SystemCards = () => {
  const id = useId();

  return (
    <div className="vstack gap-4">
      <DeviceNameCard />
      <AuthCard />
      <RestartCard />
      <ResetCard />
    </div>
  );

  function DeviceNameCard() {
    return (
      <SystemSettingsCard title={<h5 className="card-title">Device Name</h5>}>
        <p className="card-text">
          The device name is used to identify this device on the network. It is
          used both as a hostname (e.g. "my-device.local") and as an identifying
          name in the Signal K network.
        </p>
        <FormInput
          label="Hostname"
          id={id + "-name"}
          type="text"
          placeholder="Device Name"
        />
      </SystemSettingsCard>
    );
  }
};

function AuthCard() {
  const [authEnabled, setAuthEnabled] = useState(false);

  console.log("AuthCard: authEnabled = " + authEnabled);

  const id = useId();

  return (
    <SystemSettingsCard title={<h5 className="card-title">Authentication</h5>}>
      <p className="card-text">
        Authentication is used to restrict access to the configuration
        interface. If you are using this device on a trusted private network,
        you can disable authentication.
      </p>
      <div>
        <FormSwitch
          label="Enable authentication"
          id={id + "-enableAuth"}
          type="checkbox"
          checked={authEnabled}
          onChange={(e) => setAuthEnabled(e.currentTarget.checked)}
        />
      </div>
      <div class="row">
        <div class="col-sm-6">
          <FormInput
            label="Username"
            id={id + "-username"}
            type="text"
            placeholder="Username"
            disabled={!authEnabled}
          />
        </div>
        <div class="col-sm-6">
          <FormInput
            label="Password"
            id={id + "-password"}
            type="password"
            placeholder="Password"
            disabled={!authEnabled}
          />
        </div>
      </div>
    </SystemSettingsCard>
  );
}

const SystemCard = ({ children }) => {
  return <div className="card">{children}</div>;
};

const SystemSettingsCard = ({ title, children }) => {
  const id = useId();
  const [isDirty, setIsDirty] = useState(false);

  const handleInput = (event) => {
    setIsDirty(true);
  };

  const handleSave = (event) => {
    setIsDirty(false);
  };

  return (
    <SystemCard>
      <div className="card-header">{title}</div>
      <div className="card-body">
        {children}
        <button
          type="button"
          className="btn btn-primary mt-3"
          disabled={!isDirty}
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </SystemCard>
  );
};

/**
 * Component for restarting the device.
 */
const RestartCard = () => {
  const [httpErrorText, setHttpErrorText] = useState("");

  const id = useId();

  const handleRestart = async () => {
    console.log("Restarting the device");

    try {
      const response = await fetch("/device/restart", { method: "POST" });
      if (!response.ok) {
        setHttpErrorText(`${response.status} ${response.statusText}`);
        return;
      }
      console.log("Restarted the device");
      // wait for 5 seconds and attempt a reload
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } catch (e) {
      setHttpErrorText("Error restarting the device: " + e);
    }
  };

  return (
    <>
      <ModalError
        id={id + "-modal"}
        title="Error"
        show={httpErrorText !== ""}
        onHide={() => {
          setHttpErrorText("");
        }}
      >
        <p>Failed to restart the device:</p>
        <p>{httpErrorText}</p>
      </ModalError>
      <ButtonCard
        title="Restart the device"
        buttonText="Restart"
        isButtonEnabled={true}
        onClick={handleRestart}
      >
        <p className="card-text">
          Restarting the device will take a few seconds. If you are connected to
          the device's WiFi access point, you may have to manually reconnect.
        </p>
      </ButtonCard>
    </>
  );
};

/**
 * Component for resetting to factory defaults.
 */
const ResetCard = () => {
  const [httpErrorText, setHttpErrorText] = useState("");

  const id = useId();

  const handleReset = async () => {
    console.log("Resetting the device");

    try {
      const response = await fetch("/device/reset", { method: "POST" });
      if (!response.ok) {
        setHttpErrorText(`${response.status} ${response.statusText}`);
        return;
      }
      console.log("Reset the device");
      // wait for 5 seconds and attempt a reload
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } catch (e) {
      setHttpErrorText("Error Resetting the device: " + e);
    }
  };

  return (
    <>
      <ModalError
        id={id + "-modal"}
        title="Error"
        show={httpErrorText !== ""}
        onHide={() => {
          setHttpErrorText("");
        }}
      >
        <p>Failed to reset the device:</p>
        <p>{httpErrorText}</p>
      </ModalError>
      <ButtonCard
        title="Reset the device to factory defaults"
        buttonText="Reset"
        buttonVariant="danger"
        isButtonEnabled={true}
        onClick={handleReset}
      >
        <p className="card-text">
          <strong>Warning:</strong> This will reset the device to factory
          defaults, erasing all configuration and data. You will need to
          reconfigure the device after resetting.
        </p>
      </ButtonCard>
    </>
  );
};
