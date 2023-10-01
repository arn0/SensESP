import { Component } from "preact";
import { InfoGroups } from "../../components/InfoGroups";

export class StatusPage extends Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  render() {
    return (
      <div className="Status">
        <h1>Status</h1>
        <p>Here is the status of the project</p>

        <InfoGroups />
      </div>
    );
  }
}
