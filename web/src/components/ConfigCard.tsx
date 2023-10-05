import { useState } from "preact/hooks";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { ModalError } from "./ModalError";
import { app_config } from "app_config";

const updateCard = async (path: string) => {
  try {
    const response = await fetch(app_config.config_path + path);
    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (e) {
    console.log("Error getting config data from server", e);
  }
};

const EditControl = ({ id, schema, value, onChange }) => {
  let type = schema["type"];
  let step = undefined;
  let as = undefined;

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
      <Form.Group className="mb-3">
        <Form.Label htmlFor={id}>{schema["title"]}</Form.Label>
        <Form.Control
          type={type}
          as={as}
          id={id}
          value={value}
          readOnly={"readOnly" in schema ? schema["readOnly"] : false}
          step={step}
          onChange={onChange}
        />
      </Form.Group>
    </div>
  );
};

const CardContents = ({ config, schema, description, setConfig }) => {
  if (Object.keys(config).length === 0) {
    return (
      <div class="d-flex align-items-center justify-content-center min">
        <Spinner animation="border" />
      </div>
    );
  }

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

export function ConfigCard(props: { path: string }) {
  const [config, setConfig] = useState({});
  const [schema, setSchema] = useState({});
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [httpErrorText, setHttpErrorText] = useState("");
  const [isDirty, setIsDirty] = useState(false);

  const updateFunc = async (path: string) => {
    const data = await updateCard(path);
    setConfig(data["config"]);
    setSchema(data["schema"]);
    setDescription(data["description"]);
  };

  if (Object.keys(config).length === 0) {
    updateFunc(props.path);
  }

  const handleSave = async () => {
    setSaving(true);
    const response = await fetch(app_config.config_path + props.path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(config),
    });
    if (!response.ok) {
      setHttpErrorText(`${response.status} ${response.statusText}`);
    } else {
      setIsDirty(false);
    }
    setSaving(false);
  };

  const title = props.path.slice(1).replace(/\//g, " ▸ ");

  return (
    <div className="ConfigCard">
      {httpErrorText !== "" && (
        <ModalError title="Error" onHide={setHttpErrorText("")}>
          <p>There was an error saving the configuration:</p>
          <p>{httpErrorText}</p>
        </ModalError>
      )}

      <Card>
        <Card.Body>
          <Card.Title className="pb-2">{title}</Card.Title>
          <div onInput={(e) => setIsDirty(true)} class="mb-2">
            <CardContents
              config={config}
              schema={schema}
              description={description}
              setConfig={setConfig}
            />
          </div>
          <div class="d-flex justify-content-begin">
            <Spinner animation="border" hidden={!saving} className="me-2" />
            <Button onClick={handleSave} disabled={saving || !isDirty}>
              Save
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
