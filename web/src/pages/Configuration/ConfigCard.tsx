import { useState } from "preact/hooks";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { ModalError } from "../ModalError";
import { fetchConfigData, saveConfigData } from "../configAPIClient";

import { ChangeEvent } from "react";
import { ConfigData } from "pages/configAPIClient";

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
      <Form.Group className="mb-3">
        <Form.Label htmlFor={id}>{schema.title}</Form.Label>
        <Form.Control
          type={type}
          as={as}
          id={id}
          value={value}
          readOnly={schema.readOnly ?? false}
          step={step}
          onChange={onChange}
        />
      </Form.Group>
    </div>
  );
};

export default EditControl;

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

  const updateFunc = async (path: string): Promise<void> => {
    const data: ConfigData = await fetchConfigData(path);
    setConfig(data.config);
    setSchema(data.schema);
    setDescription(data.description);
  };

  if (Object.keys(config).length === 0) {
    updateFunc(path);
  }

  const handleSave = async (): Promise<void> => {
    setSaving(true);
    await saveConfigData(path, config, (e) => {setHttpErrorText(e)});
    setIsDirty(false);
    setSaving(false);
  };

  const title = path.slice(1).replace(/\//g, " ▸ ");

  return (
    <div className="ConfigCard">
      {httpErrorText !== "" && (
        <ModalError title="Error" onHide={() => setHttpErrorText("")}>
          <p>There was an error saving the configuration:</p>
          <p>{httpErrorText}</p>
        </ModalError>
      )}

      <Card>
        <Card.Body>
          <Card.Title className="pb-2">{title}</Card.Title>
          <div onInput={() => setIsDirty(true)} className="mb-2">
            <CardContents
              config={config}
              schema={schema}
              description={description}
              setConfig={setConfig}
            />
          </div>
          <div className="d-flex justify-content-begin">
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
