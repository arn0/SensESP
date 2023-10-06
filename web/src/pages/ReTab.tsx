import { useId, useState } from "preact/hooks";

function TabItem(props) {
  return (
    <li class="nav-item">
      <button
        className={"nav-link" + (props.active ? " active" : "")}
        id={props.id}
        type="button"
        data-bs-toggle="tab"
        data-bs-target={props.target}
        role="tab"
        onClick={props.onClick}
      >
        {props.title}
      </button>
    </li>
  );
}

function TabPanel(props) {
  return (
    <div
      className={"tab-pane fade" + (props.active ? " show active" : "")}
      id={props.id}
      role="tabpanel"
    >
      {props.children}
    </div>
  );
}

export function ReTabs(props) {
  const [activeTab, setActiveTab] = useState(0);

  const id = props.id || useId();

  function generateTabItems() {
    return props.children.map((child, idx) => {
      return (
        <TabItem
          id={id + "-tab-" + idx}
          title={child.props.title}
          target={"#" + id + "-tab-panel-" + idx}
          active={idx === activeTab}
          onClick={(e) => {
            setActiveTab(idx);
            child.props.onClick(e);
          }}
        />
      );
    });
  }

  function generateTabPanels() {
    return props.children.map((child, idx) => {
      return (
        <TabPanel id={id + "-tab-panel-" + idx} active={idx === activeTab}>
          {child.props.children}
        </TabPanel>
      );
    });
  }

  return (
    <>
      <ul class="nav nav-tabs" id={id}>
        {generateTabItems()}
      </ul>
      <div class="tab-content" id={id + "-tab-panels"}>
        {generateTabPanels()}
      </div>
    </>
  );
}

export function ReTab(props) {
  return null;
}
