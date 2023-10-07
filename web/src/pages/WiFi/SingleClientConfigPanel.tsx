import { produce } from "immer";
import { Collapse } from "components/Collapse";
import { FormCheck, FormInput } from "components/Form";
import { useId } from "preact/hooks";

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
      <div className="vstack gap-2">
        <FormInput
          id={id + "-name"}
          type="text"
          label="Name"
          placeholder="Network Name"
          value={config.name}
          onChange={(event) =>
            updateConfigField("name", event.currentTarget.value)
          }
        />
        <FormInput
          id={id + "-password"}
          type="password"
          label="Password"
          placeholder="Network Password"
          value={config.password}
          onChange={(event) =>
            updateConfigField("password", event.currentTarget.value)
          }
        />

        <div>
          <FormCheck
            id={id + "-dhcp"}
            name={id}
            type="radio"
            label="DHCP"
            value={true}
            checked={useDHCP}
            onChange={(event) =>
              updateConfigField("useDHCP", event.currentTarget.checked)
            }
          />

          <FormCheck
            id={id + "-static"}
            name={id}
            type="radio"
            label="Static"
            value={false}
            checked={!useDHCP}
            onChange={(event) =>
              updateConfigField("useDHCP", !event.currentTarget.checked)
            }
          />
        </div>
        <Collapse id={id + "-collapse"} expanded={!useDHCP}>
          <div>
            <StaticIPConfig
              config={config}
              updateConfigField={updateConfigField}
            />
          </div>
        </Collapse>
      </div>
    </>
  );
}

function StaticIPConfig({ config, updateConfigField }) {
  const id = useId();
  return (
    <div>
      <FormInput
        id={id + "-ipAddress"}
        type="text"
        label="IP Address"
        placeholder="IP Address"
        value={config.ipAddress}
        onChange={(event) =>
          updateConfigField("ipAddress", event.currentTarget.value)
        }
      />

      <FormInput
        id={id + "-netmask"}
        type="text"
        label="Netmask"
        placeholder="Netmask"
        value={config.netmask}
        onChange={(event) =>
          updateConfigField("netmask", event.currentTarget.value)
        }
      />

      <FormInput
        id={id + "-gateway"}
        type="text"
        label="Gateway"
        placeholder="Gateway"
        value={config.gateway}
        onChange={(event) =>
          updateConfigField("gateway", event.currentTarget.value)
        }
      />

      <FormInput
        id={id + "-dnsServer"}
        type="text"
        label="DNS Server"
        placeholder="DNS Server"
        value={config.dnsServer}
        onChange={(event) =>
          updateConfigField("dnsServer", event.currentTarget.value)
        }
      />
    </div>
  );
}
