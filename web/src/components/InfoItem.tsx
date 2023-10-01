import { Component } from "preact";

export class InfoItemData {
  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }

  name: string;
  value: string;
}

export class InfoItem extends Component<InfoItemData, {}> {
  constructor(props: InfoItemData) {
    super(props);
  }

  render() {
    return (
      <div className="InfoItem">
        <strong>
          <span className="InfoItemName">{this.props.name} </span>
        </strong>
        <span className="InfoItemValue">{this.props.value}</span>
      </div>
    );
  }
}
