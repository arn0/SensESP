import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import { InfoItem, InfoItemData } from "./InfoItem";

interface InfoGroupProps {
  name: string;
  items: [InfoItemData];
}

export { InfoItemData };

export function InfoGroup(props: InfoGroupProps) {
  console.log("InfoGroup:", props.items);
  return (
    <div className="InfoGroup">
      <Card>
        <Card.Body>
          <Card.Title className="pb-2">{props.name}</Card.Title>
          <ListGroup>
            {props.items.map((item) => {
              return (
                <InfoItem
                  key={`${this.props.name}:${item.name}`}
                  name={item.name}
                  value={item.value}
                />
              );
            })}
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
}
