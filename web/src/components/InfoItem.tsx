import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { memo } from "preact/compat";

export class InfoItemData {
  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }

  name: string;
  value: string;
}

export const InfoItem = memo((props: InfoItemData) => {
  console.log("InfoItem:", props);
  return (
    <div className="InfoItem">
      <ListItem>
        <ListItemText primary={props.name} secondary={props.value} />
      </ListItem>
    </div>
  );
});
