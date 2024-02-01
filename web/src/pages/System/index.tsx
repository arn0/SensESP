import { InputDirtyContext } from "common/InputDirtyContext";
import { ButtonCard } from "components/Card";
import { FormInput, FormSwitch } from "components/Form";
import { AppPage } from "pages/AppPage";
import { type JSX } from "preact";
import { useId, useState } from "preact/hooks";
import { ModalError } from "../../components/ModalError";
import { PageContents } from "../PageContents";
import { PageHeading } from "../PageHeading";

export function SystemPage(): JSX.Element {
  return (
    <AppPage>
      <PageHeading title="System Settings" />
      <PageContents>
        <SystemCards />
      </PageContents>
    </AppPage>
  );
}

function SystemCards(): JSX.Element {
  const id = useId();

  return (
    <div className="vstack gap-4">
      <DeviceNameCard />
      <AuthCard />
      <RestartCard />
      <ResetCard />
    </div>
  );

  function DeviceNameCard(): JSX.Element {
    return (
      <SystemSettingsCard title={<h5 className="card-title">Device Name</h5>}>
        <p className="card-text">
          The device name is used to identify this device on the network. It is
          used both as a hostname (e.g. <code>my-device.local</code>) and as an
          identifying name in the Signal K network.
        </p>
        <FormInput
          label="Hostname"
          id={`${id}-name`}
          type="text"
          placeholder="Device Name"
        />
      </SystemSettingsCard>
    );
  }
}

function AuthCard(): JSX.Element {
  const [authEnabled, setAuthEnabled] = useState(false);

  const id = useId();

  return (
    <SystemSettingsCard title={<h5 className="card-title">Authentication</h5>}>
      <p className="card-text">
        Authentication is used to restrict access to the configuration
        interface. You should disable authentication only if you are using this
        device on a trusted private network.
      </p>
      <div>
        <FormSwitch
          label="Enable authentication"
          id={`${id}-enableAuth`}
          type="checkbox"
          checked={authEnabled}
          onChange={(e) => {
            setAuthEnabled(e.currentTarget.checked);
          }}
        />
      </div>
      <div className="row">
        <div className="col-sm-6">
          <FormInput
            label="Username"
            id={`${id}-username`}
            type="text"
            placeholder="Username"
            disabled={!authEnabled}
          />
        </div>
        <div className="col-sm-6">
          <FormInput
            label="Password"
            id={`${id}-password`}
            type="password"
            placeholder="Password"
            disabled={!authEnabled}
          />
        </div>
      </div>
    </SystemSettingsCard>
  );
}

interface SystemCardProps {
  title?: React.ReactNode;
  children: React.ReactNode;
}

function SystemCard({ children }: SystemCardProps): JSX.Element {
  return <div className="card">{children}</div>;
}

function SystemSettingsCard({ title, children }: SystemCardProps): JSX.Element {
  const [isDirty, setIsDirty] = useState(false);

  function handleSave(): void {
    setIsDirty(false);
  }

  return (
    <InputDirtyContext.Provider
      value={{ isInputDirty: isDirty, setInputDirty: setIsDirty }}
    >
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
    </InputDirtyContext.Provider>
  );
}

/**
 * Component for restarting the device.
 */
function RestartCard(): JSX.Element {
  const [httpErrorText, setHttpErrorText] = useState("");

  const id = useId();

  async function handleRestart(): Promise<void> {
    console.log("Restarting the device");

    try {
      const response = await fetch("/api/device/restart", { method: "POST" });
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
      setHttpErrorText(`Error restarting the device: ${e}`);
    }
  }

  return (
    <>
      <ModalError
        id={`${id}-modal`}
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
        onClick={() => {
          void handleRestart();
        }}
      >
        <p className="card-text">
          Restarting the device will take a few seconds. If you are connected to
          the device&apos;s WiFi access point, you may have to manually
          reconnect.
        </p>
      </ButtonCard>
    </>
  );
}

/**
 * Component for resetting to factory defaults.
 */
function ResetCard(): JSX.Element {
  const [httpErrorText, setHttpErrorText] = useState("");

  const id = useId();

  async function handleReset(): Promise<void> {
    console.log("Resetting the device");

    try {
      const response = await fetch("/api/device/reset", { method: "POST" });
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
      setHttpErrorText(`Error Resetting the device: ${e}`);
    }
  }

  return (
    <>
      <ModalError
        id={`${id}-modal`}
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
        onClick={() => {
          void handleReset();
        }}
      >
        <p className="card-text">
          <strong>Warning:</strong> This will reset the device to factory
          defaults, erasing all configuration and data. You will need to
          reconfigure the device after resetting.
        </p>
      </ButtonCard>
    </>
  );
}
