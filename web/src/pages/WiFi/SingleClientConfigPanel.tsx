import { produce } from "immer";
import { useId, useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";

export function SingleClientConfigPanel({ config, setConfig }) {
  const id = useId();

  const useDHCP = config.useDHCP;

  function updateConfigField(field, value) {
    setConfig(
      produce(config, (draft) => {
        draft[field] = value;
      }),
    );
  }

  return (
    <>
      <Stack gap={2}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            id={id + "-name"}
            type="text"
            placeholder="Network Name"
            value={config.name}
            onChange={(event) =>
              updateConfigField("name", event.currentTarget.value)
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            id={id + "-password"}
            type="password"
            placeholder="Network Password"
            value={config.password}
            onChange={(event) =>
              updateConfigField("password", event.currentTarget.value)
            }
          />
        </Form.Group>
        <div>
          <Form.Check
            id={id + "-dhcp"}
            name={id}
            type="radio"
            label="DHCP"
            value={true}
            checked={useDHCP}
            onChange={(event) => updateConfigField("useDHCP", event.currentTarget.checked)}
          />
          <Form.Check
            id={id + "-static"}
            name={id}
            type="radio"
            label="Static"
            value={false}
            checked={!useDHCP}
            onChange={(event) => updateConfigField("useDHCP", !event.currentTarget.checked)}
          />
        </div>
        <Collapse in={!useDHCP}>
          <div>
            <StaticIPConfig
              config={config}
              updateConfigField={updateConfigField}
            />
          </div>
        </Collapse>
      </Stack>
    </>
  );
}

function StaticIPConfig({ config, updateConfigField }) {
  const id = useId();
  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Label>IP Address</Form.Label>
          <Form.Control
            id={id + "-ipAddress"}
            type="text"
            placeholder="IP Address"
            value={config.ipAddress}
            onChange={(event) =>
              updateConfigField("ipAddress", event.currentTarget.value)
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Netmask</Form.Label>
          <Form.Control
            id={id + "-netmask"}
            type="text"
            placeholder="Netmask"
            value={config.netmask}
            onChange={(event) =>
              updateConfigField("netmask", event.currentTarget.value)
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Gateway</Form.Label>
          <Form.Control
            id={id + "-gateway"}
            type="text"
            placeholder="Gateway"
            value={config.gateway}
            onChange={(event) =>
              updateConfigField("gateway", event.currentTarget.value)
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>DNS Server</Form.Label>
          <Form.Control
            id={id + "-dnsServer"}
            type="text"
            placeholder="DNS Server"
            value={config.dnsServer}
            onChange={(event) =>
              updateConfigField("dnsServer", event.currentTarget.value)
            }
          />
        </Form.Group>
      </Form>
    </div>
  );
}
