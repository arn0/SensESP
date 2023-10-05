import { useId, useState } from "preact/hooks";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import { ModalError } from "../ModalError";
import { PageContents } from "../PageContents";
import { PageHeading } from "../PageHeading";

const SystemCard = ({ children }) => {
  return (
    <Card>
      <Card.Body>{children}</Card.Body>
    </Card>
  );
};

const SystemSettingsCard = ({ children }) => {
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
      <div class="mb-3" onInput={handleInput}>
        {children}
      </div>
      <Button disabled={!isDirty} onClick={handleSave}>
        Save
      </Button>
    </SystemCard>
  );
};

/**
 * Component for restarting the device.
 */
const RestartCard = () => {
  const [httpErrorText, setHttpErrorText] = useState("");

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
      {httpErrorText !== "" && (
        <ModalError
          title="Error"
          onHide={() => {
            setHttpErrorText("");
          }}
        >
          <p>Failed to restart the device:</p>
          <p>{httpErrorText}</p>
        </ModalError>
      )}
      <SystemCard>
        <Card.Title>Restart the device</Card.Title>
        <Card.Text>
          Restarting the device will take a few seconds. If you are connected to
          the device's WiFi access point, you may have to manually reconnect.
        </Card.Text>
        <Button onClick={handleRestart}>Restart</Button>
      </SystemCard>
    </>
  );
};

/**
 * Component for resetting to factory defaults.
 */
const ResetCard = () => {
  const [httpErrorText, setHttpErrorText] = useState("");

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
      {httpErrorText !== "" && (
        <ModalError
          title="Error"
          onHide={() => {
            setHttpErrorText("");
          }}
        >
          <p>Failed to reset the device:</p>
          <p>{httpErrorText}</p>
        </ModalError>
      )}
      <SystemCard>
        <Card.Title>Reset the device to factory defaults</Card.Title>
        <Card.Text>
          <strong>Warning:</strong> This will reset the device to factory
          defaults, erasing all configuration and data. You will need to
          reconfigure the device after resetting.
        </Card.Text>
        <Button variant="danger" onClick={handleReset}>
          Reset
        </Button>
      </SystemCard>
    </>
  );
};

const SystemCards = () => {
  const id = useId();

  return (
    <Stack gap={2}>
      <DeviceNameCard />
      <AuthCard />
      <RestartCard />
      <ResetCard />
    </Stack>
  );

  function DeviceNameCard() {
    return (
      <SystemSettingsCard>
        <Card.Title>Device Name</Card.Title>
        <Card.Text>
          The device name is used to identify this device on the network. It is
          used both as a hostname (e.g. "my-device.local") and as an identifying
          name in the Signal K network.
        </Card.Text>
        <Form.Group controlId={id + "-name"}>
          <Form.Label>Hostname</Form.Label>
          <Form.Control type="text" placeholder="Device Name" />
        </Form.Group>
        <div class="row"></div>
      </SystemSettingsCard>
    );
  }
};

function AuthCard() {
  const [authEnabled, setAuthEnabled] = useState(false);

  const id = useId();

  return (
    <SystemSettingsCard>
      <Card.Title>Authentication</Card.Title>
      <Card.Text>
        Authentication is used to restrict access to the configuration
        interface. If you are using this device on a trusted private network,
        you can disable authentication.
      </Card.Text>
      <div class="row">
        <Form.Group controlId={id + "-enableAuth"}>
          <Form.Label>Enable</Form.Label>
          <Form.Check
            type="switch"
            label="Enable authentication"
            onChange={(e) => setAuthEnabled(e.target.checked)}
          />
        </Form.Group>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <Form.Group controlId={id + "-username"}>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              disabled={!authEnabled}
            />
          </Form.Group>
        </div>
        <div class="col-sm-6">
          <Form.Group controlId={id + "-password"}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              disabled={!authEnabled}
            />
          </Form.Group>
        </div>
      </div>
    </SystemSettingsCard>
  );
}

export const SystemPage = () => {
  return (
    <div className="SystemPage">
      <PageHeading title="System Settings" />
      <PageContents>
        <SystemCards />
      </PageContents>
    </div>
  );
};
