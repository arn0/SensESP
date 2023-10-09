import { useId, useState } from "preact/hooks";
import { fetchConfigData, saveConfigData } from "../../common/configAPIClient";

import { ConfigData } from "common/configAPIClient";
import { Card } from "components/Card";
import { FormInput } from "components/Form";
import { ModalError } from "components/ModalError";
import { ChangeEvent, JSX } from "preact/compat";

interface EditControlProps {
  id: string;
  schema: {
    type: string;
    title: string;
    readOnly?: boolean;
  };
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const EditControl = ({
  id,
  schema,
  value,
  onChange,
}: EditControlProps): JSX.Element => {
  let type: string = schema.type;
  let step: number | undefined = undefined;
  let as: string | undefined = undefined;

  switch (type) {
    case "string":
      type = "text";
      break;
    case "number":
      type = "number";
      break;
    case "integer":
      type = "number";
      step = 1;
      break;
    case "boolean":
      type = "checkbox";
      break;
    case "array":
      as = "textarea";
      break;
    case "object":
      as = "textarea";
      break;
    default:
      type = "text";
      break;
  }

  return (
    <div>
      <FormInput
        type={type}
        as={as}
        id={id}
        label={schema.title}
        value={value}
        readOnly={schema.readOnly || false}
        step={step}
        onChange={onChange}
      />
    </div>
  );
};

export default EditControl;

const CardContents = ({ config, schema, description, setConfig }) => {
  const updateConfig = (key: string, value: any) => {
    setConfig({ ...config, [key]: value });
  };

  return (
    <>
      {description || null}

      {Object.keys(schema["properties"]).map((key) => {
        return (
          <EditControl
            id={key}
            schema={schema["properties"][key]}
            value={config[key]}
            onChange={(event: any) => updateConfig(key, event.target.value)}
          />
        );
      })}
    </>
  );
};

interface ConfigCardProps {
  path: string;
}

export function ConfigCard({ path }: ConfigCardProps): JSX.Element {
  const [config, setConfig] = useState<Record<string, any>>({});
  const [schema, setSchema] = useState<Record<string, any>>({});
  const [description, setDescription] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);
  const [httpErrorText, setHttpErrorText] = useState<string>("");
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const id = useId();

  const updateFunc = async (path: string): Promise<void> => {
    const data: ConfigData = await fetchConfigData(path);
    setConfig(data.config);
    setSchema(data.schema);
    setDescription(data.description);
  };

  if (Object.keys(config).length === 0) {
    updateFunc(path);
  }

  async function handleSave(e): Promise<void> {
    e.preventDefault();
    setSaving(true);
    await saveConfigData(path, config, (e) => {
      console.log("Error saving config data", e);
      setIsDirty(true);
      setHttpErrorText(e);
    });
    setIsDirty(false);
    setSaving(false);
  }

  console.log("httpErrorText", httpErrorText);

  const title = path.slice(1).replace(/\//g, " ▸ ");

  if (!schema) {
    return null;
  }

  if (Object.keys(config).length === 0) {
    return (
      <div class="d-flex align-items-center justify-content-center min">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <ModalError
        id={id + "-modal"}
        title="Error"
        show={httpErrorText !== ""}
        onHide={() => setHttpErrorText("")}
      >
        <p>There was an error saving the configuration:</p>
        <p>{httpErrorText}</p>
      </ModalError>

      <Card title={title}>
        <form>
          <div onInput={() => setIsDirty(true)} className="mb-2">
            <CardContents
              config={config}
              schema={schema}
              description={description}
              setConfig={setConfig}
            />
          </div>
          <div className="d-flex justify-content-begin">
            <div
              class={"spinner-border me-2" + saving ? "" : " visually-hidden"}
              role="status"
            >
              <span class="visually-hidden">Loading...</span>
            </div>

            <button
              className="btn btn-primary"
              type="submit"
              onClick={handleSave}
              disabled={saving || !isDirty}
            >
              Save
            </button>
          </div>
        </form>
      </Card>
    </>
  );
}
