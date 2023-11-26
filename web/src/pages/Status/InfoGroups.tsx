import { ModalError } from "components/ModalError";
import { APP_CONFIG } from "config";
import { type JSX } from "preact";
import { useEffect, useId, useState } from "preact/hooks";
import { InfoGroup, type InfoItemData } from "./InfoGroup";

type InfoGroupsState = Array<Record<string, InfoItemData[]>>;

async function updateGroups(): Promise<InfoGroupsState> {
  const response = await fetch(APP_CONFIG.info_path);
  if (!response.ok) {
    throw new Error(`HTTP Error ${response.status} ${response.statusText}`);
  }
  const data = await response.json();

  // Check that the data is an array
  if (!Array.isArray(data)) {
    throw new Error("Data is not an array");
  }

  const sortedItems = data.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  const groupedItems = sortedItems.reduce((groups, item) => {
    const group = item.group;
    if (!(group in groups)) {
      groups[group] = [];
    }
    groups[group].push({ name: item.name, value: item.value });
    return groups;
  }, {});
  return groupedItems;
}

export function InfoGroups(): JSX.Element {
  const [groups, setGroups] = useState<InfoGroupsState>([]);
  const [errorText, setErrorText] = useState("");

  const id = useId();

  async function timerFunc(): Promise<void> {
    // fetch updated group items from server
    if (errorText !== "") {
      return; // don't update if there's an error
    }
    try {
      const groupedItems = await updateGroups();
      setGroups(groupedItems);
    } catch (e) {
      setErrorText(e.message);
    }
  }

  useEffect(() => {
    console.log("Error: ", errorText);
  }, [errorText]);

  useEffect(() => {
    if (Object.keys(groups).length === 0 && errorText === "") {
      timerFunc();
    }
    const interval = setInterval(() => {
      timerFunc();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [groups, errorText]);

  if (errorText !== "") {
    return (
      <div
        className="d-flex align-items-center justify-content-center min"
        style="height: 100vh"
      >
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error</h4>
          <p>{errorText}</p>
        </div>
      </div>
    );
  }

  if (Object.keys(groups).length === 0) {
    // Display a spinner while waiting for data. Center the spinner
    // in the page.
    return (
      <div
        className="d-flex align-items-center justify-content-center min"
        style="height: 100vh"
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const groupNames = Object.keys(groups);

  return (
    <>
      <ModalError
        id={`${id}-modal`}
        title="Error"
        show={errorText !== ""}
        onHide={() => {
          setErrorText("");
        }}
      >
        <p>{errorText}</p>
      </ModalError>

      <div>
        <div className="vstack gap-4">
          {groupNames.map((groupName) => (
            <InfoGroup
              key={groupName}
              name={groupName}
              items={groups[groupName]}
            />
          ))}
        </div>
      </div>
    </>
  );
}
