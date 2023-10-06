import { InfoItem, InfoItemData } from "./InfoItem";

interface InfoGroupProps {
  name: string;
  items: [InfoItemData];
}

export { InfoItemData };

export function InfoGroup(props: InfoGroupProps) {
  return (
    <div className="InfoGroup">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">{props.name}</h4>
        </div>
        <div className="card-body">
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
        </div>
      </div>
    </div>
  );
}
