import { APP_CONFIG } from "config";
import { type JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import { InfoGroup, type InfoItemData } from "./InfoGroup";

type InfoGroupsState = Array<Record<string, InfoItemData[]>>;

async function updateGroups(): Promise<InfoGroupsState> {
  try {
    const response = await fetch(APP_CONFIG.info_path);
    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status} ${response.statusText}`);
    }
    const data = await response.json();

    const items = data.items;
    const sortedItems = items.sort((a, b) => {
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
  } catch (e) {
    console.log("Error getting data from server", e);
  }
  return [];
}

export function InfoGroups(): JSX.Element {
  const [groups, setGroups] = useState<InfoGroupsState>([]);

  async function timerFunc(): Promise<void> {
    // fetch updated group items from server
    const groupedItems = await updateGroups();
    setGroups(groupedItems);
  }

  useEffect(() => {
    if (Object.keys(groups).length === 0) {
      void timerFunc();
    }
    const interval = setInterval(() => {
      void timerFunc();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [groups]);

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
  );
}
