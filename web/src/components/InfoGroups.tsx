import { Component } from "preact";
import { InfoGroup, InfoItemData } from "./InfoGroup";

// Types for state
interface InfoGroupsState {
  data: { groups: { [key: string]: [InfoItemData] } };
}

export class InfoGroups extends Component<{}, InfoGroupsState> {
  constructor(props: {}) {
    super(props);
    this.state = { data: null };
  }

  state: InfoGroupsState;

  async componentWillMount() {
    console.log("StatusPage: componentWillMount");

    // Make a HTTP GET request to the server to get the status data
    // and store it in the state.

    try {
      const raw = await fetch("/info");
      const data = await raw.json();
      console.log("StatusPage: got data from server", data);

      const items = data["items"];
      const sortedItems = items.sort((a, b) => {
        return a["name"].localeCompare(b["name"]);
      });
      const groupedItems = sortedItems.reduce((groups, item) => {
        const group = item["group"];
        console.log("item group", group)
        if (!groups[group]) {
          groups[group] = [];
        }
        groups[group].push(new InfoItemData(item["name"], item["value"]));
        return groups;
      }, {});
      this.state.data = {groups: groupedItems};
    } catch (e) {
      console.log("StatusPage: error getting data from server", e);
    }
  }

  render() {
    // loop over the groups and render each group
    if (this.state.data === null || !("groups" in this.state.data)) {
      return <p>Loading...</p>;
    }
    const groups = this.state.data["groups"];
    const groupNames = Object.keys(groups);
    const groupElements = groupNames.map((groupName) => {
      return <InfoGroup name={groupName} items={groups[groupName]} />;
    });
    return <div>{groupElements}</div>;
  }
}
