import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "preact/hooks";
import { InfoGroup, InfoItemData } from "./InfoGroup";

class InfoGroupsState {
  groups: { [key: string]: [InfoItemData] };
}

const updateGroups = async () => {
  console.log("updateGroups");
  try {
    const response = await fetch("/info");
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
  console.log("InfoGroups");
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
    return (<Spinner/>);
  }

  const groupNames = Object.keys(groups);
  const groupElements = groupNames.map((groupName) => (
    <InfoGroup name={groupName} items={groups[groupName]} />
  ));
  return <div>{groupElements}</div>;
}


function Spinner() {
  return (
    <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justifyContent="center"
  sx={{ minHeight: '100vh' }}
>
  <Grid item xs={3}>
    <CircularProgress />
  </Grid>
</Grid>
  )
}
