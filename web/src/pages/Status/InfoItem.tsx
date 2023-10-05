import { memo } from "preact/compat";
import ListGroup from "react-bootstrap/ListGroup";

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
      <ListGroup.Item className="d-flex justify-content-between align-items-start">
        <div className="fw-bold">{props.name}</div>
        {props.value}
      </ListGroup.Item>
    </div>
  );
});
