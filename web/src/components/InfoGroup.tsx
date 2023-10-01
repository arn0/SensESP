import { Component } from "preact";
import { InfoItem, InfoItemData } from "./InfoItem";

interface InfoGroupProps {
  name: string;
  items: [InfoItemData];
}

export { InfoItemData };

export class InfoGroup extends Component<InfoGroupProps, {}> {
  constructor(props: InfoGroupProps) {
    super(props);
  }

  render() {
    return (
      <div className="InfoGroup">
        <h2>{this.props.name}</h2>
        {this.props.items.map((item) => {
          return <InfoItem name={item["name"]} value={item["value"]} />;
        })}
      </div>
    );
  }
}
