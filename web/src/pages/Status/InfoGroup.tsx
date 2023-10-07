import { Card } from "components/Card";
import { InfoItem, InfoItemData } from "./InfoItem";

interface InfoGroupProps {
  name: string;
  items: [InfoItemData];
}

export { InfoItemData };

export function InfoGroup(props: InfoGroupProps) {
  return (
    <>
      <Card title={props.name}>
        <ul className="list-group">
          {props.items.map((item) => {
            return (
              <InfoItem
                key={`${this.props.name}:${item.name}`}
                name={item.name}
                value={item.value}
              />
            );
          })}
        </ul>
      </Card>
    </>
  );
}
