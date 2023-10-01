import TextField from 'preact-material-components/TextField';
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
        <TextField
          id="outlined-read-only-input"
          label={this.props.name}
          defaultValue={this.props.value}
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
    );
  }
}
