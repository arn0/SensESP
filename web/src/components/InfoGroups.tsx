import { useEffect, useState } from "preact/hooks";
import Spinner from "react-bootstrap/Spinner";
import Stack from "react-bootstrap/Stack";
import { InfoGroup, InfoItemData } from "./InfoGroup";
import {app_config} from "../app_config";

class InfoGroupsState {
  groups: { [key: string]: [InfoItemData] };
}

const updateGroups = async () => {
  console.log("updateGroups");
  try {
    const response = await fetch(app_config.info_path);
    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status} ${response.statusText}`);
    }
    const data = await response.json();

    const items = data["items"];
    const sortedItems = items.sort((a, b) => {
      return a["name"].localeCompare(b["name"]);
    });
    const groupedItems = sortedItems.reduce((groups, item) => {
      const group = item["group"];
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(new InfoItemData(item["name"], item["value"]));
      return groups;
    }, {});
    return groupedItems;
  } catch (e) {
    console.log("Error getting data from server", e);
  }
};

export function InfoGroups() {
  const [groups, setGroups] = useState(new InfoGroupsState());

  const timerFunc = async () => {
    // fetch updated group items from server
    const groupedItems = await updateGroups();
    setGroups(groupedItems);
  };

  if (Object.keys(groups).length === 0) {
    timerFunc();
  }

  useEffect(() => {
    const interval = setInterval(timerFunc, 5000);
    return () => clearInterval(interval);
  });

  if (Object.keys(groups).length === 0) {
    // Display a spinner while waiting for data. Center the spinner
    // in the page.
    return (
      <div
        class="d-flex align-items-center justify-content-center min"
        style="height: 100vh"
      >
        <Spinner animation="border" />
      </div>
    );
  }

  const groupNames = Object.keys(groups);

  return (
    <div>
      <Stack gap={3}>
      {groupNames.map((groupName) => (
        <InfoGroup name={groupName} items={groups[groupName]} />
      ))}
      </Stack>
    </div>
  );
}
