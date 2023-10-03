import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Collapse from "react-bootstrap/Collapse";
import Form from "react-bootstrap/Form";
import FormCheckInput from "react-bootstrap/FormCheckInput";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { useId, useState } from "react";

import "./style.css";

/**
 * This component is a collapsible accordion with a title in the summary and
 * a radio box at the right end of the summary.
 */
export function CheckboxAccordion(props: any) {
  const [expanded, setExpanded] = useState(true);

  const handleExpandedChange = () => {
    setExpanded(!expanded);
  };

  function CheckToggle({eventKey}) {
    const decoratedOnClick = useAccordionButton(eventKey, handleExpandedChange);

    const id = useId();

    return (
      <FormCheckInput
        type="checkbox"
        id={id}
        checked={expanded}
        onClick={decoratedOnClick}
        className="checkbox-lg"
      />
    );
  }

  return (
    <Accordion defaultActiveKey={"0"}>
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div className="fw-bold">{props.title}</div>
            {props.description}
          </div>
          <div class="col-auto">
            <CheckToggle eventKey="0" />
          </div>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>{props.children}</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

function APSettings() {
  const [apSettings, setApSettings] = useState({
    name: "",
    password: "",
    channel: "Auto",
    hidden: "No",
  });

  const id = useId();

  const handleApSettingsChange = (field) => (event) => {
    setApSettings({ ...apSettings, [field]: event.target.value });
  };

  return (
    <CheckboxAccordion
      title="Access Point"
      description="Create a new WiFi network"
    >
      <Form>
        <Stack gap={2}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              id={ id + "-name" }
              type="text"
              placeholder="Network Name"
              value={apSettings.name}
              onChange={handleApSettingsChange("name")}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              id={ id + "-password" }
              type="password"
              placeholder="Network Password"
              value={apSettings.password}
              onChange={handleApSettingsChange("password")}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Channel</Form.Label>
            <Form.Select
              id={ id + "-channel" }
              aria-label="Select WiFi channel"
              value={apSettings.channel}
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
              id={ id + "-hidden" }
              type="switch"
              label="Hidden"
              value={apSettings.hidden}
              onChange={handleApSettingsChange("hidden")}
            />
          </Form.Group>
        </Stack>
      </Form>
    </CheckboxAccordion>
  );
}

function StaticIPConfig() {
  const id = useId();
  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Label>IP Address</Form.Label>
          <Form.Control id={id + "-ipAddress"}
           type="text" placeholder="IP Address" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Netmask</Form.Label>
          <Form.Control id={id + "-netmask"}
           type="text" placeholder="Netmask" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Gateway</Form.Label>
          <Form.Control id={id + "-gateway"}
          type="text" placeholder="Gateway" />
        </Form.Group>
        <Form.Group>
          <Form.Label>DNS Server</Form.Label>
          <Form.Control id={id + "-dnsServer"}
           type="text" placeholder="DNS Server" />
        </Form.Group>
      </Form>
    </div>
  );
}

function SingleClientConfig() {
  const [staticIPConfig, setStaticIPConfig] = useState("DHCP");
  const id = useId();

  const handleIPConfigChange = (event) => {
    setStaticIPConfig(event.target.value);
    console.log("IP Config changed: ", event.target.value);
  };

  console.log("Static IP Config: ", staticIPConfig);

  return (
    <>
      <Stack gap={2}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control id={id + '-name'} type="text" placeholder="Network Name" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control id={id + '-password'} type="password" placeholder="Network Password" />
        </Form.Group>
        <div>
          <Form.Check
            id={id + '-dhcp'}
            name="ip_config"
            type="radio"
            label="DHCP"
            value="DHCP"
            defaultChecked={staticIPConfig === "DHCP" ? "checked" : ""}
            onInput={handleIPConfigChange}
          />
          <Form.Check
            id={id + '-static'}
            name="ip_config"
            type="radio"
            label="Static"
            value="Static"
            defaultChecked={staticIPConfig === "Static" ? "checked" : ""}
            onInput={handleIPConfigChange}
          />
        </div>
        <Collapse in={staticIPConfig === "Static"}>
          <div>
          <StaticIPConfig />
          </div>
        </Collapse>
      </Stack>
    </>
  );
}

function ClientSettings() {
  const [clientSettings, setClientSettings] = useState([
    {
      name: "",
      password: "",
      dhcp: true,
      ipAddress: "",
      netmask: "",
      gateway: "",
      dnsServer: "",
    },
  ]);
  const id = useId();

  // Replace this part with real data from scanning WiFi
  const availableNetworks = [
    "Network1",
    "Network2",
    "Network3",
    "Network4",
    "Network11",
    "Network12",
    "Network13",
    "Network14",
  ];

  return (
    <CheckboxAccordion title="Client" description="Connect to existing WiFi">
      <Row>
        <Col xs={6}>
          <ListGroup id={id+'-networks'} className="overflow-auto">
            {availableNetworks.map((network) => (
              <ListGroup.Item value={network}>{network}</ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col xs={6}>
          <Tabs defaultActiveKey="first" id="client-tabs" className="mb-3">
            <Tab eventKey="first" title="First">
              <SingleClientConfig />
            </Tab>
            <Tab eventKey="second" title="Second">
              <SingleClientConfig />
            </Tab>
            <Tab eventKey="third" title="Third">
              <SingleClientConfig />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </CheckboxAccordion>
  );
}

export function WiFiSettings() {
  return (
    <div>
      <Stack gap={4}>
        <APSettings />
        <ClientSettings />
      </Stack>
    </div>
  );
  //  <div>

  //    {mode === "Client" && (
  //      <div style={{ display: "flex", justifyContent: "space-between" }}>
  //        <div>
  //          <h4>Available Networks</h4>
  //          {/* List available networks here, perhaps using Material UI List components */}
  //        </div>
  //        <div>
  //          <h4>Configuration</h4>
  //          {clientSettings.map((setting, index) => (
  //            <div key={index}>{/* Configuration items go here */}</div>
  //          ))}
  //        </div>
  //      </div>
  //    )}
  //  </div>
  //</>
  //);
}
